import {createLocalVue} from "@vue/test-utils"
import Vuex from 'vuex'
import {todoStore} from "~/utils/store-accessor"
import {cloneDeep} from "lodash"
import Todo from "~/store/todo"
import Task from "~/models/Task"

interface StoreType {
  todo: Todo
}

// test('updateTasksFromUI', () => {
//   const localVue = createLocalVue()
//   localVue.use(Vuex)
//
//   const store = new Vuex.Store<StoreType>(
//     {
//       modules: {todo: Todo}
//     }
//   )
//   expect(store.state.todo.addedTasks).toBe([])
// })
