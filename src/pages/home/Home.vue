<template>
  <el-row>
    {{this.$store.state.count}}个
    <el-col :span="3">
      <el-col v-for="(task, index) in tasks" :key="index">
        {{task.title}} - {{task.desc}}
      </el-col>
    </el-col>
    <el-col :span="6">
      <el-form ref="task_form" :model="task_form">
        <el-form-item label="标题">
          <el-input v-model="task_form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="标题描述">
          <el-input type="text-area" autosize placeholder="请输入标题描述" v-model="task_form.desc"></el-input>
        </el-form-item>
        <el-form-item label="任务时间范围">
          <el-date-picker
              v-model="task_form.time_range"
              type="datetimerange"
              range-separator="至"
              start-placeholder="任务开始日期"
              end-placeholder="任务结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务标记">
          <el-select v-model="task_form.flag" placeholder="请选择任务标记">
            <el-option
                v-for="item in task_flag_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务完成度">
          <el-select
              v-model="task_form.status"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择任务完成度">
            <el-option
                v-for="item in task_finish_status_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="任务完成情况">
          <el-input type="textarea" autosize placeholder="请输入任务完成情况描述" v-model="task_form.finish_desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        tasks: [],
        task_form: {
          title: '',
          desc: '',
          time_range: '',
          flag: '',
          status: '',
          finish_desc: '',
        },
        task_flag_options: [
          {value: '1', label: '普通任务'},
          {value: '2', label: '重要任务'},
        ],
        task_finish_status_options: [
          {value: '1', label: '完成'},
          {value: '2', label: '未完成'},
        ]
      }
    },
    methods: {
      onSubmit() {
        let todo = localStorage.getItem("todo")
        todo = JSON.parse(todo)
        if (!todo)
          todo = []
        todo.push(this.task_form)
        localStorage.setItem("todo", JSON.stringify(todo))
        this.$store.commit('addTask', this.task_form)
      }
    },
    created() {
      this.tasks = JSON.parse(localStorage.getItem("todo"))
    }
  }
</script>

<style scoped>

</style>
