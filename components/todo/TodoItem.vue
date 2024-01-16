<template>
  <v-row v-if="props.loading">
    <v-col>
      <v-skeleton-loader
        type="list-item"
      />
    </v-col>
  </v-row>
  <v-row v-if="isEmptyTodoDetails && !props.loading">
    <v-col class="text-center">
      Empty task details.
    </v-col>
  </v-row>
  <v-row v-if="!isEmptyTodoDetails && !props.loading">
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
              <v-icon :icon="'mdi-checkbox-marked-circle'" :color="props.todo?.completed ? 'green' : 'disabled'" />
              <v-tooltip
                activator="parent"
                location="top"
              >
                {{ props.todo?.completed ? 'Done' : 'Ongoing' }}
              </v-tooltip>
            </template>
            <v-list-item-title>{{ props.todo?.title }}</v-list-item-title>
            <template v-slot:append>
              <v-btn
                icon
                variant="plain"
                size="small"
                :to="`/${props.todo?.id}/edit`"
              >
                <v-icon :icon="'mdi-pencil'" color="info" />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  Edit
                </v-tooltip>
              </v-btn>
              <v-btn
                icon
                variant="plain"
                size="small"
                @click="deleteTodo"
              >
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
import { useVToastStore } from '@/stores/toast/vToastStore'
import { useConfirmDialogStore } from '@/stores/dialogs/confirmDialogStore'
import { useTodoStore } from '@/stores/todo/todoStore'

const props = defineProps({
  todo: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const vToastStore = useVToastStore()
const confirmDialogStore = useConfirmDialogStore()
const todoStore = useTodoStore()
const isEmptyTodoDetails = computed(() => {
  return !props.todo
})

async function deleteTodo() {
  const confirm = await confirmDialogStore.show('Are you sure you want to delete this To Do?', {
    title: 'Deleting To Do'
  })

  if (confirm) {
    await todoStore.deleteTodo(props.todo.id)
      .then(async () => {
        vToastStore.show({
          message: 'Successfully deleted to do!'
        })

        await navigateTo('/')
      })
      .catch(() => {
        vToastStore.show({
          color: 'error',
          message: 'Something went wrong while deleting to do!'
        })
      })
  }
}

</script>