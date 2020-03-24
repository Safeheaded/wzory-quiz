import * as Yup from 'yup';

export type LoginValues = { email: string; password: string };

export type EditValues = {
    equation: string;
    name: string;
    subjectRef: string;
    topicRef: string;
    explanations: string[];
};

export function loginSchema() {
    return Yup.object().shape({
        email: Yup.string()
            .required()
            .email(),
        password: Yup.string().required()
    });
}

export function editSchema() {
    return Yup.object().shape({
        equation: Yup.string().required(),
        name: Yup.string().required(),
        subjectRef: Yup.string().required(),
        topicRef: Yup.string().required(),
        explanations: Yup.array().of(Yup.string().required())
    });
}
