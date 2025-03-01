import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import HistoryPage from './pages/HistoryPage';
import LoadBalancePage from './pages/LoadBalancePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/load-balance" element={<LoadBalancePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;