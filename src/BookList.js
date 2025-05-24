import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList() {
  // Existing states for book list and search
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  
  // New states for issuing books
  const [users, setUsers] = useState([]);
  const [issueForm, setIssueForm] = useState({
    user: '',
    book: '',
    issued_date: '',
    return_date: ''
  });
  const [showIssueForm, setShowIssueForm] = useState(false);

  // Fetch books and users on component mount
  useEffect(() => {
    // Fetch books
    fetch(`http://127.0.0.1:8000/api/books/?search=${search}`)
      .then(res => res.json())
      .then(data => setBooks(data.results));
    
    // Fetch users (for dropdown)
    fetch('http://127.0.0.1:8000/api/users/')
      .then(res => res.json())
      .then(data => setUsers(data.results || data));
  }, [search]);

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/issued/', issueForm);
      alert("Book issued successfully!");
      setShowIssueForm(false);
    } catch (error) {
      alert(`Error: ${error.response?.data?.details || error.message}`);
    }
  };

  return (
    <div>
      <h1>Book Management</h1>
      
      {/* Existing Search Functionality */}
      <input 
        placeholder="Search books..." 
        onChange={e => setSearch(e.target.value)} 
      />
      
      {/* Book List */}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => {
              setIssueForm({...issueForm, book: book.id});
              setShowIssueForm(true);
            }}>
              Issue This Book
            </button>
          </li>
        ))}
      </ul>

      {/* Issue Book Form (Conditional Rendering) */}
      {showIssueForm && (
        <div className="issue-form">
          <h2>Issue Book</h2>
          <form onSubmit={handleIssueSubmit}>
            <div>
              <label>Select User:</label>
              <select
                value={issueForm.user}
                onChange={(e) => setIssueForm({...issueForm, user: e.target.value})}
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Book:</label>
              <input 
                type="text" 
                value={books.find(b => b.id === issueForm.book)?.title || ''}
                readOnly
              />
              <input type="hidden" value={issueForm.book} />
            </div>

            <div>
              <label>Issue Date:</label>
              <input
                type="date"
                onChange={(e) => setIssueForm({...issueForm, issued_date: e.target.value})}
                required
              />
            </div>

            <div>
              <label>Return Date:</label>
              <input
                type="date"
                onChange={(e) => setIssueForm({...issueForm, return_date: e.target.value})}
                required
              />
            </div>

            <button type="submit">Confirm Issue</button>
            <button type="button" onClick={() => setShowIssueForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookList;