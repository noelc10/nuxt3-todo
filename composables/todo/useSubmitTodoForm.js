import { useTodoStore } from '@/stores/todo/todoStore'
import { useVToastStore } from '@/stores/toast/vToastStore'

export const useSubmitTodoForm = async (type = 'add', data, id) => {
  const vToastStore = useVToastStore()
  const todoStore = useTodoStore()
  
  if (type === 'update') {
    return await todoStore.updateTodo(id, data)
      .then(() => {
        vToastStore.show({ message: 'Successfully updated selected to do!' })
      })
      .catch(() => {
        vToastStore.show({
          color: 'error',
          message: 'Something went wrong while updating your todo data to API.'
        })
      })
  }
  
  return await todoStore.saveTodo(data)
    .then(() => {
      vToastStore.show({ message: 'Successfully added to do!' })
    })
    .catch(() => {
      vToastStore.show({
        color: 'error',
        message: 'Something went wrong while submitting your todo data to API.'
      })
    })
}
