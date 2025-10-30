"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Must be positive"),
  description: Yup.string(),
});

const ProductForm: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 400, mt: 3 }}>
      <Typography variant="h5" mb={2}>
        Add Product
      </Typography>
      <Formik
        initialValues={{ name: "", price: "", description: "" }}
        validationSchema={ProductSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Product added:", values);
          resetForm();
          alert("Product added successfully!");
        }}
      >
        {({ handleChange, values }) => (
          <Form>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Product Name"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage
                name="name"
                component="div"
              />

              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                value={values.price}
                onChange={handleChange}
              />
              <ErrorMessage
                name="price"
                component="div"
              />

              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
              />

              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProductForm;
