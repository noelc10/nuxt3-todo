<template>
  <v-dialog
    v-model="dialog"
    persistent
    min-width="300px"
    width="auto"
  >
    <v-form @submit.prevent="handleSubmit">
      <v-card
        :loading="props.loading"
      >
        <v-card-title>
          <v-container fluid fill-height class="px-0">
            <v-row align="center">
              <v-col>
                {{ props.type === 'edit' ? 'Edit' : 'Add' }} To Do
              </v-col>
              <v-spacer />
              <v-col class="text-right">
                <v-btn icon variant="plain" size="small" @click="handleDialog(false)">
                  <v-icon :icon="'mdi-close'" />
                    <v-tooltip
                      activator="parent"
                      location="top"
                      :disabled="props.loading"
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
            :disabled="props.loading"
            :loading="props.loading"
            label="Title"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.completed"
            :label="form.completed ? 'Done' : 'Ongoing'"
            :disabled="props.loading"
            :loading="props.loading"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            type="submit"
            variant="tonal"
            color="primary"
            :disabled="props.loading"
            :loading="props.loading"
          >
            {{ props.type === 'edit' ? 'Update' : 'Add' }}
          </v-btn>
          
          <v-btn
            variant="tonal"
            color="error"
            :disabled="props.loading"
            :loading="props.loading"
            @click="handleDialog(false)"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const nuxtApp = useNuxtApp()
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'add'
  },
  todo: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['dialog', 'submit'])
const titleRules = reactive([
  v => !!v || 'Title is required'
])

let dialog = ref(false)
let form = ref({
  title: '',
  completed: false
})

function init() {
  if (props.type === 'edit') {
    form.value.title = props.todo?.title
    form.value.completed = props.todo?.completed
  }
}

function handleDialog(data) {
  dialog.value = data
  
  setTimeout(() => {
    emit('dialog', data)
  }, 1000)
}

async function handleSubmit() {
  emit('submit', form)
}

watch(
  () => props.show,
  (val) => {
    dialog.value = val
  },
  {
    immediate: true
  }
)

onMounted(() => {
  init()
})
</script>