import { ValidationSchema } from 'class-validator';
export let UserValidationSchema: ValidationSchema = {
  // using interface here is not required, its just for type-safety
  name: 'myUserSchema', // this is required, and must be unique
  properties: {
    firstName: [
      {
        type: 'minLength', // validation type. All validation types are listed in ValidationTypes class.
        constraints: [2],
      },
      {
        type: 'maxLength',
        constraints: [20],
      },
    ],
    lastName: [
      {
        type: 'minLength',
        constraints: [2],
      },
      {
        type: 'maxLength',
        constraints: [20],
      },
    ],
    email: [
      {
        type: 'isEmail',
      },
    ],
  },
};
