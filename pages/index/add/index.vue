<template>
  <todo-form :show="show" :loading="loading" @dialog="handleDialog" @submit="handleSubmit" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo/todoStore'
import { useVToastStore } from '@/stores/toast/vToastStore'

const route = useRoute()
const todoStore = useTodoStore()
const vToastStore = useVToastStore()

let show = ref(false)
let loading = ref(false)

function init() {
  show.value = route.name === 'index-add'
}

async function handleDialog(dialog) {
  show.value = dialog

  if (!dialog) {
    await navigateTo('/')
  }
}

async function handleSubmit(data) {
  loading.value = true

  await todoStore.saveTodo(data)
    .then(() => {
      vToastStore.show({ message: 'Successfully added to do!' })

      handleDialog(false)
    })
    .catch(() => {
      vToastStore.show({
        color: 'error',
        message: 'Something went wrong while submitting your todo data to API.'
      })
    })

  loading.value = false
}

onMounted(() => {
  init()
})
</script>