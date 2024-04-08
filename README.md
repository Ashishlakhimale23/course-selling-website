# Personalized Course Selling Website

## Description
This project is a personalized course selling website where only the admin can upload courses. To define an admin, the email and password of the admin must be  added to the project. The project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Tailwind CSS for styling, Joi for user validation, Cloudinary for storing images and videos uploaded by the admin, and JWT (JSON Web Tokens) for authentication.

## Features
- Admin can log in using email and password.
- Admin can upload courses with details such as course name, description , syllabus , price, and media files (images, videos).
- User authentication using JWT.
- User-friendly interface with responsive design.
- Courses displayed with images and brief descriptions.
- User can view course details and enroll in courses.

## Technologies Used
- MERN Stack (MongoDB, Express.js, React.js, Node.js)
- Tailwind CSS
- Joi (for user validation)
- Cloudinary (for storing images and videos)
- JWT (JSON Web Tokens) for authentication

## Installation
1. Clone the repository: `git clone https://github.com/Ashishlakhimale23/course-selling-website.git`
2. Install dependencies: `npm install`
3. Set up environment variables (admin's email and password, Cloudinary configuration, JWT secret key).
4. Run the server: `npm start`
5. Start the frontend: `npm run dev`
6. Open the website in your browser: `http://localhost:5173`

## Usage
- Navigate to the website and log in as an admin using your email and password.
- Upload courses with details and media files.
- View courses and enroll as a user.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
