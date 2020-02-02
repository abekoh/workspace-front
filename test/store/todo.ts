import {createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import Todo from '@/store/todo'

const sum = (x, y) => x + y

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

const localVue = createLocalVue()
localVue.use(Vuex)

test('todo.add', () => {
  const state = {
    tasks: [{taskId: 1}]
  }
  Todo.mutations.updateTasks(state)
  expect(state.tasks).toBe(1)
})
