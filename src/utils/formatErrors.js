export default function formatErrors(e) {
    const errors = {};
  
    if (e.response && e.response.status === 422) {
  
      for (let error in e.response.data) {
        errors[error] = e.response.data[error][0];
      }
  
    }
  
    if (e.response && e.response.status===401) {
      errors['invalid'] = "Invalid credentials";
    }
  
    return errors;
  }