import api from './api';

export const fetchTodos = async () => {
    const response = await api.get(`todos`);
    return response;
};

export const addTodo = async (title: string) => {
    const response = await api.post('todos', { title, completed: false });
    return response;
}

export const deleteTodo = async (id: string) => {
    const response = await api.delete(`todos/${id}`);
    return response;
} 