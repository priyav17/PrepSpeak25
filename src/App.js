// src/App.js

import React from 'react';
import AppRouter from './router'; // Imports your main routing component

function App() {
  return (
    // Render the AppRouter, which will then handle displaying the correct pages
    <AppRouter />
  );
}

export default App;