import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

import authHeader from '../utils/authHeader';

export default new Vuex.Store({
  state: {    
    accessToken: '',
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
    initJwt: function(state, payload) {

      state.accessToken = payload.accessToken;
    },
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

      axios
        .post(process.env.VUE_APP_BACKEND_BASE_URL + '/oauth/token?scope=any&grant_type=client_credentials',
          {

          },
          {
            auth: {
              username: process.env.VUE_APP_CLIENT_ID,
              password: process.env.VUE_APP_CLIENT_SECRET
            }
          }
        )
        .then(function(response){

          let payload = {
            accessToken : response.data.access_token
          }

          context.commit('initJwt', payload);

          context.dispatch('loadTaskStatus');

          context.dispatch('loadTaskTypes');
        }); 
    },
    loadDevelopers: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/developers', { headers: authHeader(context.state) })

        .then(function(response){

          let payload = {
            developers : response.data
          };

          context.commit('loadDevelopers', payload);
        });      
    },
    loadTaskStatus: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/task_status', { headers: authHeader(context.state) })

        .then(function(response){

          let payload = {
            taskStatus : response.data
          };

          context.commit('loadTaskStatus', payload);
        });      
    },
    loadTaskTypes: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/task_types', { headers: authHeader(context.state) })

        .then(function(response){

          let payload = {
            taskTypes : response.data
          };

          context.commit('loadTaskTypes', payload);
        });      
    },
    loadTasks: function(context) {

      axios
        .get(process.env.VUE_APP_BACKEND_BASE_URL + '/tasks', { headers: authHeader(context.state) })

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
          },
          { 
            headers: authHeader(context.state) 
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
          },
          { 
            headers: authHeader(context.state) 
          })
        .then(function(){

          context.dispatch('loadTasks');
        });      
    }
  },
  modules: {
  }
});