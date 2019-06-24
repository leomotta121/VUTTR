export const afterSubmitRules = passwordMatch => {
  return [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'First name is required.'
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'Last name is required.'
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Email is required.'
    },
    {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'This is not a valid email.'
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Password is required.'
    },
    {
      field: 'confirmPassword',
      method: 'isEmpty',
      validWhen: false,
      message: 'Confirmation is required.'
    },
    {
      field: 'confirmPassword',
      method: passwordMatch,
      validWhen: true,
      message: 'Passwords do not match.'
    }
  ];
};
