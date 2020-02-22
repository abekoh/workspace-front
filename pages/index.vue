<template>
  <div class="container">
    <div>
      <TaskList />
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/vue-property-decorator"
  import TaskList from "~/components/TaskList.vue"

  @Component({
    components: {
      TaskList
    }
  })
  export default class Index extends Vue {
  }
</script>

<style>
  .container {
    margin: 10px auto;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    text-align: center;
  }
</style>
