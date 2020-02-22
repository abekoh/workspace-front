<template>
  <div class="container">
    <a-row class="add">
      <div class="add-field" @mouseover="isAddHovered = true" @mouseleave="isAddHovered = false">
        <transition name="add-button">
          <a-button @click="addOneLocalTask(true)" v-show="isAddHovered" class="add-button" type="dashed" icon="plus"/>
        </transition>
      </div>
    </a-row>
    <a-row>
      <a-col :span="6"></a-col>
      <a-col :span="12">
        <div class="list">
          <draggable v-model="localTasks" @change="onChange" @end="onMove"
                     v-bind="{animation: 200, group: 'description', disabled: false, ghostClass: 'ghost'}">
            <transition-group type="transition" name="flip-list">
              <TaskPreview v-for="(task, index) in localTasks" :key="task.taskId" :task="task"
                           @update-local-task="updateOneLocalTask($event, index)"/>
            </transition-group>
          </draggable>
        </div>
      </a-col>
      <a-col :span="6">
        <div class="done"></div>
      </a-col>
    </a-row>
    <a-row class="add">
      <div class="add-field" @mouseover="isAddHovered = true" @mouseleave="isAddHovered = false">
        <transition name="add-button">
          <a-button @click="addOneLocalTask(false)" v-show="isAddHovered" class="add-button" type="dashed" icon="plus"/>
        </transition>
      </div>
    </a-row>
  </div>
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
    isAddHovered: boolean = false

    get localTasks(): Task[] {
      return todoStore.localTasks
    }

    set localTasks(newTasks: Task[]) {
      todoStore.setLocalTasks(newTasks)
    }

    get pushRequest(): boolean {
      return todoStore.pushRequest
    }

    set pushRequest(flg: boolean) {
      todoStore.setPushRequest(flg)
    }

    get nextTaskId(): number {
      return todoStore.nextTaskId
    }

    set nextTaskId(next: number) {
      todoStore.setNextTaskId(next)
    }

    updateOneLocalTask(task: Task, index: number) {
      let newTasks: Task[] = _.cloneDeep(this.localTasks)
      newTasks[index] = task
      this.localTasks = newTasks
      this.pushRequest = true
    }

    addOneLocalTask(isFirst: boolean) {
      let newTasks: Task[] = _.cloneDeep(this.localTasks)
      const newTask: Task = {
        completed: false,
        deleted: false,
        priorityRank: 0,
        taskId: this.nextTaskId,
        text: ""
      }
      if (isFirst) newTasks.unshift(newTask)
      else newTasks.push(newTask)
      this.localTasks = newTasks
      this.nextTaskId = this.nextTaskId + 1
      this.pushRequest = true
    }

    async created() {
      await todoStore.pullTasks()
    }

    async onChange(evt: any) {
      this.pushRequest = true
    }

    onMove(evt: any) {
      console.log(evt)
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
  .container {
    display: flex;
    flex-direction: column;
    width: 800px;

    .add {
      .add-field {
        width: 100%;
        height: 30px;

        .add-button {
          width: 100%;
          height: 100%;
          border-radius: 0px;
        }

        .add-button-enter-active, .add-button-leave-active {
          transition: opacity .5s;
        }

        .add-button-enter, .add-button-leave-to {
          opacity: 0;
        }
      }
    }

    .list {
      text-align: center;
      display: inline-block;
      margin: auto;
    }

    .done {
      border: 1px solid #3b8070;
    }


    .flip-list-move {
      transition: transform 0.3s;
    }

    .no-move {
      transition: transform 0s;
    }
  }
</style>
