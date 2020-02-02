<template>
  <a-list itemLayout="horizontal" :dataSource="tasks" :split="false">
    <a-list-item slot="renderItem" slot-scope="task">
      <draggable @end="onEnd">
        <TaskPreview :key="task.taskId" :task="task"/>
      </draggable>
    </a-list-item>
  </a-list>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {todoStore} from '~/store'
  import TaskPreview from "~/components/TaskPreview.vue"

  @Component({
    components: {
      TaskPreview
    }
  })
  export default class TaskList extends Vue {
    get tasks() {
      return todoStore.tasks
    }

    async created() {
      await todoStore.loadTasks()
    }

    async onEnd() {
      await todoStore.updatePriorityRank({curRank: 1, newRank: 3})
    }
  }
</script>

<style lang="scss">
</style>
