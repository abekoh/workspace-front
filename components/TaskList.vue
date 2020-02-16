<template>
  <!--  <draggable v-model="localTasks" @change="onChange">-->
  <draggable v-model="localTasks" @change="onChange">
    <TaskPreview v-for="(task, index) in localTasks" :key="task.taskId" :task="task"
                 @update-local-task="updateOneLocalTask($event, index)"/>
  </draggable>
</template>

<script lang="ts">
  import {Component, PropSync, Vue} from 'vue-property-decorator'
  import {todoStore} from '~/store'
  import Task from "~/models/Task"
  import TaskPreview from "~/components/TaskPreview.vue"
  import _ from 'lodash'


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

    updateOneLocalTask(task: Task, index: number) {
      let newTasks: Task[] = _.cloneDeep(this.localTasks)
      newTasks[index] = task
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
