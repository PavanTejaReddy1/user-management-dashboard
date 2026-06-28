import { render, screen } from "@testing-library/react";
import UserTable from "../components/UserTable";

const users = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        department: "IT",
    },
];

test("renders user data", () => {
    render(
        <UserTable
            users={users}
            onEdit={() => { }}
            onDelete={() => { }}
        />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
});