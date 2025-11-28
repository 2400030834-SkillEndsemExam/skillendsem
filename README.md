# Reusable Form Handling Hook - useForm

## Overview

This project demonstrates a custom React hook `useForm` designed to manage form state and validation across multiple form components. The hook is reusable and can be applied to any form component with minimal configuration.

## Project Structure

```
skillendsem/
├── useForm.js              # Custom React hook for form management
├── LoginForm.jsx           # Student login form component
├── RegistrationForm.jsx    # Student registration form component
├── App.jsx                 # Main application component with documentation
└── README.md               # This file
```

## Features

### useForm Hook
- **Automatic Field Value Management**: Tracks and updates form field values automatically
- **Field-Level Error Tracking**: Maintains error state for each field
- **Touched State Management**: Tracks which fields have been interacted with
- **Form Submission Handling**: Supports async submission callbacks
- **Automatic Error Clearing**: Clears errors when user starts typing
- **Form Reset Functionality**: Resets form to initial state
- **Multi-Input Type Support**: Works with text inputs, checkboxes, and more

### Component Examples

#### 1. LoginForm Component
A simple login form demonstrating basic useForm usage:
- Email validation (format check)
- Password validation (minimum 6 characters)
- Remember me checkbox
- Real-time error feedback

#### 2. RegistrationForm Component
A complex form demonstrating advanced useForm capabilities:
- Multiple text fields (firstName, lastName, email, studentId)
- Password and password confirmation fields
- Terms and conditions checkbox
- Comprehensive validation
- Field-level error messages

## Hook API

### Usage

```javascript
import useForm from './useForm';

const MyForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    // Handle form submission
    console.log('Form submitted:', values);
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
  } = useForm(initialValues, handleSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email && <span>{errors.email}</span>}
    </form>
  );
};
```

### Parameters

- **initialValues** (Object): Initial form field values
- **onSubmit** (Function): Async callback function for form submission

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| values | Object | Current form field values |
| setValues | Function | Update form values |
| errors | Object | Field error messages |
| setFieldErrors | Function | Set field-level errors |
| touched | Object | Tracks which fields have been touched |
| isSubmitting | Boolean | Form submission state |
| handleChange | Function | Input onChange handler |
| handleBlur | Function | Input onBlur handler |
| handleSubmit | Function | Form onSubmit handler |
| resetForm | Function | Reset form to initial state |

## Validation Examples

### LoginForm Validation
```javascript
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
```

### RegistrationForm Validation
```javascript
// Email validation
if (!values.email) {
  newErrors.email = 'Email is required';
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
  newErrors.email = 'Please enter a valid email';
}

// Password matching
if (values.password !== values.confirmPassword) {
  newErrors.confirmPassword = 'Passwords do not match';
}

// Password strength
if (values.password.length < 8) {
  newErrors.password = 'Password must be at least 8 characters';
}

// Terms acceptance
if (!values.agreeToTerms) {
  newErrors.agreeToTerms = 'You must agree to the terms';
}
```

## Reusability Benefits

### 1. DRY Principle
Write form logic once and reuse it across multiple forms without duplication.

### 2. Consistency
All forms behave the same way, providing a consistent user experience.

### 3. Maintainability
Update form behavior in one place, and all forms benefit from the changes.

### 4. Scalability
Easily add new forms without worrying about form state management.

### 5. Testability
Centralized hook logic is easier to unit test independently.

## Component Integration

### Using in App Component

```javascript
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

function App() {
  const handleLoginSuccess = (email) => {
    console.log(`User logged in: ${email}`);
  };

  const handleRegistrationSuccess = (email) => {
    console.log(`User registered: ${email}`);
  };

  return (
    <>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
    </>
  );
}
```

## File Descriptions

### useForm.js
The core custom hook that manages all form-related state and handlers. This file exports the useForm hook which can be imported into any component that needs form management.

### LoginForm.jsx
A React component demonstrating useForm usage for a student login form. Features:
- Email and password fields
- Remember me checkbox
- Inline validation
- Success callback

### RegistrationForm.jsx
A React component showing useForm usage for a student registration form. Features:
- Multiple input fields
- Password confirmation
- Complex validation logic
- Terms acceptance checkbox

### App.jsx
The main application component that demonstrates:
- Using both LoginForm and RegistrationForm
- Routing between forms
- User state management
- Comprehensive documentation page

## Getting Started

1. **Import the hook**
   ```javascript
   import useForm from './useForm';
   ```

2. **Define initial values**
   ```javascript
   const initialValues = {
     field1: '',
     field2: '',
   };
   ```

3. **Create submit handler**
   ```javascript
   const handleSubmit = async (values) => {
     // Validate and process form data
   };
   ```

4. **Use the hook**
   ```javascript
   const {
     values,
     errors,
     touched,
     handleChange,
     handleBlur,
     handleSubmit,
     setFieldErrors,
   } = useForm(initialValues, handleSubmit);
   ```

5. **Render form with handlers**
   ```javascript
   <input
     name="email"
     value={values.email}
     onChange={handleChange}
     onBlur={handleBlur}
   />
   ```

## Error Handling

The hook provides multiple ways to handle errors:

1. **Automatic Validation**: Return errors from the onSubmit callback
2. **Manual Error Setting**: Use setFieldErrors() to set errors programmatically
3. **Conditional Display**: Show errors only for touched fields
4. **Error Clearing**: Errors are automatically cleared when the user starts typing

## Advanced Features

### Async Submission
The hook supports async form submission:
```javascript
const handleSubmit = async (values) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
  // Handle response
};
```

### Dynamic Field Management
Add or remove fields dynamically using setValues:
```javascript
const handleAddField = () => {
  setValues(prev => ({
    ...prev,
    newField: '',
  }));
};
```

### Form Reset
Reset the form to initial state:
```javascript
<button onClick={resetForm}>Reset Form</button>
```

## Best Practices

1. **Validate on Submit**: Perform comprehensive validation in the onSubmit callback
2. **Show Errors for Touched Fields**: Only display error messages for fields the user has interacted with
3. **Provide Clear Error Messages**: Use specific, actionable error messages
4. **Handle Async Operations**: Use isSubmitting state to disable submit button during submission
5. **Clear Errors on Input**: Let the hook automatically clear errors as users type

## Performance Considerations

- The hook uses useCallback to memoize event handlers
- Field-level error clearing prevents unnecessary re-renders
- Values are updated efficiently using functional state updates

## License

This project is part of a skill assessment exam and is provided as-is.

## Author

Created as a demonstration of React custom hooks and form handling patterns for educational purposes.
