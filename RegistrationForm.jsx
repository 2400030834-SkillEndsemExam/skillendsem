import React from 'react';
import useForm from './useForm';

/**
 * Student Registration Form Component
 * Demonstrates the usage of the custom useForm hook for student registration
 */
const RegistrationForm = ({ onRegistrationSuccess }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    agreeToTerms: false,
  };

  const handleRegistrationSubmit = async (values) => {
    try {
      // Validate all fields
      const newErrors = {};

      if (!values.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }

      if (!values.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }

      if (!values.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (!values.password) {
        newErrors.password = 'Password is required';
      } else if (values.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (values.password !== values.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!values.studentId.trim()) {
        newErrors.studentId = 'Student ID is required';
      }

      if (!values.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }

      if (Object.keys(newErrors).length > 0) {
        setFieldErrors(newErrors);
        return;
      }

      // Simulate API call for registration
      console.log('Registration attempt with:', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        studentId: values.studentId,
      });

      // Call the callback on success
      if (onRegistrationSuccess) {
        onRegistrationSuccess(values.email);
      }

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Registration error:', error);
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
  } = useForm(initialValues, handleRegistrationSubmit);

  return (
    <div className="registration-form-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your first name"
              className={`form-input ${touched.firstName && errors.firstName ? 'input-error' : ''}`}
            />
            {touched.firstName && errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your last name"
              className={`form-input ${touched.lastName && errors.lastName ? 'input-error' : ''}`}
            />
            {touched.lastName && errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
        </div>

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
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={values.studentId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your student ID"
            className={`form-input ${touched.studentId && errors.studentId ? 'input-error' : ''}`}
          />
          {touched.studentId && errors.studentId && (
            <span className="error-message">{errors.studentId}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter a password"
              className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
            />
            {touched.password && errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm your password"
              className={`form-input ${touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}`}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={values.agreeToTerms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="agreeToTerms">
            I agree to the terms and conditions
          </label>
          {touched.agreeToTerms && errors.agreeToTerms && (
            <span className="error-message">{errors.agreeToTerms}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        <p className="form-footer">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
