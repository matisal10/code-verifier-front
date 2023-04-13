import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'

import { register } from "../../services/authService";
import { AxiosResponse } from "axios";

//define schema of validation with yup
const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().required('Name is required'),
    edad: Yup.string().required('Edad is required'),
})

const validatePassword = (values: any) => {
    let error = "";
    const passwordRegex = /(?=.*[0-9])/;
    if (!values) {
        error = "*Required";
    } else if (values.length < 8) {
        error = "*Password must be 8 characters long.";
    } else if (!passwordRegex.test(values)) {
        error = "*Invalid password. Must contain one number.";
    }
    return error;
};
const validateConfirmPassword = (pass: any, value: any) => {

    let error = "";
    if (pass && value) {
        if (pass !== value) {
            error = "Password not matched";
        }
    }
    return error;
};

const RegisterForm = () => {

    const initialCredentials = {
        email: '',
        password: '',
        confirmPassword: "",
        name: '',
        edad: 0
    }


    return (
        <div>
            <h4>Register Form</h4>
            <Formik
                initialValues={initialCredentials}
                validationSchema={registerSchema}
                onSubmit={async (values, { resetForm }) => {
                    // await new Promise((r) => setTimeout(Response, 2000))
                    // alert(JSON.stringify(values, null, 2))
                    // console.table(values)
                    register(values.email, values.password, values.name, values.edad).then((response: AxiosResponse) => {
                        if (response.status === 200) {
                            alert(JSON.stringify(response.data.message, null, 1))
                        }
                        else {
                            throw new Error('Invalid credentials')
                        }

                    })
                        .catch((error) => console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))
                }}
            >
                {
                    ({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                        <Form>
                            <label htmlFor="email">Email</label>
                            <Field id="email" type="email" name="email" placeholder="example@email.com" />
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name="email" component={'dvi'} ></ErrorMessage>
                                )
                            }

                            {/* <label htmlFor="password">Password</label>
                            <Field id="password" type="password" name="password" placeholder="example" />
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name="password" component={'dvi'} ></ErrorMessage>
                                )
                            } */}
                            <label htmlFor="email">Password</label>
                            <Field type="password" name="password" validate={validatePassword} />

                            {errors.password && <div>{errors.password}</div>}

                            <label htmlFor="email">Confirm Password</label>
                            <Field type="password" name="confirmPassword" validate={(value: any) =>
                                validateConfirmPassword(values.password, value)
                            } />

                            {errors.confirmPassword && (<div>{errors.confirmPassword}</div>)}

                            <label htmlFor="name">Name</label>
                            <Field id="name" type="name" name="name" placeholder="pepe" />
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name="name" component={'dvi'} ></ErrorMessage>
                                )
                            }
                            <label htmlFor="edad">Edad</label>
                            <Field id="edad" type="edad" name="edad" placeholder="18" />
                            {
                                errors.edad && touched.edad && (
                                    <ErrorMessage name="edad" component={'dvi'} ></ErrorMessage>
                                )
                            }

                            <button type="submit" >Register</button>

                            {
                                isSubmitting ? (<p>Checking credentials...</p>) : null
                            }
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default RegisterForm
