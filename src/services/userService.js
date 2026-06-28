import api from "../api/axios";

export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const addUser = async (user) => {
    const response = await api.post("/users", user);
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
};