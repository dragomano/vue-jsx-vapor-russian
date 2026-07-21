import { ref } from 'vue'

export default () => {
  let id = 0
  const newTodo = ref('')
  const todos = ref([
    { id: id++, text: 'Изучить HTML' },
    { id: id++, text: 'Изучить JavaScript' },
    { id: id++, text: 'Изучить Vue' },
  ])
  function addTodo() {
    todos.value.push({
      id: id++,
      text: newTodo.value,
    })
    newTodo.value = ''
  }
  function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo)
  }
  return (
    <>
      <form onSubmit_prevent={addTodo}>
        <input
          value={newTodo.value}
          onInput={(e) => (newTodo.value = e.currentTarget.value)}
          required
          placeholder="название пункта"
        />
        <button>Добавить пункт</button>
      </form>
      <ul>
        <li v-for={todo in todos.value} key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo)}>X</button>
        </li>
      </ul>
    </>
  )
}
