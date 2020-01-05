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
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
