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
</template>

<script setup>
useHead({
  title: 'To Do | Details'
})

const route = useRoute()
const { id } = route.params

await nextTick()
const { data: todo } = await useAPIFetch(`/todos/${id}`)
</script>