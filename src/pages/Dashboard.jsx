import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/userService";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();

            const formattedUsers = data.map((user, index) => {
                const [firstName, ...lastName] = user.name.split(" ");

                const departments = [
                    "IT",
                    "HR",
                    "Finance",
                    "Marketing",
                    "Sales",
                ];

                return {
                    id: user.id,
                    firstName,
                    lastName: lastName.join(" "),
                    email: user.email,
                    department: departments[index % departments.length],
                };
            });

            setUsers(formattedUsers);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddUser = async (user) => {
        try {
            const newUser = await addUser(user);

            setUsers((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    department: user.department,
                },
            ]);

            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await updateUser(editingUser.id, updatedUser);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editingUser.id
                        ? {
                            ...user,
                            firstName: updatedUser.firstName,
                            lastName: updatedUser.lastName,
                            email: updatedUser.email,
                            department: updatedUser.department,
                        }
                        : user
                )
            );

            setEditingUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        try {
            await deleteUser(id);

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">
                User Management Dashboard
            </h1>

            <div className="flex justify-end mb-4">
                <button onClick={() => { setShowForm(true); setEditingUser(null); }} className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition">
                    Add User
                </button>
            </div>

            <UserTable
                users={users}
                onEdit={setEditingUser}
                onDelete={handleDeleteUser}
            />

            {showForm && (
                <UserForm
                    onSubmit={handleAddUser}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingUser && (
                <UserForm
                    initialData={editingUser}
                    onSubmit={handleUpdateUser}
                    onCancel={() => setEditingUser(null)}
                />
            )}
        </div>
    );
}

export default Dashboard;