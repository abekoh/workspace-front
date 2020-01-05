import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import Task from '~/models/Task'

export interface ITodoState {
  tasks: Task[]
}

@Module({stateFactory: true, namespaced: true, name: 'todo'})
export default class Todo extends VuexModule implements ITodoState {
  tasks: Task[] = []

  @Mutation
  addTask(task: Task) {
    this.tasks = [...this.tasks, task]
  }

  @Action
  async loadTasks() {
    const tasks = await fetchTasks()
    tasks.forEach(task => {
      this.addTask(task)
    })
  }
}

const fetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    const dummyPosts: Task[] = [
      {
        id: 1,
        text: 'Hello World'
      },
      {
        id: 2,
        text: 'My Second Post'
      },
      {
        id: 3,
        text: 'Try Nuxt.js'
      }
    ]
    resolve(dummyPosts)
  })
}
