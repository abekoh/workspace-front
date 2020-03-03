<template>
  <div class="container">
    <a-row class="top">
      <a-col :span="6"/>
      <a-col :span="12">
        <div class="center-space" @mouseover="isHoveredTop = true" @mouseleave="isHoveredTop = false">
          <transition name="trans">
            <a-button @click="addOneLocalTask(true)" v-show="isHoveredTop" class="add-button" type="dashed"
                      icon="plus"/>
          </transition>
        </div>
      </a-col>
      <a-col :span="6"/>
    </a-row>
    <a-row class="middle">
      <a-col :span="6">
        <div class="side">
          <transition name="trans">
            <div v-show="isShownSide" class="side-box">
              <a-icon class="side-icon" style="margin: auto" type="delete"/>
            </div>
          </transition>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="list">
          <no-ssr>
            <draggable v-model="localTasks" @change="onChange" @start="onStart" @end="onEnd"
                       v-bind="{animation: 200, group: 'description'}">
              <transition-group type="transition" name="flip-list">
                <TaskPreview v-for="(task, index) in localTasks" :key="task.taskId" :task="task"
                             @update-local-task="updateOneLocalTask($event, index)"/>
              </transition-group>
            </draggable>
          </no-ssr>
        </div>
      </a-col>
      <a-col :span="6">
        <div class="side">
          <transition name="trans">
            <div v-show="isShownSide" class="side-box">
              <a-icon class="side-icon" style="margin: auto" type="check"/>
            </div>
          </transition>
        </div>
      </a-col>
    </a-row>
    <a-row class="bottom">
      <a-col :span="6"/>
      <a-col :span="12">
        <div class="center-space" @mouseover="isHoveredBottom = true" @mouseleave="isHoveredBottom = false">
          <transition name="trans">
            <a-button @click="addOneLocalTask(false)" v-show="isHoveredBottom" class="add-button" type="dashed"
                      icon="plus"/>
          </transition>
        </div>
      </a-col>
      <a-col :span="6"/>
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
    isHoveredTop: boolean = false
    isHoveredBottom: boolean = false
    isMoving: boolean = false
    isShownSide: boolean = false
    moveFromX: number = -1

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

    removeOneLocalTask(index: number) {
      let newTasks: Task[] = _.cloneDeep(this.localTasks)
      newTasks.splice(index, 1)
      this.localTasks = newTasks
      this.pushRequest = true
    }

    async created() {
      await todoStore.pullTasks()
    }

    onStart(evt: any) {
      this.moveFromX = evt.originalEvent.pageX
      this.isMoving = true
    }

    onEnd(evt: any) {
      this.isMoving = false
      this.isShownSide = false
      const moveToX = evt.originalEvent.pageX
      if (evt.oldIndex !== evt.newIndex) {
        return
      }
      // 100px以上横に動かす
      if (Math.abs(this.moveFromX - moveToX) > 100) {
        this.removeOneLocalTask(evt.newIndex)
      }
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

    @Watch('isMoving')
    watchIsMoving() {
      if (!this.isMoving) return
      setTimeout(() => {
        this.isShownSide = this.isMoving
      }, 600)
    }

  }
</script>

<style lang="scss">
  .container {
    text-align: center;
    flex-direction: column;
    width: 800px;

    .top {
      width: 100%;

      .center-space {
        width: 100%;
        height: 50px;

        .add-button {
          width: 100%;
          height: 100%;
        }

      }
    }

    .middle {
      display: flex;
      width: 100%;

      .side {
        height: 100%;
        margin: 0 10px;

        .side-box {
          display: flex;
          align-items: center;
          height: 100%;
          border: 1px dashed #1890ff;
          border-radius: 4px;

          .side-icon {
            font-size: 30px;
            color: #1890ff;
          }
        }
      }

    }

    .bottom {
      width: 100%;

      .center-space {
        width: 100%;
        height: 50px;

        .add-button {
          width: 100%;
          height: 50px;
        }
      }
    }

    .trans-enter-active, .trans-leave-active {
      transition: opacity .3s;
    }

    .trans-enter, .trans-leave-to {
      opacity: 0;
    }
  }
</style>
