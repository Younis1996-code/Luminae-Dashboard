"use client"
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { addProductFormFields } from "../data/addProductFormData";
import SelectField from "./ui/SelectField";
import FormField from "./ui/FormField";
import ImagesEntry from "./ProductPage/ImagesEntry";
import ListsInput from "./ProductPage/ListsInput";
import {database} from '../utils/firebaseConfig'
import { push, ref, set } from "firebase/database";
const ProductSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  mainCategoryId:Yup.string().required('main category is required'),
  subCategoryID:Yup.string().required('sub category is required'),
  topic:Yup.string().required('topic is required'),
  // make it implici, main + sub Category and send it to db
  // categories:Yup.array().of(Yup.string()).min(2,'must have at least two categories(main&sub Category)'),
  price: Yup.number()
    .required("Price is required")
    .positive("Must be positive"),
  discount:Yup.number()
  .optional()
  .positive('discount must be positive')
  .lessThan(Yup.ref('price'),"Discount price must be less than price"),
  model:Yup.string().required('model is required(sweather, shor-top)'),
  brand:Yup.string().oneOf(['Zara','Gutchi','Blabla'],'brand must be known'),
  style:Yup.array().required('style is required,(casual, sport, beach...)'),
  availableColors:Yup.array().of(Yup.string()).min(1,'must have at least on color!').required('colors are required'),
  size:Yup.array().of(Yup.string().oneOf(['xl','md','sm','2xl','xs'])).required('available sizes is required'),
  // must be procced alone.
  productImages:Yup.array().of(Yup.string()).required('enter product\'s images'),
  shippingInsurance:Yup.number().required('enter shipping insurance'),
  descriptionText:Yup.string()
  .min(30,'description is too short')
  .required('description is required'),
  composition:Yup.string().required("what is the product made of?"),
  descriptionList: Yup.array()
  .of(
    Yup.object({
      text: Yup.string()
        .required("Each description item must have text"),
      icon: Yup.string()
        .required("Each description item must have an icon"),
    })
  )
  .required("Description list is required"),
  careInstructions:Yup.array()
  .of(
    Yup.object({
      text: Yup.string()
        .required("Each description item must have text"),
      icon: Yup.string()
        .required("Each description item must have an icon"),
    })
    .required("Description list is required"),
  )
});

// care Instrucion, Description list, and images manipulation, will be procced independently


const initialValues  = {
  productName:'',
  mainCategoryId:'',
  subCategoryID:'',
  topic:"",
  categories:[],
  price:0,
  discount:0,
  model:'',
  brand:'',
  style:'',
  availableColors:[],
  size:[],
  productImages:[],
  shippingInsurance:0,
  descriptionText:'',
  composition:'',
  descriptionList:[],
  careInstructions:[]
}
const ProductForm: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 400, mt: 3}}>
      <Typography variant="h5" mb={2}>
        Add Product
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={ProductSchema}
        validateOnBlur
        onSubmit={async(values, { resetForm}) => {
          const valuesToBeSent ={
            ...values,
            categories: [values.mainCategoryId,values.subCategoryID]
          }

          const newProductId = push(ref( database , "products"));

          const newProduct = {
            ...valuesToBeSent,
            id:newProductId.key,
            created_at:new Date().toISOString()
          }
          await set(newProductId, newProduct);
          console.log(await set(newProductId, newProduct))
          resetForm();
        }}
        >
        {({ handleChange, values,errors }) => (
          <Form>
            <Stack spacing={2}>
              {
                addProductFormFields.map((field,idx)=>{
                  let fieldName = field.inputName;
                  const fieldValue = values[field.inputName as keyof typeof values] as string;
                  const fieldError = errors[field.inputName as keyof typeof errors] as string;
                  if(field.type == 'multiSelect' || field.type == 'select'){
                  return(
                    <SelectField 
                    className="" 
                    label={field.label} 
                    name={field.inputName}
                    onChange={handleChange}
                    options={field.options ? field.options : []} 
                    type={field.type === "select" ? 'select' : 'multiSelect'} 
                    value={field.type === 'multiSelect' ? fieldValue || [] : fieldValue || ''}
                    error={Boolean(fieldError)}
                    errorMessage={fieldError ? String(fieldError) : ""}
                    key={idx}/>
                  )
                  }
                  else{
                    return(
                      <FormField 
                      className=""
                      error={Boolean(fieldError)}
                      errorMessage={fieldError ? String(fieldError) : ""}
                      label={field.label}
                      name={field.inputName}
                      onChange={handleChange}
                      type={field.type}
                      value={fieldValue || ''}
                      key={idx}
                      />
                    )
                  }
                })
              }
              <TextField
                disabled
                id="outlined-disabled"
                label="Categories"
                name='categories'
                value={[values.mainCategoryId ,values.subCategoryID]}
                error={Boolean(errors.categories)}
                helperText={errors.categories ? errors.categories : ''}
              />
              {/* image entry */}
              <ImagesEntry 
              label= 'Prouct Images'
              name= 'productImages'
              id= "productImages"
              />
              {/* description list */}
              <ListsInput 
              label="Description List"
              name="descriptionList"
              />
              <ListsInput 
              label="Care Instructions"
              name="careInstructions"
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



