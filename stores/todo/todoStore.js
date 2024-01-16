import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todoStore', () => {
  let todos = ref([])
  let todo = ref(null)

  async function getTodos() {
    const { data } = await useAPIFetch('/todos')

    todos.value = data?.value ?? clearTodos()
  }

  async function getTodo(id) {
    const { data } = await useAPIFetch(`/todos/${id}`)

    todo.value = data?.value ?? clearTodo()
  }

  async function saveTodo(data) {
    await useAPIFetch('/todos', {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json',
      }
    })
  }

  async function deleteTodo(id) {
    await useAPIFetch(`/todos/${id}`, {
      method: 'DELETE'
    })
  }

  async function updateTodo(id, data) {
    await useAPIFetch(`/todos/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-type': 'application/json',
      }
    })
  }

  function clearTodos() {
    todos.value = []
  }

  function clearTodo() {
    todo.value = null
  }

  return {
    todos,
    todo,
    getTodos,
    getTodo,
    saveTodo,
    deleteTodo,
    updateTodo,
    clearTodos,
    clearTodo
  }
})