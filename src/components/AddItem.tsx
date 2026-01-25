import { useRef } from "react";
import { addTodo } from "../api/services";
import { PlusIcon } from "@heroicons/react/24/outline";

interface AddItemProps {
    todos: any[];
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddItem = ({ setTodos, todos }: AddItemProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddItem = () => {
        const inputValue = inputRef.current ? inputRef.current.value : '';
        const id = todos.length > 0 ? String(Number(todos[todos.length - 1].id) + 1) : '1';
        addTodo(inputValue, id).then(response => {
          setTodos([...todos, response.data]);
        });
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddItem();
      }
      
  return (
    <form className='todo-input' onSubmit={handleSubmit}>
        <input
        autoFocus
        type="text"
        placeholder="Add a new task..."
        ref={inputRef}
        required
        />
        <button type="submit" onClick={() => inputRef.current?.focus()}>
        <PlusIcon className="plusIcon" />
        </button>
    </form>
  )
}

export default AddItem
