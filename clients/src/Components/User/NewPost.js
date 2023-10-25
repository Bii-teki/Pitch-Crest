import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = ({ users_id, addProject }) => {
  const initialValues = {
    name: '',
    category: '',
    user_id: users_id,
    investor_id: 1,
    description: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch("https://pitch-crest.onrender.com/user_investors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error("Error:", data.errors);
          alert("Error adding the project.");
        } else if (data.id) {
          addProject(data);
          console.log("Success:", data);
          alert("Project added successfully!");
          resetForm(); // Manually reset the form
        
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the project.");
      });
  };

  return (
    <div className="mb-54 mt-24 border border-blue-500 p-6 rounded-lg text-center">
      <h2 className="text-xl font-bold mb-4">Add a New Project</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="title"
              required
            />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <Field
              type="text"
              id="category"
              name="category"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            <ErrorMessage name="category" component="div" className="error" />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
          >
            Post New Project
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
