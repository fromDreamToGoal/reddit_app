# Reddit na minimalkakh

Reddit na minimalkakh is a web application that allows users to explore subreddits, view posts and their comments, easily switch between topics, and perform searches. Built with **React**, **Redux**, and the **Reddit API**, the app is optimized for both mobile and desktop devices.

## Key Features

+ **View Posts**: Browse top posts from various subreddits.
+ **Comments**: Load and view comments for each post.
+ **Search**: Dynamic search that updates content based on the query.

### Technologies

+ **React**: Provides the framework for building the user interface.
+ **Redux**: Manages application state and facilitates data flow between components.
+ **Redux Thunk**: Handles asynchronous API requests.
+ **React Testing Library & Jest**: Used for unit testing to validate core functionality.
+ **Reddit API**: Supplies data on posts, comments, and subreddits.

## Installation and Setup

1. **Clone the Repository**

    1. [https://github.com/fromDreamToGoal/reddit_app.git](https://github.com/fromDreamToGoal/reddit_app.git)

    1. `cd reddit_app`

2. **Install Dependencies**

    #### `npm install`

3. **Start the App in Development Mode**

    #### `npm start`

4. **Build for Production**

    #### `npm run build`

## **Testing**

### Run All Tests
    npm test

### Run Tests with Coverage Report

    To run tests with a coverage report:

    npm test -- --coverage

## Project Structure 

        src
    ├── components
    │   ├── Header.jsx       # Header with search
    │   ├── Main.jsx         # Main section displaying posts
    │   ├── Subreddits.jsx   # Subreddits list
    │   └── Card.jsx         # Card for displaying post details
    ├── features
    │   ├── redditSlice.js   # Reducer for handling Reddit API data
    │   ├── subRedditSlice.js# Reducer for subreddits
    ├── store
    │   └── index.js         # Redux store configuration
    └── utils
        └── reddit.js        # Utility functions for Reddit API interactions

## Development Highlights

1.	**API**: Data is fetched from the Reddit API to display current posts and comments. This included addressing CORS issues and creating an error-handling component for retrying requests.

2.	**Component Structure**: Components are organized by function and purpose in the interface. The Card component displays basic post information, while Main acts as a container for displaying the current posts.

3.	**Animations**: Smooth transitions are added to show and hide subreddits, along with a fog overlay effect that activates when the subreddit menu is rendered.

4.	**Testing**: Tests cover each primary component, including visibility toggling for subreddits and interaction functions such as toggleSubreddits and handleSubredditSelection.

## **Author**
    Serhii Holovenko