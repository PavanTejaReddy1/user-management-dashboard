function FilterModal({
    filters,
    setFilters,
    onClose,
    onReset,
}) {
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-4">
                    Filter Users
                </h2>

                <div className="space-y-4">

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={filters.firstName}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={filters.lastName}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />

                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={filters.email}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />

                    <select
                        name="department"
                        value={filters.department}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">All Departments</option>
                        <option>IT</option>
                        <option>HR</option>
                        <option>Finance</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                    </select>

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onReset}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Reset
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Apply
                    </button>

                </div>

            </div>
        </div>
    );
}

export default FilterModal;