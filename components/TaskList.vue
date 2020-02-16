<template>
  <!--  <draggable v-model="localTasks" @change="onChange">-->
  <draggable v-model="localTasks" @change="onChange"
             v-bind="{animation: 200, group: 'description', disabled: false, ghostClass: 'ghost'}">
    <transition-group type="transition" name="flip-list">
      <TaskPreview v-for="(task, index) in localTasks" :key="task.taskId" :task="task"
                   @update-local-task="updateOneLocalTask($event, index)"/>
    </transition-group>
  </draggable>
</template>

<script lang="ts">
  import {Component, PropSync, Vue, Watch} from 'vue-property-decorator'
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

    get pushRequest(): boolean {
      return todoStore.pushRequest
    }

    set pushRequest(flg: boolean) {
      todoStore.setPushRequest(flg)
    }

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
      this.pushRequest = true
    }

    async created() {
      await todoStore.pullTasks()
    }

    async onChange(evt: any) {
      this.pushRequest = true
    }

    @Watch('pushRequest')
    watchPushRequest() {
      if (!this.pushRequest) return
      setTimeout(async () => {
        await todoStore.pushTasks()
        await todoStore.pullTasks()
        this.pushRequest = false
        console.log('sync tasks at ' + new Date())
      }, 3000)
    }

  }
</script>

<style lang="scss">
  .flip-list-move {
    transition: transform 0.3s;
  }

  .no-move {
    transition: transform 0s;
  }
</style>
