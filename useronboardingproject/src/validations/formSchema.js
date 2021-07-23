import * as yup from 'yup'

const formSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(3,'Username must be 3 at least characters long')
        .required('username is required'),
    email: yup
        .string()
        .email('must be a valid email')
        .required('email is required'),
    password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .required('email is required'),
    terms: yup
        .boolean()
        .oneOf([true], 'Must Accept Terms and Conditions'),
})


export default formSchema;