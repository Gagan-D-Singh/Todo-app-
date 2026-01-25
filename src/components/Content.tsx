import { deleteTodo, editTodo } from '../api/services';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface contentProps {
    todos: any[];
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
}
const Content = ({ todos, setTodos, setIsEditing, isEditing }: contentProps) => {
    const handleDelete = (id : string) => {
        deleteTodo(id).then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        });
    }

    const handleEdit = (id: string, newTitle: string) => {
        // Edit functionality to be implemented
        setIsEditing(!isEditing);
        editTodo(id, newTitle).then(response => {
        const updatedTodos = todos.map(todo => 
            todo.id === id ? response.data : todo
        );
        setTodos(updatedTodos);
        });
    }
  return (
    <div className='todo-list'>
        {todos.map((todo: any) => (
        <div key={todo.id} className='todo-item'>
            <input className="todo-checkbox" type="checkbox" readOnly style={{ cursor: 'pointer' }} />
            {isEditing ? (
            <input
                type="text"
                defaultValue={todo.title}
                className='editInput'
                onBlur={(e) => {
                handleEdit(todo.id, e.target.value);
                setIsEditing(false);
                }}
                // autoFocus
            />
            ) : (
            <span>{todo.title}</span>
            )}
            <TrashIcon onClick={() => handleDelete(todo.id)} className="trashIcon" />
            <PencilIcon onClick={() => handleEdit(todo.id, todo.title)} className="pencilIcon" />
        </div>
        ))}
    </div>
  )
}

export default Content
