<template>
  <div>
    <li v-for="task in tasks" :key="task.id">
      {{ task.text }}
    </li>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {todoStore} from '~/store'

  @Component
  export default class Todo extends Vue {
    get tasks() {
      return todoStore.tasks
    }

    async created() {
      await todoStore.loadTasks()
    }
  }
</script>

<style scoped>

</style>
