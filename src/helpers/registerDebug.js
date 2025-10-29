// Debug helper for register API issues
export const debugRegisterData = (userData) => {
  console.log('=== REGISTER DEBUG ===');
  console.log('Raw userData received:', userData);
  console.log('Field analysis:');
  console.log('- name:', userData.name, '(type:', typeof userData.name, ', length:', userData.name?.length, ')');
  console.log('- email:', userData.email, '(type:', typeof userData.email, ', length:', userData.email?.length, ')');
  console.log('- password:', userData.password ? '[HIDDEN]' : '[EMPTY]', '(type:', typeof userData.password, ', length:', userData.password?.length, ')');
  console.log('- confirmPassword:', userData.confirmPassword ? '[HIDDEN]' : '[EMPTY]', '(type:', typeof userData.confirmPassword, ', length:', userData.confirmPassword?.length, ')');
  
  // Check for common issues
  const issues = [];
  if (!userData.name || userData.name.trim() === '') issues.push('name is empty or whitespace');
  if (!userData.email || userData.email.trim() === '') issues.push('email is empty or whitespace');
  if (!userData.password || userData.password.trim() === '') issues.push('password is empty or whitespace');
  
  if (issues.length > 0) {
    console.warn('Issues found:', issues);
  } else {
    console.log('✅ All fields appear to have values');
  }
  
  console.log('=== END DEBUG ===');
  return issues;
};

// Common field name variations that backends might expect
export const getFieldVariations = (userData) => {
  return {
    // Common variations
    'name': userData.name,
    'fullName': userData.name,
    'full_name': userData.name,
    'username': userData.name,
    'user_name': userData.name,
    
    'email': userData.email,
    'emailAddress': userData.email,
    'email_address': userData.email,
    
    'password': userData.password,
    'pwd': userData.password,
    'pass': userData.password,
  };
};

