export const afterSubmitRules = [
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
  }
];
