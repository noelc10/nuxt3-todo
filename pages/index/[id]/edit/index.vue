<template>
  <todo-form v-if="show && todo" :show="show" :loading="loading" :type="'edit'" :todo="todo" @dialog="handleDialog" @submit="handleSubmit" />
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo/todoStore'
import { useVToastStore } from '@/stores/toast/vToastStore'

const route = useRoute()
const vToastStore = useVToastStore()
const todoStore = useTodoStore()
const { todo } = storeToRefs(todoStore)
const { id } = route.params

let show = ref(false)
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

  show.value = route.name === 'index-id-edit'

  loading.value = false
}

async function handleDialog(dialog) {
  show.value = dialog

  if (!dialog) {
    await navigateTo('/')
  }
}

async function handleSubmit(data) {
  loading.value = true

  await useSubmitTodoForm('update', data, id)
    .then(() => {
      handleDialog(false)
    })

  loading.value = false
}

watch(
  () => route.name,
  (val) => {
    if (val === 'index-id-edit') {
      init()
    }
  },
  {
    immediate: true
  }
)
</script>