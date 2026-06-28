function Pagination({
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalRows,
}) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <div>
                <label className="mr-2 font-medium">Rows per page:</label>

                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="border rounded px-3 py-2"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div className="flex items-center gap-3">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300 transition"
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages || 1}
                </span>

                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination;