<template>
  <div>
    <ClientOnly>
      <v-container v-if="hideContainer">
        <v-row>
          <v-col cols="2" />
          <v-col>
            <v-row>
              <v-col class="text-center text-sm-right">
                <v-btn
                  color="primary"
                  :to="'/add'"
                  :loading="loading"
                  :disabled="loading"
                >
                  <v-icon left>
                    $plus
                  </v-icon>
                  Add To Do
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <todo-items v-if="todos?.length" :todos="todos" />

                <v-row v-if="loading">
                  <v-col v-for="(n,i) in 4" :key="i" cols="3">
                    <v-skeleton-loader
                      type="list-item"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
                
                <div v-if="!todos?.length && !loading" class="text-center">
                  Empty task list.
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2" />
        </v-row>
      </v-container>

      <NuxtPage />
    </ClientOnly>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useVToastStore } from '@/stores/toast/vToastStore'
import { useConfirmDialogStore } from '@/stores/dialogs/confirmDialogStore'
import { useTodoStore } from '@/stores/todo/todoStore'

useHead({
  title: 'To Do | List'
})

definePageMeta({
  layout: 'default'
});

const nuxtApp = useNuxtApp()
const route = useRoute()
const vToastStore = useVToastStore()
const confirmDialogStore = useConfirmDialogStore()

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

let loading = ref(false)

const hideContainer = computed(() => {
  const pages = ['index-id']

  return !pages.includes(route.name)
})

watch(
  () => route.name,
  (val) => {
    init()
  },
  {
    immediate: true
  }
)

async function init() {
  todoStore.clearTodos()
  loading.value = true

  await todoStore.getTodos()
    .catch(() => {
      vToastStore.show({ color: 'error', message: 'Something went wrong while fetching to do lists!' })
    })
  
  loading.value = false
}

onMounted(() => {
  init()
})
</script>