// import React from "react";

// import "../../App.css";

// /* contexts */
// import { FormsProvider } from "../../contexts/ContextForm.js";

// /* components */
// import Forms from "../form/Forms";

// function FormContainer() {
//   return (
//     <FormsProvider>
//       <Forms logo={logo} />
//     </FormsProvider>
//   );
// }

// export default FormContainer;


import React, { useEffect, useContext, useState } from "react";

import logo from "../../logo.svg";

/* components */
import FormProfile from "../form/FormProfile";
// import FormAbout from "../form/FormAbout";
// import FormEmail from "../form/FormEmail";
// import FormResult from "../form/Result";

/* contexts */
import {
  FormsProvider
} from "../../contexts/ContextForm.js";

function FormContainer(pageProps) {

  const [step, setStep] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const [stateFormValid, setStateFormValid] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const nextStep = () => {
    // e.preventDefault();
    setStep(step + 1);
    setStateFormValid(false);
  };

  const prevStep = () => {
    // e.preventDefault();
    setStep(step - 1);
    setStateFormValid(false);
  };

  const goToStep = (val) => {
    setStep(val);
    setStateFormValid(false);
  };

  function renderForm(step, props) {
    switch (step) {
      case 1:
        return <FormProfile {...props} />;
      // case 2:
      // return <FormAbout {...props} />;
      // case 3:
      // return <FormEmail {...props} />;
      // default:
      // return <FormResult {...props} />;
      default:
        return;
    }
  }

  const props = {
    nextStep,
    prevStep,
    goToStep,
    step,
    stateFormValid,
    setStateFormValid,
  };

  return (
    <>
      {isLoading ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome</h1>
        </header>
      ) : (
          <main className="App-main">
            <h1>{step}</h1>
            {/* <ContextForm.Provider value={[contextForm, setContextForm]}>
              <ContextFields.Provider value={[contextFields, setContextFields]}> */}
            <FormsProvider>
              {renderForm(step, props)}
            </FormsProvider>
            {/* </ContextFields.Provider>
            </ContextForm.Provider> */}
          </main>
        )}
    </>
  );
}

export default FormContainer;
