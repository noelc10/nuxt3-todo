<template>
  <v-card>
    <v-list-item>
      <v-list-item-title>{{ todo.title || '' }}</v-list-item-title>
    </v-list-item>
  </v-card>
</template>

<script>
const { todo } = defineProps(['todo'])
</script>