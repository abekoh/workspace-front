<template>
  <draggable v-model="localTasks" @change="onChange">
    <TaskPreview v-for="task in localTasks" :key="task.taskId" :task="task"/>
  </draggable>
</template>

<script lang="ts">
  import {Component, PropSync, Vue} from 'vue-property-decorator'
  import {todoStore} from '~/store'
  import TaskPreview from "~/components/TaskPreview.vue"
  import Task from "~/models/Task"

  @Component({
    components: {
      TaskPreview
    }
  })
  export default class TaskList extends Vue {
    get localTasks(): Task[] {
      return todoStore.localTasks
    }

    set localTasks(newTasks: Task[]) {
      todoStore.setLocalTasks(newTasks)
    }

    async created() {
      await todoStore.pullTasks()
    }

    async onChange(evt: any) {
      await todoStore.pushTasks()
      await todoStore.pullTasks()
    }
  }
</script>

<style lang="scss">
</style>
