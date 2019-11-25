<template>
  <div class="app-container">
    <el-row :gutter="10" justify="space-between" class="table-option">
      <el-col :span="3">
        <el-button
            type="primary"
            size="medium"
            icon="el-icon-edit"
            @click="openAddTaskDialog()"
            round
        >
          Add Task
        </el-button>
      </el-col>
      <el-col :span="5">
        <el-select v-model="listQuery.status" class="filter-item" :value="undefined"
                   @change="filterChange">
          <el-option v-for="item in task_flag_options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务标题" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务描述" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.desc}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务开始时间" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.time_range[0] | filterDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务结束时间" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.time_range[1] | filterDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务标记" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.flag | filterFlag}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务完成度" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务完成情况描述" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.finish_desc}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="openEditTaskDialog(scope.$index, scope.row)"
          >
            Edit
          </el-button>
          <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="deleteSelectedTask(scope.$index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  编辑任务弹出框  -->
    <el-dialog title="任务" :visible.sync="editTaskFormVisible">
      <el-form ref="task_form" :model="currentEditTaskForm">
        <el-form-item label="标题">
          <el-input v-model="currentEditTaskForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="标题描述">
          <el-input type="text-area" autosize placeholder="请输入标题描述" v-model="currentEditTaskForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="任务时间范围">
          <el-date-picker
              v-model="currentEditTaskForm.time_range"
              type="datetimerange"
              range-separator="至"
              start-placeholder="任务开始日期"
              end-placeholder="任务结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务标记">
          <el-select v-model="currentEditTaskForm.flag" placeholder="请选择任务标记">
            <el-option
                v-for="item in form_task_flag_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="block">
            <span class="demonstration">任务完成度</span>
            <el-slider v-model="currentEditTaskForm.status"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="任务完成情况">
          <el-input type="textarea" autosize :rows="2" placeholder="请输入任务完成情况描述"
                    v-model="currentEditTaskForm.finish_desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTaskFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="currentEditTaskFormSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="deleteTaskDialogVisible"
        width="30%"
        :center="true"
        lock-scroll
        close-on-press-escape>
      <p style="text-align: center">删除当前任务?</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteOk">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'List',
    data() {
      return {
        editTaskFormVisible: false,
        currentIndex: -1,  // 控制当前操作的item项的索引值
        deleteTaskDialogVisible: false,
        action: 'add',   // 以什么动作触发表单对话框
        listQuery: {   // 页面查询条件
          status: undefined
        },
        srcList: null,  // 数据源
        list: null,   // 页面数据源
        listLoading: false,
        currentEditTaskForm: {
          id: 1,
          title: '',
          desc: '',
          time_range: [],
          flag: '',
          status: 0,
          finish_desc: '',
        },
        form_task_flag_options:
          [
            {label: '普通任务', value: 1},
            {label: '重要任务', value: 2},
          ],
        task_flag_options: [
          {label: '全部任务', value: undefined},
          {label: '普通任务', value: 1},
          {label: '重要任务', value: 2},
        ]
      }
    },
    created() {
      this.srcList = [
        {
          title: '标题1',
          desc: '任务1',
          time_range: [new Date(), new Date()],
          flag: 2,
          status: 0,
          finish_desc: '',
        },
        {
          title: '标题2',
          desc: '任务2',
          time_range: [new Date(), new Date()],
          flag: 1,
          status: 0,
          finish_desc: '',
        },
        {
          title: '标题3',
          desc: '任务3',
          time_range: [new Date(), new Date()],
          flag: 2,
          status: 0,
          finish_desc: '',
        },
        {
          title: '标题4',
          desc: '任务4',
          time_range: [new Date(), new Date()],
          flag: 1,
          status: 0,
          finish_desc: '',
        }
      ]
      this.getList()
    },
    methods: {
      getList() {
        // 从数据源获取数据，并依据当前页面筛选条件进行筛选
        const org_list = JSON.parse(JSON.stringify(this.srcList))
        if (this.listQuery.status !== undefined) {
          this.list = org_list.filter(item => item.flag === this.listQuery.status)
        } else {
          this.list = org_list
        }
      },
      openEditTaskDialog(index, item) {
        this.currentIndex = index
        this.currentEditTaskForm = JSON.parse(JSON.stringify(item))
        this.action = 'edit'
        this.editTaskFormVisible = true
      },
      deleteSelectedTask(index) {
        this.currentIndex = index   // 当前需要操作的对象的位置
        this.deleteTaskDialogVisible = true
      },
      currentEditTaskFormSubmit() {
        // 这样写会导致页面不会重新渲染
        // 参考：https://blog.csdn.net/weixin_37861326/article/details/82893553
        // this.list[this.currentIndex] = this.currentEditTaskForm
        if (this.action === 'add') {
          this.list.push(this.currentEditTaskForm)
          window.console.log(this.list)
          this.editTaskFormVisible = false
        } else if (this.action === 'edit') {
          this.list.splice(this.currentIndex, 1, this.currentEditTaskForm)
          this.editTaskFormVisible = false
        } else {
          window.console.log("Unknown Action")
        }
      },
      deleteOk() {
        this.list.splice(this.currentIndex, 1)
        this.srcList = this.list  // 删除时，页面数据源和组件数据源进行同步修改
        this.deleteTaskDialogVisible = false
      },
      openAddTaskDialog() {
        this.action = 'add'
        // 初始化一个空的form来填充dialog
        this.currentEditTaskForm = {
          title: '',
          desc: '',
          time_range: [],
          flag: '',
          status: 0,
          finish_desc: '',
        }
        this.editTaskFormVisible = true
      },
      filterChange(val) {
        window.console.log(val)
        this.listQuery.status = val
        this.getList()
      }
    },
    filters: {
      filterDate(dateVal) {
        const date = new Date(dateVal);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        const hour = date.getHours();
        const minute = date.getMinutes();
        return year + '年' + month + '月' + day + '日' + ' ' + hour + '时' + minute + '分';
      },
      filterFlag(val) {
        switch (val) {
          case 1:
            return '普通任务'
          case 2:
            return '重要任务'
        }
      }
    }
  }
</script>

<style scoped>
  .table-option {
    margin-bottom: 20px;
  }
</style>
