function SortDropdown({ sortBy, setSortBy }) {
    return (
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-4 py-2"
        >
            <option value="">Sort By</option>

            <option value="firstName-asc">First Name (A-Z)</option>
            <option value="firstName-desc">First Name (Z-A)</option>

            <option value="lastName-asc">Last Name (A-Z)</option>
            <option value="lastName-desc">Last Name (Z-A)</option>

            <option value="email-asc">Email (A-Z)</option>
            <option value="email-desc">Email (Z-A)</option>

            <option value="department-asc">Department (A-Z)</option>
            <option value="department-desc">Department (Z-A)</option>
        </select>
    );
}

export default SortDropdown;