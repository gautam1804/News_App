import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { loginUser } from '../actions/authActions';
import { useRouter } from 'next/router';
import '../styles/app.module.css';
import "bootstrap/dist/css/bootstrap.min.css";


function HomePage() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      const result = await dispatch(loginUser(email, password));
      if (result.success) {
        // Login successful
        router.push('/user');
      } else {
        console.error("Login failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div>
      {auth && auth.user ? (
        <div>
          
              <div>
                <h2>Register Page</h2>
                <RegisterForm />
              </div>
          </div>
      ) : (
        
        <div >
          <h2>Login Page</h2>
          <LoginForm onLogin={handleLogin} />
        </div>
         
        
      )}
    </div>
  );
}

export default HomePage;
