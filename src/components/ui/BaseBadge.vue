<template>
    <span class="badge" :class="mode">
      {{title}}
    </span>
  </template>
  
  <script>
  export default {
    props: ['mode', 'text'],
    computed: {
      title() {
        return this.text.toUpperCase();
      }
    }
  }
  </script>
  
  <style scoped>
  .badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #00498d;
  color: white;
}

.backend {
  background-color: #015bae;
  color: white;
}

.career {
  background-color: #0068c9;
  color: white;
}
  </style>