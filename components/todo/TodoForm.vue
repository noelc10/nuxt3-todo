<template>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="handleDialog(false)">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const { show } = defineProps([
  'show'
])
const emit = defineEmits(['handleDialog'])

let dialog = ref(false)

function handleDialog (data) {
  console.log('trigger TodoForm handleDialog...')
  dialog.value = data
  emit('handleDialog', data)

  if (!data) {
    navigateTo('/')
  }
}

watch(
  () => show,
  (val) => {
    console.log('should trigger watch for show dialog...')
    console.log('show: ', show)
    dialog.value = val
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  console.log('TodoForm onMounted...')
  dialog.value = show
})
</script>