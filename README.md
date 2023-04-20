# Exercise Tracker

This project is a part of FreeCodeCamp's Back End Development and APIs certification. It is a simple web application that allows users to create an account, add exercises, and track their exercise progress.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## How to Run Locally

1. Clone the repository to your local machine using the following command:
`git clone https://github.com/kanishk44/fcc-exercise-tracker.git`

2. Navigate into the project directory:
`cd fcc-exercise-tracker`

3. Install the dependencies:
`npm install`

4. Create a `.env` file in the root directory and add the following:
`MONGO_URI=your-mongodb-uri`

5. Start the server:
`npm start`

6. Open `http://localhost:3000` in your browser to view the application.

## Usage

1. Create an account by entering your details and clicking "Create User".
2. You can add exercises by entering the details of your exercise and clicking on the "Add Exercise".
3. You can view your exercise history on `your-app-url/api/users/:_id/logs`.
4. You can also filter your exercise history by providing a date range in the url parameters.

<!--## Live Demo

A live demo of the application is available [here](https://exercise-tracker-fcc-username.herokuapp.com). -->

<!-- ## Screenshots

![Login Page](./screenshots/login-page.png)

![Add Exercise Page](./screenshots/add-exercise-page.png)

![My Exercises Page](./screenshots/my-exercises-page.png) -->

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.



