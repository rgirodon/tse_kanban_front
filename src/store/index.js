import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {    
    developers: [],
    taskTypes: [],
    taskStatus: [],
    tasks: []
  },
  getters: {
    developersOptions: (state) => {

      return state.developers.map(developer => {

        return {
          value: developer.id,
          text: developer.firstname + ' ' + developer.lastname
        };
      });
    },
    taskTypesOptions: (state) => {

      return state.taskTypes.map(taskType => {

        return {
          value: taskType.id,
          text: taskType.label
        };
      });
    }
  },
  mutations: {
    loadDevelopers: function(state, payload) {

      state.developers = payload.developers;
    },
    loadTaskStatus: function(state, payload) {

      state.taskStatus = payload.taskStatus;
    },
    loadTaskTypes: function(state, payload) {

      state.taskTypes = payload.taskTypes;
    },
    loadTasks: function(state, payload) {

      state.tasks = payload.tasks;
    }
  },
  actions: {
    initializeApp: function(context) {

      context.dispatch('loadTaskStatus');

      context.dispatch('loadTaskTypes'); 
    },
    loadDevelopers: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/developers')

        .then(function(response){

          let payload = {
            developers : response.data
          };

          context.commit('loadDevelopers', payload);
        });      
    },
    loadTaskStatus: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/task_status')

        .then(function(response){

          let payload = {
            taskStatus : response.data
          };

          context.commit('loadTaskStatus', payload);
        });      
    },
    loadTaskTypes: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/task_types')

        .then(function(response){

          let payload = {
            taskTypes : response.data
          };

          context.commit('loadTaskTypes', payload);
        });      
    },
    loadTasks: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/tasks')

        .then(function(response){

          let payload = {
            tasks : response.data
          };

          context.commit('loadTasks', payload);
        });      
    },
    moveLeftTask: function(context, payload) {

      axios
        .patch(process.env.VUE_APP_BACKEND_BASE_URL + '/tasks/' + payload.taskId,          
          {
            action: process.env.VUE_APP_ACTION_MOVE_LEFT
          })
        .then(function(){

          context.dispatch('loadTasks');
        });      
    },
    moveRightTask: function(context, payload) {

      axios
        .patch(process.env.VUE_APP_BACKEND_BASE_URL + '/tasks/' + payload.taskId, 
          {
            action: process.env.VUE_APP_ACTION_MOVE_RIGHT
          })
        .then(function(){

          context.dispatch('loadTasks');
        });      
    }
  },
  modules: {
  }
});