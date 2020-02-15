import {createLocalVue} from "@vue/test-utils"
import Vuex, {Store} from 'vuex'
import Todo from "~/store/todo"
import Task from "~/models/Task"
import axios from 'axios'

const sampleTask: Task = {
  completed: false,
  createdOn: undefined,
  deadline: undefined,
  deleted: false,
  priorityRank: 0,
  taskListId: 0,
  text: "",
  updatedOn: undefined,
  taskId: 1
}

jest.mock('axios', () => ({
    $get: jest.fn(url => {
      const tasks = [{taskId: 1}]
      return Promise.resolve(tasks)
    }),
  }
))

interface StoreType {
  todo: Todo
}

const localVue = createLocalVue()
localVue.use(Vuex)

let store: Store<StoreType>

beforeEach(() => {
  store = new Store<StoreType>(
    {
      modules: {todo: Todo}
    }
  )
})

describe('setLocalTasks', () => {
  test('localTasksに正しくセットされる', () => {
    let inputTasks: Task[] = [sampleTask]
    store.commit('todo/setLocalTasks', inputTasks)
    expect(store.state.todo.localTasks).toBe(inputTasks)
  })
})

describe('setRemoteTasks', () => {
  test('remoteTasksに正しくセットされる', () => {
    let inputTasks: Task[] = [sampleTask]
    store.commit('todo/setRemoteTasks', inputTasks)
    expect(store.state.todo.remoteTasks).toBe(inputTasks)
  })
})

// TODO: axiosをうまくmock化したテスト書きたい
describe('pullTasks', () => {
  test('APIを叩いて全件取得', () => {
    expect(true).toBe(true)
  })
})

// TODO: axiosをうまくmock化したテスト書きたい
describe('pushTasks', () => {
  test('add', () => {
    expect(true).toBe(true)
  })
  test('remove', () => {
    expect(true).toBe(true)
  })
  test('update', () => {
    expect(true).toBe(true)
  })
})
