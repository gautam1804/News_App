import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "../services/firebase"; // Import your Firebase authentication instance
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword function
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import LoginForm from "./LoginForm";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use createUserWithEmailAndPassword function here
      await createUserWithEmailAndPassword(auth, email, password);
      // Registration successful
      console.log("Registration successful");
      
    } catch (error) {
      setError(error.message);
    }
  };
  const router = useRouter();
  return (
    <div className={styles['container']}>

    <Form className={styles['login-form']} onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={() => router.push('/LoginForm')}>
        Register
      </Button>
     

      {error && <p className="text-danger">{error}</p>}
    </Form>
    </div>
  );
};

export default RegisterForm;
