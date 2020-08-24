<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="container">
        <div class="row mb-1">
            <div class="col-3 columnHeader" v-for="item in taskStatus" v-bind:key="item.id">
                 <button type="button" class="btn btn-kanban">{{ item.label }}</button>
            </div>           
        </div>
        <div class="row" v-for="task in tasks" v-bind:key="task.id">
            <div class="col-3" v-for="currentTaskStatus in taskStatus" v-bind:key="currentTaskStatus.id">
                <div class="card px-1" v-if="task.status.id == currentTaskStatus.id">
                  <h5 class="card-title mt-3">
                    <a class="task-action" v-if="displayMoveLeft(task.status.label)" v-on:click.prevent="moveLeft(task.id)" v-b-tooltip.hover.bottom="'Move left'">&lt;&lt;</a> {{ task.title }} <a class="task-action" v-on:click.prevent="moveRight(task.id)" v-if="displayMoveRight(task.status.label)" v-b-tooltip.hover.bottom="'Move right'">&gt;&gt;</a>
                  </h5>
                  <p>
                    {{ task.type.label }}
                  </p>
                  <p>
                    {{ task.nbHoursReal }}h (Real) / {{ task.nbHoursForecast }}h (Fcst)
                  </p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data: function() {
    return {
      title: "Tasks"
    };
  },
  computed: {
    taskStatus: function() {
      return this.$store.state.taskStatus;
    },
    tasks: function() {
      return this.$store.state.tasks;
    }
  },
  mounted: function() {
    this.$store.dispatch('loadTasks');
  },
  methods: {
    displayMoveLeft: function(label) {

      return(label != process.env.VUE_APP_TASK_STATUS_TODO_LABEL);
    },
    moveLeft: function(id) {

      let payload = {
        taskId : id
      };

      this.$store.dispatch('moveLeftTask', payload);
    },
    displayMoveRight: function(label) {

      return(label != process.env.VUE_APP_TASK_STATUS_DONE_LABEL);
    },
    moveRight: function(id) {

      let payload = {
        taskId : id
      };

      this.$store.dispatch('moveRightTask', payload);
    }
  }
}
</script>

<style scoped>
h1 {
  padding: 20px 0;
  margin: 0;
}
.btn.btn-kanban:not(:disabled) {
  background-color: #17a2b8;
  color: #fff;
  cursor: default;
}
.task-action {
  color: #17a2b8;
  cursor: pointer;
}
</style>
