function UserTable({ users }) {
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
                        const [firstName, ...lastName] = user.name.split(" ");

                        return (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 border">{user.id}</td>

                                <td className="px-4 py-3 border">{firstName}</td>

                                <td className="px-4 py-3 border">
                                    {lastName.join(" ")}
                                </td>

                                <td className="px-4 py-3 border">{user.email}</td>

                                <td className="px-4 py-3 border">
                                    {user.department || "IT"}
                                </td>

                                <td className="px-4 py-3 border text-center">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                                        Edit
                                    </button>

                                    <button className="bg-red-500 text-white px-3 py-1 rounded">
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