import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import UserTable from "../components/UserTable";

function Dashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">
                User Management Dashboard
            </h1>

            <UserTable users={users} />
        </div>
    );
}

export default Dashboard;