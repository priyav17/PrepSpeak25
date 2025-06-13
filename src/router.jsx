// src/router.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Imports routing components from react-router-dom

// Import your NEW Material-UI styled Register component
// IMPORTANT: The path here (./components/Register) assumes Register.jsx is directly inside src/components
import Register from './components/Register';

// If you have other pages like LoginPage or PromptPage, keep their imports.
// Example:
import LoginPage from './pages/LoginPage';
import PromptPage from './pages/PromptPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the default path (e.g., http://localhost:3000/) will show the styled Register component */}
        <Route path="/" element={<Register />} />

        {/* Route for the /register path (e.g., http://localhost:3000/register) will also show the styled Register component */}
        <Route path="/register" element={<Register />} />

        {/* Keep your other existing routes here */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        {/* Add more routes for your other features/pages as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;