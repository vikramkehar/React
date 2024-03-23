// App.js
import React from 'react';
import Table from './Table';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
const App = () => {
    return (
      <Router>
      <div className="container">
          <Routes>
              <Route path="/" element={<Table />} />
              <Route path="/add-user" element={<AddUserModal />} />
              <Route path="/edit-user/:id" element={<EditUserModal />} />
          </Routes>
      </div>
  </Router>

    );
}

export default App;
