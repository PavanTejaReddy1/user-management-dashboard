import { useForm } from "react-hook-form";

function UserForm({ onSubmit, initialData = {}, onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialData,
    });

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                    {initialData.id ? "Edit User" : "Add User"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full border p-2 rounded"
                            {...register("firstName", {
                                required: "First name is required",
                            })}
                        />

                        {errors.firstName && (
                            <p className="text-red-500 text-sm">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full border p-2 rounded"
                            {...register("lastName", {
                                required: "Last name is required",
                            })}
                        />

                        {errors.lastName && (
                            <p className="text-red-500 text-sm">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 rounded"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <select
                            className="w-full border p-2 rounded"
                            {...register("department", {
                                required: "Department is required",
                            })}
                        >
                            <option value="">Select Department</option>
                            <option>IT</option>
                            <option>HR</option>
                            <option>Finance</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                        </select>

                        {errors.department && (
                            <p className="text-red-500 text-sm">
                                {errors.department.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">

                        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-300 cursor-pointer hover:bg-gray-400 transition">
                            Cancel
                        </button>

                        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition">
                            Save
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default UserForm;