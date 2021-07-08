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

function FormAbout(props) {
  const { nextStep, prevStep, step } = props;
  // console.log(props);
  const [loading, setLoading] = useState(true);

  const [contextForm, setContextForm] = useContext(ContextForm);
  const [contextFields, setContextFields] = useContext(ContextFields);

  const [stateFormData, setStateFormData] = useState(
    contextForm.find((form) => {
      return form.step === step;
    }).fields
  );

  // contextFields = setContextFields({
  //   ...contextForm.forms.find((form) => {
  //     return form.step === step;
  //   }).fields,
  //   ...contextFields,
  // });

  const [stateFormError, setStateFormError] = useState([]);
  const [stateFormValid, setStateFormValid] = useState(false);

  useEffect(() => {
    // set current contexts
    if (loading) {
      setContextFields({
        ...contextForm.find((form) => {
          return form.step === step;
        }).fields,
        ...contextFields,
      });
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    // form is valid and complete
    if (stateFormValid) {
      nextStep();
    }
  }, [stateFormValid]);

  // console.log(contextFields);
  // return false;

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

  // console.log(contextFields);
  // return false;

  return (
    <div className="App" id="FormAbout">
      <div style={{ width: "320px" }}>
        <h1>And your profiles..</h1>
      </div>
      {!loading && (
        <>
          <form style={form} onSubmit={onSubmit}>
            <div style={row}>
              <label
                htmlFor="about"
                className={stateFormError.about && "invalid"}
              >
                <span>{contextFields.about.label}</span>
                <textarea
                  type="text"
                  name="about"
                  id="about"
                  onChange={onChange}
                  style={input}
                  readOnly={loading && true}
                  value={contextFields.about.value}
                />
              </label>
              {stateFormError.about && (
                <span className="warning">{stateFormError.about.hint}</span>
              )}
            </div>
            <div style={row}>
              <label htmlFor="job" className={stateFormError.job && "invalid"}>
                <span>{contextFields.job.label}</span>
                <input
                  type="text"
                  name="job"
                  id="job"
                  onChange={onChange}
                  style={input}
                  readOnly={loading && true}
                  value={contextFields.job.value}
                />
              </label>
              {stateFormError.job && (
                <span className="warning">{stateFormError.job.hint}</span>
              )}
            </div>
            <button type="submit">Next</button>
          </form>
          <button
            type="button"
            onClick={() => {
              prevStep();
            }}
          >
            Prev
          </button>
        </>
      )}
    </div>
  );
}

export default FormAbout;
