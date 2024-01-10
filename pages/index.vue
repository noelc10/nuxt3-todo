<template>
  <v-container>
    <v-row>
      <v-col cols="2" />
      <v-col>
        <todo-items :todos="todos" />
      </v-col>
      <v-col cols="2" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

useHead({
  title: 'To Do | List'
})

// let todos = ref([])
let loading = ref(false)

const { data: todos } = await useFetch('https://jsonplaceholder.typicode.com/todos')

async function init () {
  console.log('calling init...')
  loading = true
  // console.log(data.todos)
  // todos = data

  loading = false
}

onMounted(() => {
  init()  
})
</script>