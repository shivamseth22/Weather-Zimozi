import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Card, CardContent, Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../utils/firebase"

const StyledCard = styled(Card)({
  maxWidth: '400px',
  minWidth: '400px',
  padding: '20px',
});

const InputField = styled(TextField)({
  marginTop: '16px',
});

const SubmitButton = styled(Button)({
  marginTop: '24px',
});

const SignUp = () => {
  const navigate = useNavigate();
  const [errors ,setErrors] = useState()

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });

  // Submit handler
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    navigate('/login')
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrors(errorMessage)
    // ..
  });
    setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh" // Adjust as needed
    >
      <StyledCard>
        <CardContent>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Typography variant="h4" style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>Sign Up</Typography>
                <Field
                  as={InputField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
                <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
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
                  Sign Up
                </SubmitButton>
              </Form>
            )}
          </Formik>
          <Box onClick={() => navigate('/login')} sx={{ mt: "5px" }}>Already have an account? Log In Now !!</Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default SignUp;
