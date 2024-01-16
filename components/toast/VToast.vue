<template>
  <v-snackbar
    v-model="vToastStore.showSnackbar"
    :color="vToastStore.color"
    :timeout="vToastStore.timer"
    bottom
    right
    app
    content-class="d-flex"
  >
    <v-icon left class="d-inline-flex" :icon="vToastStore.icon" />
    
    {{ vToastStore.message }}

    <template v-slot:actions>
      <v-btn
        icon
        variant="plain"
        size="small"
        @click="vToastStore.showSnackbar = false"
      >
        <v-icon icon="mdi-close" />
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useVToastStore } from '@/stores/toast/vToastStore'

const vToastStore = useVToastStore()
</script>
