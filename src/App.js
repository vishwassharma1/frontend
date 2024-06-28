// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Blog from './components/Blog';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/" element={<Auth />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
