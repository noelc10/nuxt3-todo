<template>
  <todo-form v-if="show" :show="show" @dialog="handleDialog" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

let show = ref(false)
const route = useRoute()

function init () {
  console.log('loading add to do UI...')
  show.value = route.name === 'index-add' || false
  console.log(show.value)
}

function handleDialog (dialog) {
  show.value = dialog
}

onMounted(() => {
  init()
})
</script>