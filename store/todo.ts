import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import Task from '~/models/Task'
import {$axios} from '~/utils/api'
import * as lodash from 'lodash'

const _ = lodash

export interface ITodoState {
  localTasks: Task[]
  remoteTasks: Task[]
  pushRequest: boolean
}

@Module({stateFactory: true, namespaced: true, name: 'todo'})
export default class Todo extends VuexModule implements ITodoState {
  localTasks: Task[] = []
  remoteTasks: Task[] = []
  pushRequest: boolean = false

  @Mutation
  setPushRequest(flg: boolean) {
    this.pushRequest = flg
  }

  @Mutation
  setLocalTasks(updatedLocalTasks: Task[]) {
    this.localTasks = updatedLocalTasks
  }

  @Mutation
  setRemoteTasks(updatedRemoteTasks: Task[]) {
    this.remoteTasks = updatedRemoteTasks
  }

  @Action
  async pushTasks() {
    let newTasks: Task[] = _.cloneDeep(this.localTasks)
    let oldTasks: Task[] = _.cloneDeep(this.remoteTasks)

    // priorityRankを順序通り振り直す
    newTasks.forEach((newTask, index) => {
      newTask.priorityRank = index + 1
    })

    let promises: Promise<any>[] = []

    // 削除したタスクを抽出
    let deletedTasks: Task[] = []
    oldTasks.forEach((oldTask) => {
      const findTarget = newTasks.find(newTask => newTask.taskId === oldTask.taskId)
      if (typeof findTarget === "undefined") {
        promises.push($axios.$delete('/todo/tasks/' + oldTask.taskId))
        deletedTasks.push(oldTask)
      }
    })
    oldTasks.filter(oldTask => deletedTasks.indexOf(oldTask) < 0)

    // 追加したタスク抽出
    let addedTasks: Task[] = []
    newTasks.forEach((newTask) => {
      const findTarget = oldTasks.find(oldTask => oldTask.taskId === newTask.taskId)
      if (typeof findTarget === "undefined") {
        promises.push($axios.$post('/todo/tasks/', newTask))
        addedTasks.push(newTask)
      }
    })
    newTasks.filter(newTask => addedTasks.indexOf(newTask) < 0)

    // 変更したタスク抽出
    newTasks.forEach((localTask, index) => {
      const remoteTask = oldTasks[index]
      if (JSON.stringify(localTask) !== JSON.stringify(remoteTask)) {
        promises.push($axios.$patch('/todo/tasks/' + localTask.taskId, localTask))
      }
    })
    await Promise.all(promises)
  }

  @Action
  async pullTasks() {
    const tasks: Task[] = await $axios.$get<Task[]>('/todo/tasks')
    this.setLocalTasks(tasks)
    this.setRemoteTasks(tasks)
  }

  // @Action
  // async syncTasks() {
  //   let patchPromises: Promise<number>[] = []
  //   this.modifiedTasks.forEach((modifiedTask) => {
  //     patchPromises.push($axios.$patch('/todo/tasks/' + modifiedTask.taskId, modifiedTask))
  //   })
  //   await Promise.all(patchPromises)
  //   this.loadTasks()
  // }
}
