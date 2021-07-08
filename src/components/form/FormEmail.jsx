import React, { useState, useEffect, useContext } from "react";

/* contexts */
import { ContextForm, ContextFields } from "../../contexts/ContextForm";

const form = {
  textAlign: "left",
  width: "320px",
  display: "block",
};
const row = {
  display: "block",
  margin: ".5rem 0",
  width: "100%",
  position: "relative",
};
const input = {
  display: "block",
  padding: ".35rem .5rem",
  marginTop: ".35rem",
  // borderColor: "#f2f2f2",
  width: "318px",
  borderStyle: "solid",
};

function FormEmail(props) {
  const { nextStep, prevStep, step } = props;

  const [loading, setLoading] = useState(false);
  const [contextForm, setContextForm] = useContext(ContextForm);
  const [contextFields, setContextFields] = useContext(ContextFields);

  const [stateFormData, setStateFormData] = useState(
    contextForm.find((form) => {
      return form.step === step;
    }).fields
  );

  const [stateFormError, setStateFormError] = useState([]);
  const [stateFormMessage, setStateFormMessage] = useState({});
  const [stateFormValid, setStateFormValid] = useState(false);

  useEffect(() => {
    if (stateFormValid) {
      nextStep();
      // set current contexts
      // setContextFields({
      //   ...contextForm.forms.find((form) => {
      //     return form.step === step;
      //   }).fields,
      // });
      // console.log(step);
    }
  }, [stateFormValid]);

  function validationHandler(states, e) {
    const input = (e && e.target.name) || "";
    const errors = [];
    let isValid = true;

    Object.entries(states).forEach((item) => {
      item.forEach((field) => {
        errors[item[0]] = "";
        if (field.required) {
          if (!field.value) {
            errors[item[0]] = {
              hint: `${field.label} required`,
              isInvalid: true,
            };
            isValid = false;
          }
        }
        if (field.value && field.min >= field.value.length) {
          errors[item[0]] = {
            hint: `Field ${field.label} min ${field.min}`,
            isInvalid: true,
          };
          isValid = false;
        }
        if (field.value && field.max <= field.value.length) {
          errors[item[0]] = {
            hint: `Field ${field.label} max ${field.max}`,
            isInvalid: true,
          };
          isValid = false;
        }
        if (field.validator !== null && typeof field.validator === "object") {
          if (field.value && !field.validator.regEx.test(field.value)) {
            errors[item[0]] = {
              hint: field.validator.error,
              isInvalid: true,
            };
            isValid = false;
          }
        }
      });
    });

    if (isValid) {
      setStateFormValid(isValid);
    }
    setStateFormError({
      ...errors,
    });
    return isValid;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    /* validation handler */
    validationHandler(stateFormData, e);
    // validationHandler(contextFields, e);
  };

  function onChange(e) {
    const { name, value } = e.currentTarget;

    setStateFormData({
      ...stateFormData,
      [name]: {
        ...stateFormData[name],
        value,
      },
    });

    setContextFields({
      ...contextFields,
      [name]: {
        ...stateFormData[name],
        // ...contextFields[name],
        value,
      },
    });
  }

  return (
    <div className="App" id="FormEmail">
      <div style={{ width: "320px" }}>
        <h1>And last your email</h1>
      </div>
      <form style={form} onSubmit={onSubmit}>
        <div style={row}>
          <label htmlFor="email">
            <span>{contextFields.email.label}</span>
            <input
              type="text"
              name="email"
              id="email"
              onChange={onChange}
              style={input}
              readOnly={loading && true}
              value={contextFields.email.value}
            />
          </label>
          {stateFormError.email && (
            <span className="warning">{stateFormError.email.hint}</span>
          )}
        </div>
        <div style={row}>
          <label htmlFor="address">
            <span>{contextFields.address.label}</span>
            <input
              type="text"
              name="address"
              id="address"
              onChange={onChange}
              style={input}
              readOnly={loading && true}
              value={contextFields.address.value}
            />
          </label>
          {stateFormError.address && (
            <span className="warning">{stateFormError.address.hint}</span>
          )}
        </div>
        <button type="submit">Next</button>
      </form>
      <button type="reset" onClick={(e) => prevStep(e)}>
        Prev
      </button>
    </div>
  );
}

export default FormEmail;
