<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
        <b-table striped hover :items="developers" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Developers',
    data: function() {
        return {
            title: "Developers",
            fields: [
                {
                    key: 'id',
                    label: 'ID'
                },
                {
                    key: 'firstname',
                    label: 'First Name'
                },
                {
                    key: 'lastname',
                    label: 'Last Name'
                },
                {
                    key: 'startContract',
                    label: 'Start Contract',
                    formatter: 'startContractFormat'
                }
            ],
        };
    },
    computed: {
        developers: function() {
            return this.$store.state.developers;
        }
    },
    mounted: function() {
        this.$store.dispatch('loadDevelopers');
    },
    methods: {
        startContractFormat: function(value) {
            return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
    }
}
</script>

<style scoped>
h1 {
  padding: 20px 0;
  margin: 0;
}
</style>
