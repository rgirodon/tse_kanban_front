<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="form-container">
      <b-form @submit.prevent="onSubmit" novalidate>

        <b-form-group
          id="input-group-title"
          label="Title:"
          label-for="input-title"
          label-cols="6"
          label-align="right"
        >
          <b-form-input
            id="input-title"
            ref="input-title"
            v-model="form.title"
            required
            placeholder="Enter title"
          ></b-form-input>
          <b-form-invalid-feedback
            id="input-title-invalid-feedback"
            ref="input-title-invalid-feedback"
          ></b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-type"
          label="Type:"
          label-for="input-type"
          label-cols="6"
          label-align="right"
        >
          <b-form-select required v-model="form.type" :options="taskTypesOptions" id="input-type" ref="input-type"></b-form-select>
          <b-form-invalid-feedback
            id="input-type-invalid-feedback"
            ref="input-type-invalid-feedback"
          ></b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-nbHoursForecast"
          label="Nb Hours Forecast:"
          label-for="input_nbHoursForecast"
          label-cols="6"
          label-align="right"
        >
          <b-form-input
            id="input-nbHoursForecast"
            ref="input-nbHoursForecast"
            v-model="form.nbHoursForecast"
            type="number"
            required
            placeholder="Enter Nb Hours Forecast"
          ></b-form-input>
          <b-form-invalid-feedback
            id="input-nbHoursForecast-invalid-feedback"
            ref="input-nbHoursForecast-invalid-feedback"
          ></b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-nbHoursReal"
          label="Nb Hours Real:"
          label-for="input-nbHoursReal"
          label-cols="6"
          label-align="right"
        >
          <b-form-input
            id="input-nbHoursReal"
            ref="input-nbHoursReal"
            v-model="form.nbHoursReal"
            type="number"
            required
            placeholder="Enter Nb Hours Real"
          ></b-form-input>
          <b-form-invalid-feedback
            id="input-nbHoursReal-invalid-feedback"
            ref="input-nbHoursReal-invalid-feedback"
          ></b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-developers"
          label="Developers:"
          label-for="input-developers"
          label-cols="6"
          label-align="right"
        >
          <b-form-select multiple required v-model="form.developers" :options="developersOptions" id="input-developers" ref="input-developers"></b-form-select>
          <b-form-invalid-feedback
            id="input-developers-invalid-feedback"
            ref="input-developers-invalid-feedback"
          ></b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" class="btn btn-kanban">Submit</b-button>

      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import authHeader from '../utils/authHeader';

export default {
  name: 'AddTask',
  data: function() {
    return {
      title: "Add Task",
      form: {
        title: '',
        type: '',
        nbHoursForecast: '',
        nbHoursReal: '',
        developers: []
      }     
    };
  },
  computed: {
    taskTypesOptions: function() {

      return this.$store.getters.taskTypesOptions;
    },
    developersOptions: function() {

      return this.$store.getters.developersOptions;
    }
  },
  mounted: function() {

    this.$store.dispatch('loadDevelopers');
  },
  methods: {
    onSubmit: function() {
      axios
        .post(process.env.VUE_APP_BACKEND_BASE_URL + '/tasks', 
          {
            title: this.form.title,
            type: {
              id: this.form.type
            },
            nbHoursForecast: this.form.nbHoursForecast,
            nbHoursReal: this.form.nbHoursReal,
            developers: this.form.developers.map(item => {
              return {
                id: item
              }
            })
          },
          { 
            headers: authHeader(this.$store.state) 
          })
        .then(() => {

          this.$store.dispatch('loadTasks');

          this.$router.push('/tasks');
        })
        .catch((error) => {
          
          for (let errorItem of error.response.data.errors) {
          
            if (errorItem.field == 'title') {
              this.$refs['input-title'].$el.classList.add('is-invalid');
              this.$refs['input-title-invalid-feedback'].innerText = errorItem.message;
            }
            if (errorItem.field == 'type.id') {
              this.$refs['input-type'].$el.classList.add('is-invalid');
              this.$refs['input-type-invalid-feedback'].innerText = errorItem.message;
            }
            if (errorItem.field == 'nbHoursForecast') {
              this.$refs['input-nbHoursForecast'].$el.classList.add('is-invalid');
              this.$refs['input-nbHoursForecast-invalid-feedback'].innerText = errorItem.message;
            }
            if (errorItem.field == 'nbHoursReal') {
              this.$refs['input-nbHoursReal'].$el.classList.add('is-invalid');
              this.$refs['input-nbHoursReal-invalid-feedback'].innerText = errorItem.message;
            }
            if (errorItem.field == 'developers') {
              this.$refs['input-developers'].$el.classList.add('is-invalid');
              this.$refs['input-developers-invalid-feedback'].innerText = errorItem.message;
            }
          }
        });
    }
  }
}
</script>

<style scoped>
h1 {
  padding: 20px 0;
  margin: 0;
}
.form-container {
  margin: 0 auto;
  max-width: 60%;
}
.btn.btn-kanban {
  background-color: #17a2b8;
  color: #fff;
}
</style>
