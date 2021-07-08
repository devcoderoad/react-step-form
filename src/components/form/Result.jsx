import React, { useContext } from "react";

/* contexts */
import { ContextForm, ContextFields } from "../../contexts/ContextForm";

function Result(props) {
  const { goToStep } = props;
  const [contextForm, setContextForm] = useContext(ContextForm);
  const [contextFields, setContextFields] = useContext(ContextFields);

  const changeForm = (form) => {
    // setContextForm({
    //   form,
    //   data: { ...contextForm.data },
    // });
    //  setContextForm({
    //     form: "FormAbout",
    //     formData: {
    //       fullName: stateFormData.fullName.value,
    //       phoneNumber: stateFormData.phoneNumber.value,
    //       ...contextForm.formData,
    //     },
    //  });
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h1>Confirmation</h1>
      <fieldset>
        <legend>Profile</legend>
        <div className="App-small">
          Full Name: {contextFields.fullName.value}
        </div>
        <div className="App-small">
          Phone Number: {contextFields.phoneNumber.value}
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={(e) => {
              goToStep(1);
            }}
          >
            Change
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend>About</legend>
        <div className="App-small">About: {contextFields.about.value}</div>
        <div className="App-small">Job: {contextFields.job.value}</div>
        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={(e) => {
              goToStep(2);
            }}
          >
            Change
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Email</legend>
        <div className="App-small">Email: {contextFields.email.value}</div>
        <div className="App-small">Address: {contextFields.address.value}</div>
        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={(e) => {
              goToStep(3);
            }}
          >
            Change
          </button>
        </div>
      </fieldset>
      <div style={{ textAlign: "center" }}>
        <button type="button">Confirm</button>
      </div>
    </div>
  );
}

export default Result;
