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
    const dummyTasks: Task[] = [
      {
        taskId: 1,
        taskListId: 1,
        createdOn: new Date('2020-01-01T10:00:00'),
        updatedOn: new Date('2020-01-01T10:00:00'),
        text: '寝る',
        deadline: new Date('2020-01-01T10:00:00'),
        completed: false,
        deleted: false,
        priortyRank: 1
      },
      {
        taskId: 2,
        taskListId: 1,
        createdOn: new Date('2020-01-01T10:00:00'),
        updatedOn: new Date('2020-01-01T10:00:00'),
        text: '寝る',
        deadline: new Date('2020-01-01T10:00:00'),
        completed: false,
        deleted: false,
        priortyRank: 1
      }
    ]
    resolve(dummyTasks)
  })
}
