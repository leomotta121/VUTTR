export const liveRules = [
  {
    field: 'tagInput',
    method: 'isByteLength',
    args: [{ min: 0, max: 12 }],
    validWhen: true,
    message: 'Tag is too long.'
  }
];

export const afterSubmitRules = [
  {
    field: 'title',
    method: 'isEmpty',
    validWhen: false,
    message: 'Title is required.'
  },
  {
    field: 'description',
    method: 'isEmpty',
    validWhen: false,
    message: 'Description is required.'
  },
  {
    field: 'link',
    method: 'isEmpty',
    validWhen: false,
    message: 'Link is required.'
  },
  {
    field: 'link',
    method: 'isURL',
    validWhen: true,
    message: 'Not valid url.'
  },
  {
    field: 'tagInput',
    method: 'isByteLength',
    args: [{ min: 0, max: 12 }],
    validWhen: true,
    message: 'Tag is too long.'
  },
  {
    field: 'tags',
    method: 'isEmpty',
    validWhen: false,
    message: 'Add at least one tag.'
  }
];
