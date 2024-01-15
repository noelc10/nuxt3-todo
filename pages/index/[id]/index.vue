<template>
  <v-container>
    <v-row>
      <v-col cols="2" />
      <v-col>
        <todo-item :loading="loading" :todo="todo" />
      </v-col>
      <v-col cols="2" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'To Do | Details'
})

const route = useRoute()
const { id } = route.params
let loading = ref(false)
let todo = ref(null)

async function init () {
  loading.value = true

  await nextTick()
  const { data, error } = await useAPIFetch(`/todos/${id}`)

  if (error.value) {
    console.error('Something went wrong while fetching to do details!')
    await navigateTo('/')
  }

  todo.value = await data?.value ?? {}

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
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  init()
})
</script>