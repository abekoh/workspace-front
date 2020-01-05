<template>
  <div>
    <p>{{ task.text }}</p>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator"
  import Task from "~/models/Task"

  @Component
  export default class TaskPreview extends Vue {
    @Prop({type: Object, required: true}) task!: Task
  }
</script>

<style scoped>

</style>
