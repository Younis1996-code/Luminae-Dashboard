"use client";
// Import Formik, Form, and ErrorMessage from Formik library.
// Formik handles form state, validation, and submission in React.
import { Formik, Form, ErrorMessage } from "formik";

// Import Yup for schema-based form validation.
// Yup is used to define validation rules for form fields.
import * as Yup from "yup";

// Import signIn from next-auth/react for handling authentication.
// This function triggers the sign-in process with credentials.
import { signIn } from "next-auth/react";

// Import various Material-UI (MUI) components for styling and layout.
// These include buttons, text fields, boxes, typography, containers, papers, and stacks for building the UI.
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
  Stack,
} from "@mui/material";

// Define the validation schema using Yup.
// This schema ensures that username and password are required fields, with error messages if not provided.
const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

// The default export: SignInPage component, which renders the sign-in form.
// This is a client-side page component for user authentication.
export default function SignInPage() {
  return (
    // Use MUI Container to center the form with a maximum width of 'xs' (extra small).
    // This creates a narrow, focused layout for the login form.
    <Container maxWidth="xs">
      {/* // Use MUI Paper for a card-like container with elevation (shadow) for
      visual depth. // Styles: padding of 4 units, margin top of 8 units. */}
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        {/* // Display a heading with MUI Typography. // Variant 'h5' for size,
        centered, with bottom gutter for spacing. */}
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        {/* Wrap the form with Formik for state management and validation. //
        initialValues: Sets default empty values for username and password. //
        validationSchema: Applies the Yup schema for validation. // onSubmit:
        Async handler for form submission – calls signIn, handles errors, resets
        form on success. */}
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              // Call next-auth's signIn with credentials provider.
              // Passes username/password, redirects to /dashboard on success.
              const result = await signIn("credentials", {
                username: values.username,
                password: values.password,
                redirect: true,
                callbackUrl: "/dashboard",
              });

              // Check for authentication errors from next-auth.
              // If error, show alert; otherwise, reset the form.
              if (result?.error) {
                alert("Invalid username or password");
              } else {
                resetForm();
              }
            } catch (error) {
              // Log any unexpected errors during login.
              console.error("Login failed:", error);
            } finally {
              // Stop the submitting state regardless of success/failure.
              setSubmitting(false);
            }
          }}
        >
          {/* Render the form content using Formik's render prop. // Destructure
          handleChange (for input changes), values (current form values), and
          isSubmitting (submission status). */}
          {({ handleChange, values, isSubmitting }) => (
            // The actual HTML form element managed by Formik.
            <Form>
              {/* Use MUI Stack for vertical layout with spacing between
              elements. // Spacing of 2 units between form fields and button. */}
              <Stack spacing={2}>
                {/* Username input field */}
                {/* MUI TextField for username input. // Full width, with id/name
                for Formik binding, label for display. // Value and onChange
                linked to Formik for controlled input. */}
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                />
                {/* Display validation error for username using ErrorMessage. 
                Renders a Typography component with error color and small size. */}
                <ErrorMessage
                  name="username"
                  render={(msg) => (
                    <Typography variant="caption" color="error">
                      {msg}
                    </Typography>
                  )}
                />
                {/* Password input field */}
                {/* MUI TextField for password input. // Similar to username, but
                with type="password" for secure input masking. */}
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {/* Display validation error for password, similar to username. */}
                <ErrorMessage
                  name="password"
                  render={(msg) => (
                    <Typography variant="caption" color="error">
                      {msg}
                    </Typography>
                  )}
                />
                {/* Submit Button */}
                 {/* MUI Button for form submission. // Full width, contained
                variant (filled), type="submit" to trigger onSubmit. // Disabled
                during submission, with margin top for spacing. // Text changes
                to indicate loading state. */}
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {isSubmitting ? "Signing in..." : "Login"}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
