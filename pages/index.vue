<template>
  <v-container v-if="route.name !== 'index-id'">
    <v-row>
      <v-col cols="2" />
      <v-col>
        <v-row>
          <v-col class="text-right">
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

            <v-skeleton-loader
              v-if="loading"
              type="list-item"
            ></v-skeleton-loader>
            
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
</template>

<script setup>
import { onMounted } from 'vue'

useHead({
  title: 'To Do | List'
})

const route = useRoute()

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
  console.log('index fetching list...')
  clear()
  loading.value = true

  await nextTick()
  const response = await useAPIFetch('/todos')
  todos.value = await response.data?.value ?? clear()
  
  loading.value = false
}

function clear () {
  console.log('index should clear the list...')
  todos.value = ref([])
}

onMounted(() => {
  console.log('index should trigger on mounted...')
  init()
})
</script>