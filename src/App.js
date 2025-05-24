import React from 'react';
import BookList from './BookList';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <h1>Library System</h1>
      <Login />
      <BookList />
    </div>
  );
}

export default App;