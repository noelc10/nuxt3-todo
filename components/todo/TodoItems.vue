<template>
  <v-row>
    <v-col
      v-for="(todo, i) in todos"
      :key="i"
      cols="3"
    >
      <v-card
        :to="`/${todo.id}`"
        class="my-2"
      >
        <v-list
          lines="one"
          class="py-0"
        >
          <v-list-item
            class="py-0"
          >
            <v-list-item-title>{{ todo.title }}</v-list-item-title>
            <template v-slot:append>
              <v-icon :icon="'mdi-checkbox-marked-circle'" :color="todo.completed ? 'green' : 'disabled'" />
              <v-tooltip
                activator="parent"
                location="top"
              >
                {{ todo.completed ? 'Done' : 'Ongoing' }}
              </v-tooltip>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const { todos } = defineProps(['todos'])
</script>