import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState ({
    username: '',
    email : '',
    password : '',
  });

  const [message, setMessage]= useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post('http://localhost:5001/api/auth/register', formData); 
    setMessage('Registrasi berhasil! Silakan berhasil.');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
    
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="massage">{message}</p>}
      <p>
        Sudah punya akun? <Link to = "/login">Login di sini</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
