# cesium

# CSV Upload App

A React-based web application that allows users to upload and validate CSV/XLSX files.

Heroku App can be found [here](https://cesium-e4a0ddb4f2e2.herokuapp.com/home) --> `https://cesium-e4a0ddb4f2e2.herokuapp.com/home`

## Features

- User authentication (signup, login, logout)
- Protected routes for authenticated users
- File upload (CSV/XLSX) with size and type validation
- Date range selection for uploaded files
- View of uploaded records with sorting and pagination

## Getting Started

Installation

1. Clone the repository:

```bash
git clone https://github.com/jkanyua/cesium.git
```

2. Navigate to the project directory

```bash
cd cesium
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

## Design Decisions

1. Authentication: `axios-mock-adapter` is used to simulate endpoint calls with credentials stored in local storage for later retrieval

2. Protected Routes: React Router's loader functionality is used to protect routes that require authentication. If a user tries to access a protected route without being authenticated, they are redirected to the login page.

3. State Management: A mix of Reacts state management hooks and Context API for global state management. This decision was made to avoid introducing a heavier state management library.

4. Routing: `react-router-dom`.

5. File Upload: Used a combination of the HTML5 File API and Zod for file validation

6. Pagination and Sorting: A client-side pagination and sorting solution is implemented for this app. This decision was made to simplify implementation. A backend solution would be more ideal imo.

7. Styling: Tailwind CSS for styling. This utility-first CSS framework allows for rapid UI development and easy customization.

8. This project uses vite. It is a fast and lightweight build tool and development server.

9. Testing: vitest, a unit testing framework built for Vite. Offers fast test execution and a jest-like API

## Usage Instructions

### Authentication

#### Signup:

- Navigate to the Signup page.
- Enter your desired first name, last name, phone email and password.
- Click the "Sign Up" button.
- Upon successful signup, you will be redirected to the login page.

#### Login:

- Enter your email and password entered in signup
- Click the "Log In" button.
- Upon successful login, you will be redirected to the home page.
- The top-bar navigation will now have nav buttons to direct you to other pages

#### Logout:

- Click the "Logout" button in the navigation bar.
- You will be logged out and redirected to the login page.

## File Management

### Upload a File:

- Navigate to the Upload page (requires authentication).
- Select a CSV or XLSX file using the file input.
- Choose a start date and end date for the file.
- Select the date type .
- Click the "Upload" button.

### View Uploaded Records:

- Navigate to the Details page (requires authentication).
- You'll see a table of all uploaded records.
- Use the pagination controls at the bottom of the table to navigate between pages.
- Click on column headers to sort the records.

#### Change Records Per Page:

On the Details page, use the dropdown menu to select how many records you want to see per page.
