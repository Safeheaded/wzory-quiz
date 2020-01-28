import * as Yup from 'yup';

export type LoginValues = { email: string; password: string };

export function loginSchema() {
    return Yup.object().shape({
        email: Yup.string()
            .required()
            .email(),
        password: Yup.string().required()
    });
}
