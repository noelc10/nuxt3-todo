<template>
  <div>
    <ClientOnly>
      <v-container v-if="route.name !== 'index-id'">
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
                <todo-items v-if="todos.length" :todos="todos" />

                <v-row v-if="loading">
                  <v-col v-for="(n,i) in 4" :key="i" cols="3">
                    <v-skeleton-loader
                      type="list-item"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
                
                <div v-if="!todos.length && !loading" class="text-center">
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
import { onMounted } from 'vue'
import { useVToastStore } from '@/stores/vToastStore'
import { useConfirmDialogStore } from '@/stores/confirmDialogStore'

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

let todos = ref([])
let loading = ref(false)

watch(
  () => route.name,
  (val) => {
    if (val === 'index') {
      init()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

async function init () {
  clear()
  loading.value = true

  const { data, error } = await useAPIFetch('/todos')

  if (error.value) {
    console.error('Something went wrong while fetching to do lists!')
  }

  todos.value = await data?.value ?? clear()
  
  loading.value = false
}

function clear () {
  todos.value = []
}

onMounted(async () => {
  // vToastStore.show({ message: 'AYE!' })
  // confirmDialogStore
  //   .show('Are you sure you want to delete this category?', {
  //     title: 'Deleting Selected Business Category'
  //   })
  init()
})
</script>