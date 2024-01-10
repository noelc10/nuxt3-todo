<template>
  <v-container>
    <v-row>
      <v-col cols="2" />
      <v-col>
        <todo-item :todo="todo" />
      </v-col>
      <v-col cols="2" />
    </v-row>
  </v-container>
  <todo-item :todo="todo" />
</template>

<script setup>
useHead({
  title: 'To Do |Details'
})

const { id } = useRoute().params
const { data: todo } = await useFetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
</script>