<template>
  <v-card
    v-for="(todo, i) in todos"
    :key="i"
    class="my-2"
  >
    <v-list
      lines="one"
      class="py-0"
    >
      <v-list-item
        :to="`/${todo.id}`"
        class="py-0"
      >
        <v-list-item-title>{{ todo.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
const { todos } = defineProps(['todos'])
</script>