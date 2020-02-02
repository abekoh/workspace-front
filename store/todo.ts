import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import Task from '~/models/Task'
import {$axios} from "~/utils/api"
import {cloneDeep} from 'lodash'

export interface ITodoState {
  tasks: Task[]
}

@Module({stateFactory: true, namespaced: true, name: 'todo'})
export default class Todo extends VuexModule implements ITodoState {
  tasks: Task[] = []

  @Mutation
  updateTasks(tasks: Task[]) {
    this.tasks = tasks
  }

  @Action
  async loadTasks() {
    const tasks: Task[] = await $axios.$get('/todo/tasks')
    this.updateTasks(tasks)
  }

  @Action
  async updatePriorityRank(payload: any) {
    // tasksがpriorityRank順に並んでいるという前提
    let patchPromises: Promise<Task>[] = []
    this.tasks.forEach((task) => {
      let newTask: Task = cloneDeep(task)
      if (payload.newRank <= task.priorityRank && task.priorityRank < payload.curRank) {
        newTask.priorityRank++
      } else if (payload.newRank < payload.curRank && task.priorityRank === payload.curRank) {
        newTask.priorityRank = payload.newRank
      } else if (payload.curRank < task.priorityRank && task.priorityRank <= payload.newRank) {
        newTask.priorityRank--
      } else if (payload.curRank < payload.newRank && task.priorityRank === payload.newRank) {
        newTask.priorityRank = payload.curRank
      } else {
        return
      }
      patchPromises.push($axios.$patch('/todo/tasks/' + newTask.taskId, newTask))
    })
    const resTasks: Task[] = await Promise.all(patchPromises)
    this.updateTasks(resTasks)
  }
}
