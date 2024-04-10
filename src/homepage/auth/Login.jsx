import React from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Card, CardContent, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../utils/firebase"
import { useState } from 'react';

const StyledCard = styled(Card)({
  maxWidth: '400px',
  padding: '20px',
  minWidth: '400px'
});

const InputField = styled(TextField)({
  marginTop: '16px',
});

const SubmitButton = styled(Button)({
  marginTop: '24px',
});

const Login = () => {
  const navigate = useNavigate();
  const [errors , setErrors] = useState()

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });

  // Submit handler
  const handleSubmit = (values, { setSubmitting }) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // navigate('/login')
        // console.log(user.accessToken)
        localStorage.setItem('token' , user.accessToken)
        // ...
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        setErrors(errorMessage)
        // Handle errors here
      });
    setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh" // Set a minimum height
    >
      <StyledCard>
        <CardContent>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Typography variant="h4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Welcome Back</Typography>
                <Field
                  as={InputField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                <Field
                  as={InputField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                {errors && <Box>{errors}</Box>}
                <SubmitButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Sign In
                </SubmitButton>
              </Form>
            )}
          </Formik>
          <Box onClick={() => navigate('/signup')} sx={{ mt: "5px" }}>Do not have an account? Sign Up Now !!</Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Login;
