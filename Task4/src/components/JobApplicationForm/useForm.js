import { useState, useCallback } from 'react';
import { validateForm, validateName, validateEmail, validatePhone, validateMessage } from './validation';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

/**
 * Custom React hook to manage form states, interaction (touch), validation, and submission.
 * @param {Function} onSubmitSuccess - Callback triggered upon a successful form submission.
 */
export const useForm = (onSubmitSuccess) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Individual field validation selector
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'message':
        return validateMessage(value);
      default:
        return '';
    }
  }, []);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if the field was already touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  }, [touched, validateField]);

  // Handle input blur (marks field as touched and validates)
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  }, [validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    // If no validation errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitSuccess(false);

      try {
        // Simulate a network/API request
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Success
        setSubmitSuccess(true);
        setValues(initialValues);
        setErrors({});
        setTouched({});
        
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (err) {
        console.error('Submission failed', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, onSubmitSuccess]);

  // Reset the form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitSuccess(false);
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitSuccess,
    setSubmitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};
