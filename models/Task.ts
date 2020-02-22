export default interface Task {
  taskId: number
  taskListId?: number
  createdOn?: Date
  updatedOn?: Date
  text: string
  deadline?: Date
  completed: boolean
  deleted: boolean
  priorityRank: number
}
