import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfirmDialogStore = defineStore('confirmDialogStore', () => {
  const open = ref(false)
  const options = ref({
    title: '',
    message: '',
    color: 'error',
    cancelColor: '',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    cancelTypeText: true,
    confirmTypeText: false,
    width: '500'
  })

  function show (message, opts = {}) {
    options.value = {
      ...options.value,
      ...opts,
      message
    }
    open.value = true
  }

  function cancel () {
    open.value = false
    $reset()
  }

  function confirm () {
    open.value = false
    $reset()
  }

  function $reset () {
    options.value = {
      color: 'error',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      width: '500'
    }
  }

  return {
    open,
    options,
    show,
    cancel,
    confirm,
    $reset
  }
})