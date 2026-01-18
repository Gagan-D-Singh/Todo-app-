import { fetchTodos, addTodo, deleteTodo } from './api/services';
import './App.css'
import { useState, useRef, useEffect } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
     fetchTodos().then(response => {
        setTodos(response.data || []);
        console.log(response);
     }).catch(error => {
       console.error('Error fetching todos:', error);
     });
  }, []);

  const handleAddItem = () => {
    const inputValue = inputRef.current ? inputRef.current.value : '';
    addTodo(inputValue).then(response => {
      setTodos([...todos, response.data]);
    });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDelete = (id : string) => {
    deleteTodo(id).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  }

  return (
    <div className='parent'>
      <h1 className='header'>TODO</h1>

      <div className='todo-app'>
        <div className='todo-input'>
          <input
            type="text"
            placeholder="Add a new task..."
            ref={inputRef}
          />
          <button onClick={handleAddItem}>
            Add
          </button>
        </div>

        <div className='todo-list'>
          {todos.map((todo: any) => (
            <div key={todo.id} className='todo-item'>
              <input type="checkbox" readOnly style={{ cursor: 'pointer' }} />
              <span>{todo.title}</span>
              <TrashIcon onClick={() => handleDelete(todo.id)} className="trashIcon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;