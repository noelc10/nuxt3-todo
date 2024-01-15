<template>
  <v-row v-if="loading">
    <v-col>
      <v-skeleton-loader
        type="list-item"
      />
    </v-col>
  </v-row>
  <v-row v-if="isEmptyTodoDetails && !loading">
    <v-col class="text-center">
      Empty task details.
    </v-col>
  </v-row>
  <v-row v-if="!isEmptyTodoDetails && !loading">
    <v-col>
      <v-card class="my-2">
        <v-list
          lines="one"
          class="py-0"
        >
          <v-list-item
            class="py-0"
          >
            <template v-slot:prepend>
              <v-icon :icon="'mdi-checkbox-marked-circle'" :color="todo?.completed ? 'green' : 'disabled'" />
              <v-tooltip
                activator="parent"
                location="top"
              >
                {{ todo.completed ? 'Done' : 'Ongoing' }}
              </v-tooltip>
            </template>
            <v-list-item-title>{{ todo?.title }}</v-list-item-title>
            <template v-slot:append>
              <v-btn icon variant="plain" size="small">
                <v-icon :icon="'mdi-pencil'" color="info" />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  Edit
                </v-tooltip>
              </v-btn>
              <v-btn icon variant="plain" size="small">
                <v-icon :icon="'mdi-delete'" color="error" />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  Delete
                </v-tooltip>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'

const { todo, loading } = defineProps(['todo', 'loading'])

const isEmptyTodoDetails = computed(() => {
  return !!todo
})
</script>