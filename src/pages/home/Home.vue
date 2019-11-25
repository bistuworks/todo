<template>
  <div>
    <Header></Header>
    <List></List>
  </div>
</template>

<script>
  import List from "@/pages/home/components/List"
  import Header from "@/components/Header"

  export default {
    name: 'Home',
    components: {
      Header,
      List
    },
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
    },
    mounted() {
      if (this.$store.state.userInfo === null) {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>

</style>
