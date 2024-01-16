<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2" />
        <v-col>
          <todo-item :loading="loading" :todo="todo" />
        </v-col>
        <v-col cols="2" />
      </v-row>
    </v-container>
    
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useVToastStore } from '@/stores/toast/vToastStore'
import { useTodoStore } from '@/stores/todo/todoStore'

useHead({
  title: 'To Do | Details'
})

const route = useRoute()
const { id } = route.params
const vToastStore = useVToastStore()
const todoStore = useTodoStore()
const { todo } = storeToRefs(todoStore)

let loading = ref(false)

async function init() {
  loading.value = true

  await todoStore.getTodo(id)
    .catch(async () => {
      vToastStore.show({
        color: 'error',
        message: 'Something went wrong while fetching to do details!'
      })
      await navigateTo('/')
    })

  loading.value = false
}

watch(
  () => route.name,
  (val) => {
    if (val === 'index-id') {
      init()
    }
  },
  {
    immediate: true
  }
)

onMounted(() => {
  init()
})
</script>