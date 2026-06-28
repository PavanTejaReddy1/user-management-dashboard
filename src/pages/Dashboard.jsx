import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/userService";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import FilterModal from "../components/FilterModal";
import Loader from "../components/Loader";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({ firstName: "", lastName: "", email: "", department: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

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

            const expandedUsers = Array.from({ length: 10 }, (_, index) =>
                formattedUsers.map((user) => ({
                    ...user,
                    id: index * formattedUsers.length + user.id,
                }))
            ).flat();

            setUsers(expandedUsers);
        } catch (err) {
            setError("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
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

    const filteredUsers = users.filter((user) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            user.firstName.toLowerCase().includes(search) ||
            user.lastName.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            user.department.toLowerCase().includes(search);

        const matchesFilter =
            user.firstName
                .toLowerCase()
                .includes(filters.firstName.toLowerCase()) &&
            user.lastName
                .toLowerCase()
                .includes(filters.lastName.toLowerCase()) &&
            user.email
                .toLowerCase()
                .includes(filters.email.toLowerCase()) &&
            user.department
                .toLowerCase()
                .includes(filters.department.toLowerCase());

        return matchesSearch && matchesFilter;
    });

    const sortedUsers = [...filteredUsers];

    if (sortBy) {
        const [field, order] = sortBy.split("-");

        sortedUsers.sort((a, b) => {
            const valueA = a[field].toLowerCase();
            const valueB = b[field].toLowerCase();

            if (order === "asc") {
                return valueA.localeCompare(valueB);
            }

            return valueB.localeCompare(valueA);
        });
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 text-red-700 p-6 rounded">
                    {error}
                </div>
            </div>
        );
    }

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

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <div className="flex gap-3">

                    <SortDropdown
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />

                    <button
                        onClick={() => setShowFilter(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded"
                    >
                        Filter
                    </button>

                </div>

            </div>

            <UserTable
                users={paginatedUsers}
                onEdit={setEditingUser}
                onDelete={handleDeleteUser}
            />

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                totalRows={sortedUsers.length}
            />

            {showFilter && (
                <FilterModal
                    filters={filters}
                    setFilters={setFilters}
                    onClose={() => setShowFilter(false)}
                    onReset={() => {
                        setFilters({
                            firstName: "",
                            lastName: "",
                            email: "",
                            department: "",
                        });

                        setShowFilter(false);
                    }}
                />
            )}

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