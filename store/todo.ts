import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import Task from '~/models/Task'
import {$axios} from "~/utils/api"

export interface ITodoState {
  tasks: Task[]
}

@Module({stateFactory: true, namespaced: true, name: 'todo'})
export default class Todo extends VuexModule implements ITodoState {
  tasks: Task[] = []

  @Mutation
  addTasks(tasks: Task[]) {
    this.tasks = tasks
  }

  @Action
  async loadTasks() {
    const tasks = await $axios.$get('/todo/tasks')
    this.addTasks(tasks)
  }
}
