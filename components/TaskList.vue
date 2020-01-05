<template>
  <div>
    <TaskPreview v-for="task in tasks" :key="task.taskId" :task="task" />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {todoStore} from '~/store'
  import TaskPreview from "~/components/TaskPreview.vue"

  @Component({
    components: {
      TaskPreview
    }
  })
  export default class TaskList extends Vue {
    get tasks() {
      return todoStore.tasks
    }

    async created() {
      await todoStore.loadTasks()
    }
  }
</script>

<style scoped>

</style>
