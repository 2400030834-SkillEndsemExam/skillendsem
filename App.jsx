import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import './App.css';

/**
 * Main App Component - Demonstrates reusable useForm hook
 * 
 * This component showcases the usage of the custom useForm hook in two different forms:
 * 1. StudentLoginForm - For student authentication
 * 2. StudentRegistrationForm - For student sign-up
 * 
 * Both forms utilize the same custom hook but with different field configurations
 * and validation logic, demonstrating the reusability and flexibility of the hook.
 */
const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Handle successful login
  const handleLoginSuccess = (email) => {
    setLoggedInUser(email);
    alert(`Welcome back, ${email}!`);
    console.log(`User logged in: ${email}`);
  };

  // Handle successful registration
  const handleRegistrationSuccess = (email) => {
    setRegisteredUsers([...registeredUsers, email]);
    alert(`Registration successful! Welcome, ${email}!`);
    console.log(`New user registered: ${email}`);
    // Automatically redirect to login page after registration
    setTimeout(() => setCurrentPage('login'), 2000);
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Portal</h1>
        <p>Demonstrating Reusable Form Handling with useForm Hook</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-button ${currentPage === 'login' ? 'active' : ''}`}
          onClick={() => setCurrentPage('login')}
        >
          Login
        </button>
        <button
          className={`nav-button ${currentPage === 'register' ? 'active' : ''}`}
          onClick={() => setCurrentPage('register')}
        >
          Register
        </button>
        <button
          className={`nav-button ${currentPage === 'info' ? 'active' : ''}`}
          onClick={() => setCurrentPage('info')}
        >
          Info
        </button>
        {loggedInUser && (
          <button className="nav-button logout-button" onClick={handleLogout}>
            Logout ({loggedInUser})
          </button>
        )}
      </nav>

      <main className="app-main">
        {currentPage === 'login' && (
          <section className="page-section">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </section>
        )}

        {currentPage === 'register' && (
          <section className="page-section">
            <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
          </section>
        )}

        {currentPage === 'info' && (
          <section className="page-section info-section">
            <div className="info-card">
              <h2>Custom useForm Hook Documentation</h2>
              
              <h3>Overview</h3>
              <p>
                The useForm hook is a custom React hook designed to simplify form management
                across different components. It handles input state, validation, touched state,
                and form submission with minimal boilerplate code.
              </p>

              <h3>Features</h3>
              <ul>
                <li>Automatic field value management</li>
                <li>Field-level error tracking and display</li>
                <li>Touched state management for validation UI</li>
                <li>Form submission handling with async support</li>
                <li>Automatic error clearing on input changes</li>
                <li>Form reset functionality</li>
                <li>Support for text inputs, checkboxes, and other input types</li>
              </ul>

              <h3>Hook API</h3>
              <div className="api-table">
                <h4>useForm(initialValues, onSubmit)</h4>
                <p><strong>Parameters:</strong></p>
                <ul>
                  <li><code>initialValues</code> - Object containing initial form field values</li>
                  <li><code>onSubmit</code> - Async callback function for form submission</li>
                </ul>
                
                <p><strong>Returns:</strong></p>
                <ul>
                  <li><code>values</code> - Current form field values</li>
                  <li><code>setValues</code> - Function to update form values</li>
                  <li><code>errors</code> - Object containing field errors</li>
                  <li><code>setFieldErrors</code> - Function to set field-level errors</li>
                  <li><code>touched</code> - Object tracking which fields have been touched</li>
                  <li><code>isSubmitting</code> - Boolean indicating submission state</li>
                  <li><code>handleChange</code> - Input onChange handler</li>
                  <li><code>handleBlur</code> - Input onBlur handler</li>
                  <li><code>handleSubmit</code> - Form onSubmit handler</li>
                  <li><code>resetForm</code> - Function to reset form to initial state</li>
                </ul>
              </div>

              <h3>Usage Examples</h3>
              
              <h4>1. LoginForm Component</h4>
              <p>Demonstrates a simple login form with email and password fields:</p>
              <ul>
                <li>2 input fields (email, password)</li>
                <li>1 checkbox (remember me)</li>
                <li>Email validation (format check)</li>
                <li>Password validation (minimum length)</li>
              </ul>

              <h4>2. RegistrationForm Component</h4>
              <p>Demonstrates a complex registration form with multiple field types:</p>
              <ul>
                <li>Multiple text inputs (firstName, lastName, studentId)</li>
                <li>Email validation</li>
                <li>Password matching validation</li>
                <li>Checkbox for terms acceptance</li>
                <li>Comprehensive error handling</li>
              </ul>

              <h3>Key Benefits of Reusability</h3>
              <ul>
                <li><strong>DRY Principle:</strong> Write form logic once, use it everywhere</li>
                <li><strong>Consistency:</strong> All forms behave the same way</li>
                <li><strong>Maintainability:</strong> Updates to form logic apply to all forms</li>
                <li><strong>Scalability:</strong> Easy to add new forms without duplication</li>
                <li><strong>Testability:</strong> Centralized logic is easier to test</li>
              </ul>

              <h3>Registered Users</h3>
              {registeredUsers.length > 0 ? (
                <ul className="user-list">
                  {registeredUsers.map((email, index) => (
                    <li key={index}>{email}</li>
                  ))}
                </ul>
              ) : (
                <p>No registered users yet.</p>
              )}
            </div>
          </section>
        )}

        {loggedInUser && currentPage === 'login' && (
          <section className="page-section">
            <div className="success-card">
              <h2>Welcome, {loggedInUser}!</h2>
              <p>You have been successfully logged in.</p>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>
          This application demonstrates the reusability of custom React hooks.
          The useForm hook is used in both the login and registration forms with different configurations.
        </p>
      </footer>
    </div>
  );
};

export default App;
