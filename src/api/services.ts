import api from './api';

export const fetchTodos = async () => {
    const response = await api.get(`todos`);
    return response;
};

export const addTodo = async (title: string, id: string) => {
    const response = await api.post('todos', { title, completed: false, id: id });
    return response;
}

export const deleteTodo = async (id: string) => {
    const response = await api.delete(`todos/${id}`);
    return response;
} 

export const editTodo = async (id: string, title: string) => {
    const response = await api.put(`todos/${id}`, { title });
    return response;
}