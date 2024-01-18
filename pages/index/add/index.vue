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

  await useSubmitTodoForm('add', data)
    .then(() => {
      handleDialog(false)
    })

  loading.value = false
}

onMounted(() => {
  init()
})
</script>