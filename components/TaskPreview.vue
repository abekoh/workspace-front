<template>
  <a-card class="card">
    <p>{{ task.text }}</p>
  </a-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator"
  import Task from "~/models/Task"

  @Component
  export default class TaskPreview extends Vue {
    @Prop({type: Object, required: true}) task: Task
  }
</script>

<style lang="scss">
  .card {
    margin: 0px;
    filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.2));
    width: 400px;
  }
</style>
