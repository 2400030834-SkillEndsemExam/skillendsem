import { useState, useCallback } from 'react';

/**
 * Custom React Hook for managing form state
 * Handles input field values, validation, and form submission
 * 
 * @param {Object} initialValues - Initial form field values
 * @param {Function} onSubmit - Callback function when form is submitted
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input value changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: fieldValue,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  }, [errors]);

  // Handle field blur event
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Mark all fields as touched
        const allTouched = Object.keys(initialValues).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
        setTouched(allTouched);

        // Call the onSubmit callback
        if (onSubmit) {
          await onSubmit(values);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ submit: error.message });
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, initialValues, onSubmit]
  );

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set form field errors
  const setFieldErrors = useCallback((fieldErrors) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  }, []);

  return {
    values,
    setValues,
    errors,
    setFieldErrors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
