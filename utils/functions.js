export const getInputValidations = (required, minLength, maxLength) => {
  const validations = {};

  if (required) validations.required = "Please fill the input!";
  if (minLength) validations.minLength = {
    value: minLength,
    message: `characters should not be less than ${minLength}`
  }
  if (maxLength) validations.maxLength = {
    value: maxLength,
    message: `characters should not be more than ${maxLength}`
  }

  return validations;
}