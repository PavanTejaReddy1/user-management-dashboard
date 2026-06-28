function UserTable({ users, onEdit, onDelete }) {

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left border">ID</th>
                        <th className="px-4 py-3 text-left border">First Name</th>
                        <th className="px-4 py-3 text-left border">Last Name</th>
                        <th className="px-4 py-3 text-left border">Email</th>
                        <th className="px-4 py-3 text-left border">Department</th>
                        <th className="px-4 py-3 text-center border">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => {

                        return (
                            <tr key={user.id} className="hover:bg-gray-50">
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
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer hover:bg-blue-600 transition"
                                        onClick={() => onEdit(user)}>
                                        Edit
                                    </button>

                                    <button className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition"
                                        onClick={() => onDelete(user.id)}>
                                        Delete
                                    </button>
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