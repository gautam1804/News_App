import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // State to track login error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onLogin(email, password); // Assuming onLogin is an async function
    if (!result) {
      setLoginError(true);
    }
  };

  return (
    <div className={styles['container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <h7>If you do not have an account, create one:</h7>
        <Link href="/RegisterForm">
          <button>Register</button>
        </Link>
      </form>

      {loginError && <p>User does not exist. Please register.</p>}
    </div>
  );
};

export default LoginForm;
