import React from 'react';
import useForm from './useForm';

/**
 * Student Login Form Component
 * Demonstrates the usage of the custom useForm hook for student authentication
 */
const LoginForm = ({ onLoginSuccess }) => {
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const handleLoginSubmit = async (values) => {
    try {
      // Validate fields
      const newErrors = {};
      
      if (!values.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!values.password) {
        newErrors.password = 'Password is required';
      } else if (values.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (Object.keys(newErrors).length > 0) {
        setFieldErrors(newErrors);
        return;
      }

      // Simulate API call
      console.log('Login attempt with:', {
        email: values.email,
        rememberMe: values.rememberMe,
      });

      // Call the callback on success
      if (onLoginSuccess) {
        onLoginSuccess(values.email);
      }

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldErrors,
    resetForm,
  } = useForm(initialValues, handleLoginSubmit);

  return (
    <div className="login-form-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
          />
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={values.rememberMe}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="form-footer">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
