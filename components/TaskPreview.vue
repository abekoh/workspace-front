<template>
  <a-card class="card">
    <a-textarea :value="task.text" @change="updateLocalTask"/>
  </a-card>
</template>

<script lang="ts">
  import {Component, Emit, Prop, PropSync, Vue} from "vue-property-decorator"
  import Task from "~/models/Task"
  import _ from 'lodash'

  @Component
  export default class TaskPreview extends Vue {
    @Prop({type: Object, required: true}) task: Task

    @Emit()
    updateLocalTask(evt: any) {
      let newTask: Task = _.cloneDeep(this.task)
      newTask.text = evt.target.value
      return newTask
    }
  }
</script>

<style lang="scss">
  .card {
    margin: 0px;
    filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.2));
    width: 400px;
  }
</style>
