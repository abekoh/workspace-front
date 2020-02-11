import {createLocalVue} from "@vue/test-utils"
import Vuex, {Store} from 'vuex'
import Todo from "~/store/todo"
import Task from "~/models/Task"
import {NuxtAxiosInstance} from "@nuxtjs/axios"
import {$axios} from "~/utils/api"
import axios, { AxiosInstance } from 'axios';

jest.mock('NuxtAxiosInstance')
const mockedAxios: jest.Mocked<NuxtAxiosInstance> = $axios as jest.Mocked<typeof $axios>
mockedAxios.$get.mockResolvedValue({taskId: 1, text: 'やること'})


interface StoreType {
  todo: Todo
}

let store: Store<StoreType>

beforeEach(() => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  store = new Store<StoreType>(
    {
      modules: {todo: Todo}
    }
  )
})

describe('setLocalTasks', () => {
  test('localTasksに正しくセットされる', () => {
    let inputTasks: Task[] = []
    inputTasks.push({
      taskId: 1,
      taskListId: 0,
      text: 'やること',
      completed: false,
      createdOn: new Date(),
      deadline: new Date(),
      deleted: false,
      priorityRank: 0,
      updatedOn: new Date(),
    })
    store.commit('todo/setLocalTasks', inputTasks)
    expect(store.state.todo.localTasks).toBe(inputTasks)
  })
})

describe('setRemoteTasks', () => {
  test('remoteTasksに正しくセットされる', () => {
    let inputTasks: Task[] = []
    inputTasks.push({
      taskId: 1,
      taskListId: 0,
      text: 'やること',
      completed: false,
      createdOn: new Date(),
      deadline: new Date(),
      deleted: false,
      priorityRank: 0,
      updatedOn: new Date(),
    })
    store.commit('todo/setRemoteTasks', inputTasks)
    expect(store.state.todo.remoteTasks).toBe(inputTasks)
  })
})

describe('pullTasks', () => {
  test('APIを叩いて全件取得', () => {
    store.dispatch('todo/pullTasks')
    expect(mockedAxios).toHaveBeenCalled()
  })
})
