<template>
  <a-card class="card">
    <div class="text">
      <a-textarea :value="task.text" @change="updateLocalTask" autosize/>
    </div>
    <p class="deadline" v-if="task.deadline">
      {{ formatDate(task.deadline) }}
    </p>
  </a-card>
</template>

<script lang="ts">
  import {Component, Emit, Prop, PropSync, Vue} from "vue-property-decorator"
  import Task from "~/models/Task"
  import moment from 'moment'
  import _ from 'lodash'

  @Component
  export default class TaskPreview extends Vue {
    @Prop({type: Object, required: true}) task: Task

    formatDate(date: Date) {
      return moment(date).format('YYYY/MM/DD')
    }


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
    margin: 10px;
    /*filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.2));*/
    width: 400px;

    .ant-card-body {
      padding: 10px;
    }
  }

  .text {
    border: none;

    textarea {
      // 右下の模様削除
      resize: none;
    }

    .ant-input {
      border: none;
    }

    .ant-input:focus {
      border: none;
      box-shadow: none;
    }
  }

  .deadline {
    font-size: 12px;
    color: rgb(159, 159, 159);
    text-align: right;
    margin: 0;
  }
</style>
