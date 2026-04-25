# Reddit Clone

This project is a web-based Reddit Clone built using React and Vite. It features a responsive user interface with a custom navigation bar, authentication screens (Login/Signup), post creation functionality, and dark/light mode toggling.

## How to Run the Project

You will need two terminals running simultaneously to serve the frontend application and the backend mock data.

### 1. Frontend Development Server

To run the React frontend application, open a terminal in the project directory and execute:

```bash
npm install
npm run dev
```

### 2. Backend Data Setup

To fetch the mock data for the application, you need to run `json-server`. Open a new terminal and run the following command:

```bash
npx json-server -p 3700 data/db.json
```

## Contributors

- Parth Kadukar
- Sushant Gupta
- Himanshu Paramarthi

---

### FontAwesome Setup (Reference)
If you ever need to set up the FontAwesome icons manually, you can use these commands:
```bash
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/react-fontawesome@latest
```
