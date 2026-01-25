import { fetchTodos } from './api/services';
import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/Header';
import AddItem from './components/AddItem';
import Content from './components/Content';
import Footer from './components/Footer';
import SearchTodo from './components/SearchTodo';

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
     const fetchTodosData = async () => {
       try {
          const response = await fetchTodos();
          if(!response || !response.data) {
            throw new Error('No data received');
          }
          setTodos(response.data || []);
          setFetchError(null);
       }
       catch (error) {
         console.error('Error fetching todos:', error);
         setFetchError('Failed to fetch todos');
       }
       finally {
         setIsLoading(false);
       }
     }
      setTimeout(() => fetchTodosData(), 2000);
  }, []);

  

  return (
    <div className='parent'>
      <Header title={"Practice Questions List"}/>

      <div className='todo-app'>
        <AddItem todos={todos} setTodos={setTodos} />
        <SearchTodo search={search} setSearch={setSearch} />

        {isLoading && <p>Loading todos...</p>}
        {!isLoading && !fetchError && <Content todos={todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))} setTodos={setTodos} isEditing={isEditing} setIsEditing={setIsEditing} />}
        {!isLoading && fetchError && <p>{fetchError}</p>}
      </div>
      <Footer length={todos.length} />
    </div>
  );
}

export default App;