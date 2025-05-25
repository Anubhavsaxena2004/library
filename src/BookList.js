import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [issueForm, setIssueForm] = useState({
    user: '',
    book: '',
    issued_date: new Date().toISOString().split('T')[0],
    return_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await api.get(`books/?search=${search}`);
        setBooks(booksResponse.data);

        const usersResponse = await api.get('users/');
        setUsers(usersResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [search, navigate]);

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('issued/', issueForm);
      alert('Book issued successfully!');
      setShowIssueForm(false);
    } catch (error) {
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Book Management</h1>
      
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={book.cover_image} className="card-img-top" alt={book.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}<br />
                  <strong>Pages:</strong> {book.pages}<br />
                  <strong>Language:</strong> {book.language}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedBook(book);
                    setIssueForm({
                      ...issueForm,
                      book: book.id,
                      user: users.length > 0 ? users[0].username : ''
                    });
                    setShowIssueForm(true);
                  }}
                >
                  Issue This Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showIssueForm && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Issue Book: {selectedBook?.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowIssueForm(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleIssueSubmit}>
                  <div className="mb-3">
                    <label className="form-label">User</label>
                    <select
                      className="form-select"
                      value={issueForm.user}
                      onChange={(e) => setIssueForm({ ...issueForm, user: e.target.value })}
                      required
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.username}>
                          {user.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Issue Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={issueForm.issued_date}
                      onChange={(e) => setIssueForm({ ...issueForm, issued_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Return Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={issueForm.return_date}
                      onChange={(e) => setIssueForm({ ...issueForm, return_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowIssueForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Issue Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;