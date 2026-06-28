# User Management Dashboard

## Overview

This project is a simple User Management Dashboard built with React. It allows users to view, add, edit, delete, search, sort, filter, and paginate user records using the JSONPlaceholder API. Since JSONPlaceholder is a mock API, create, update, and delete operations are simulated while the UI is updated locally to provide a realistic user experience.

## Tech Stack

* React (Vite)
* Axios
* Tailwind CSS
* React Hook Form
* JavaScript (ES6)

## Features

* Display users in a responsive table
* Add a new user
* Edit existing user details
* Delete a user
* Search users by first name, last name, email, or department
* Sort users by different fields
* Filter users using a filter popup
* Client-side pagination with page sizes of 10, 25, 50, and 100
* Form validation
* Loading and error states
* Responsive design

## Project Setup

Clone the repository:

```bash
git clone https://github.com/PavanTejaReddy1/user-management-dashboard.git
```

Move into the project folder:

```bash
cd user-management-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

## API Used

This project uses the JSONPlaceholder Users API.

https://jsonplaceholder.typicode.com/users

## Assumptions

* JSONPlaceholder does not permanently store data, so add, edit, and delete operations are reflected only in the application's local state.
* The API does not provide separate first name, last name, or department fields. First and last names are derived from the `name` field, and departments are assigned locally.
* To demonstrate pagination properly, the fetched user data is duplicated locally because the API returns only 10 users.

## Challenges Faced

The biggest challenge was working with a mock API that doesn't actually save changes. To make the application behave like a real system, I updated the local state after successful API responses. Another challenge was implementing pagination because the API only returns 10 users, so I expanded the dataset locally for demonstration purposes.

## Future Improvements

If I had more time, I would:

* Replace the mock API with a real backend
* Add authentication and user roles
* Implement server-side pagination and filtering
* Add toast notifications for user actions
* Improve unit test coverage
* Add dark mode

## Testing

Run the tests using:

```bash
npm test
```

or

```bash
npx vitest
```
