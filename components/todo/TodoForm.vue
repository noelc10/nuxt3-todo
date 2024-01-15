<template>
  <v-dialog
    v-model="dialog"
    persistent
    min-width="300px"
    width="auto"
  >
    <v-form @submit.prevent>
      <v-card>
        <v-card-title>
          <v-container fluid fill-height class="px-0">
            <v-row align="center">
              <v-col>
                Add To Do
              </v-col>
              <v-spacer />
              <v-col class="text-right">
                <v-btn icon variant="plain" size="small" @click="handleDialog(false)">
                  <v-icon :icon="'mdi-close'" />
                    <v-tooltip
                      activator="parent"
                      location="top"
                    >
                      Close
                    </v-tooltip>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.title"
            :rules="titleRules"
            label="Title"
            variant="outlined"
          />
          <v-checkbox v-model="form.completed" label="Completed" />
        </v-card-text>
        <v-card-actions class="justify-sm-end justify-center">
          <v-btn type="submit" variant="tonal" color="primary">Add</v-btn>
          <v-btn variant="tonal" color="error" @click="handleDialog(false)">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const nuxtApp = useNuxtApp()
const { show } = defineProps([
  'show'
])
const emit = defineEmits(['handleDialog'])
const titleRules = reactive([
  v => !!v || 'Name is required'
])

let dialog = ref(false)
let form = ref({
  title: '',
  completed: false
})

async function handleDialog (data) {
  dialog.value = data
  emit('handleDialog', data)

  if (!data) {
    await navigateTo('/')
  }
}

watch(
  () => show,
  (val) => {
    dialog.value = val
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  dialog.value = show
})
</script>