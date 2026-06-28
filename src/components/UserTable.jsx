function UserTable({ users, onEdit, onDelete }) {

    if (users.length === 0) {
        return (
            <div className="bg-white p-10 rounded shadow text-center">
                <h2 className="text-xl font-semibold">
                    No users found
                </h2>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse min-w-full">
                <thead className="bg-gray-100">
                    <tr className="text-center">
                        <th className="px-4 py-3 border">ID</th>
                        <th className="px-4 py-3 border">First Name</th>
                        <th className="px-4 py-3 border">Last Name</th>
                        <th className="px-4 py-3 border">Email</th>
                        <th className="px-4 py-3 border">Department</th>
                        <th className="px-4 py-3 border">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => {

                        return (
                            <tr key={user.id} className="hover:bg-gray-50 text-center">
                                <td className="px-4 py-3 border">{user.id}</td>

                                <td className="px-4 py-3 border">{user.firstName}</td>

                                <td className="px-4 py-3 border">
                                    {user.lastName}
                                </td>

                                <td className="px-4 py-3 border">{user.email}</td>

                                <td className="px-4 py-3 border">
                                    {user.department}
                                </td>

                                <td className="px-4 py-3 border text-center">

                                    <div className="flex gap-2 justify-center flex-wrap">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer hover:bg-blue-600 transition"
                                            onClick={() => onEdit(user)}>
                                            Edit
                                        </button>

                                        <button className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition"
                                            onClick={() => onDelete(user.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;