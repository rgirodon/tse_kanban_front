<template>
  <div>
    <h1>{{ title }}</h1>    
    <img src="../assets/kanban-logo.png" alt="Kanban logo">
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: function() {
    return {
      title: "Welcome to our Kanban App"
    };
  }
}
</script>

<style scoped>
h1 {
  padding: 20px 0 0 0;
  margin: 0;
}
img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
</style>
