import React, { useState, useEffect, useContext } from "react";

/* contexts */
import { ContextForm } from "../../contexts/ContextForm";

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
  width: "318px",
  borderStyle: "solid",
};

function FormProfile(props) {
  const { nextStep, stateFormValid, setStateFormValid } = props;
  const [loading, setLoading] = useState(false);

  const { step, setStep, defaultForm, setDefaultForm, fields, setFields } = useContext(ContextForm);

  const [stateFormData, setStateFormData] = useState(defaultForm.find(form => {
    return form.step === step;
  }).fields);

  const [stateFormError, setStateFormError] = useState([]);
  // const [stateFormValid, setStateFormValid] = useState(false);

  // useEffect(() => {
  //   // form is valid and complete
  //   if (stateFormValid) {
  //     nextStep();
  //   }
  // }, [stateFormValid]);

  // console.log(stateFormValid);
  function onSubmit(e) {
    e.preventDefault();

    /* validation handler */
    // if (validationHandler(stateFormData, e)) {
    //   setFields({
    //     ...fields,
    //     ...stateFormData
    //   });
    // }
    // console.log(stateFormData);

    validationHandler(stateFormData, e)

  }

  function onChange(e) {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    setStateFormData({
      ...stateFormData,
      [name]: {
        ...stateFormData[name],
        value,
      },
    });

    validationHandler(stateFormData, e)

  }

  function validationHandler(states, e) {
    const input = (e && e.currentTarget.name) || '';
    const errors = [];
    let isValid = true;

    if (input) {
      if (states[input].required) {
        if (!states[input].value && !states[input].value.length) {
          errors[input] = {
            hint: `${states[e.target.name].label} is required`,
            isInvalid: true,
          };
          isValid = false;
        }
      }
      if (
        states[input].value &&
        states[input].min > states[input].value.length
      ) {
        errors[input] = {
          hint: `Field ${states[input].label} min ${states[input].min}`,
          isInvalid: true,
        };
        isValid = false;
      }
      if (
        states[input].value &&
        states[input].max < states[input].value.length
      ) {
        errors[input] = {
          hint: `Field ${states[input].label} max ${states[input].max}`,
          isInvalid: true,
        };
        isValid = false;
      }
      if (
        states[input].validator !== null &&
        typeof states[input].validator === 'object'
      ) {
        if (
          states[input].value &&
          !states[input].validator.regEx.test(states[input].value)
        ) {
          errors[input] = {
            hint: states[input].validator.error,
            isInvalid: true,
          };
          isValid = false;
        }
      }
    }
    else {
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
    }

    if (isValid) {
      setStateFormValid(isValid);
    }

    setStateFormError({
      ...errors,
    });

    return isValid;
  }
  console.log(stateFormValid);
  return (
    <div className="App" id="FormProfile">
      <div style={{ width: "320px" }}>
        <h1>Hi, let's get your profile first.</h1>
      </div>
      <form style={form} onSubmit={onSubmit}>
        <div style={row}>
          <label
            htmlFor="fullName"
            className={stateFormError.fullName && "invalid"}
          >
            <span>{stateFormData.fullName.label}</span>
            <input
              type="text"
              name="fullName"
              id="fullName"
              onChange={onChange}
              style={input}
              readOnly={loading && true}
              value={stateFormData.fullName.value}
            />
          </label>
          {stateFormError.fullName && (
            <span className="warning">{stateFormError.fullName.hint}</span>
          )}
        </div>
        <div style={row}>
          <label
            htmlFor="phoneNumber"
            className={stateFormError.phoneNumber && "invalid"}
          >
            <span>{stateFormData.phoneNumber.label}</span>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={onChange}
              style={input}
              readOnly={loading && true}
              value={stateFormData.phoneNumber.value}
            />
          </label>
          {stateFormError.phoneNumber && (
            <span className="warning">{stateFormError.phoneNumber.hint}</span>
          )}
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default FormProfile;
