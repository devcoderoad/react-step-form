import React, { createContext, useState } from "react";

/* default fields */
export const ContextForm = createContext();

/* default form loaded */
export const FormsProvider = ({ children }) => {

  /* default forms */
  const [defaultForm, setDefaultForm] = useState([
    {
      step: 1,
      name: "FormProfile",
      fields: {
        fullName: {
          value: "",
          label: "Full Name",
          min: 3,
          max: 36,
          required: true,
          validator: {
            regEx: /^[a-z\sA-Z0-9\W\w]+$/,
            error: "Please insert valid Full Name",
          },
        },
        phoneNumber: {
          value: "",
          label: "Phone Number",
          min: 6,
          max: 36,
          required: true,
          validator: {
            regEx: /^[0-9]+$/,
            error: "Please insert valid Phone Number",
          },
        },
      },
      status: false,
    },
    {
      step: 2,
      name: "FormAbout",
      fields: {
        about: {
          value: "",
          label: "About",
          min: 5,
          max: 36,
          required: true,
          validator: {
            regEx: /^[a-z\sA-Z0-9\W\w]+$/,
            error: "Please insert valid About",
          },
        },
        job: {
          value: "",
          label: "Job",
          min: 5,
          max: 36,
          required: true,
          validator: {
            regEx: /^[a-z\sA-Z0-9\W\w]+$/,
            error: "Please insert valid Job",
          },
        },
      },
      status: false,
    },
    {
      step: 3,
      name: "FormEmail",
      fields: {
        email: {
          value: "",
          label: "Email",
          min: 4,
          max: 36,
          required: true,
          validator: {
            regEx: /^[a-z\sA-Z0-9\W\w]+$/,
            error: "Please insert valid Email",
          },
        },
        address: {
          value: "",
          label: "Address",
          min: 6,
          max: 36,
          required: true,
          validator: {
            regEx: /^[a-z\sA-Z0-W\w]+$/,
            error: "Please insert valid Address",
          },
        },
      },
      status: false,
    },
  ]);
  /* default step */
  const [step, setStep] = useState(1);
  /* default fields */
  const [fields, setFields] = useState([]);

  return (
    <ContextForm.Provider value={{ defaultForm, step, fields, setDefaultForm, setStep, setFields }}>
      {children}
    </ContextForm.Provider>
  );
}
