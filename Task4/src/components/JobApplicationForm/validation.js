/**
 * Validates a name field.
 * @param {string} name 
 * @returns {string} Error message or empty string if valid.
 */
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  return '';
};

/**
 * Validates an email field using a robust regular expression.
 * @param {string} email 
 * @returns {string} Error message or empty string if valid.
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  // Standard robust email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address (e.g. name@example.com)';
  }
  return '';
};

/**
 * Validates a phone number field.
 * Must contain exactly 10 digits and only numbers.
 * @param {string} phone 
 * @returns {string} Error message or empty string if valid.
 */
export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return 'Phone number is required';
  }
  
  const trimmedPhone = phone.trim();
  
  // Validate that the phone number contains only numbers
  const isOnlyDigits = /^\d+$/.test(trimmedPhone);
  if (!isOnlyDigits) {
    return 'Phone number must contain only numbers';
  }
  
  // Validate that the phone number is exactly 10 digits
  if (trimmedPhone.length !== 10) {
    return `Phone number must be exactly 10 digits (currently ${trimmedPhone.length})`;
  }
  
  return '';
};

/**
 * Validates the Cover Letter / Message field.
 * @param {string} message 
 * @returns {string} Error message or empty string if valid.
 */
export const validateMessage = (message) => {
  if (!message || !message.trim()) {
    return 'Cover letter / Message is required';
  }
  if (message.trim().length < 10) {
    return 'Cover letter must be at least 10 characters long';
  }
  return '';
};

/**
 * Performs full client-side validation on all form fields.
 * @param {Object} values - The form state object.
 * @returns {Object} An object containing fields with error messages (if any).
 */
export const validateForm = (values) => {
  const errors = {};
  
  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(values.phone);
  if (phoneError) errors.phone = phoneError;
  
  const messageError = validateMessage(values.message);
  if (messageError) errors.message = messageError;
  
  return errors;
};
