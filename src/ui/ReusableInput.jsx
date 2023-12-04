import { useState } from "react";
import { isEmailValid, isPasswordValid } from "../utils/validations";

function useInput(validationFn) {
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);

  const valueIsvalid = validationFn(value);

  function handleChange(e) {
    setValue(e.target.value);
    setEdit(false);
  }

  function handleBlur() {
    setEdit(true);
  }

  return { value, error: edit && !valueIsvalid, handleChange, handleBlur };
}

export default function ReusableInput() {
  const {
    value: email,
    error: emailIsInvalid,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useInput(isEmailValid);

  const {
    value: password,
    error: passwordIsInvalid,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = useInput((value) => isPasswordValid(value, 6));

  function handleSubmit(e) {
    e.preventDefault();

    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Your Email"
        id="email"
        name="email"
        value={email}
        onBlur={handleEmailBlur}
        onChange={handleEmailChange}
        error={emailIsInvalid && "email is not valid!"}
      />

      <Input
        type="password"
        label="Password"
        id="password"
        name="password"
        value={password}
        onBlur={handlePasswordBlur}
        onChange={handlePasswordChange}
        error={passwordIsInvalid && "password is not valid!"}
      />
    </form>
  );
}

// export default function ReusableInput() {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const [didEdit, setDidEdit] = useState({
//     email: false,
//     password: false,
//   });

//   const emailIsInvalid = didEdit.email && !values.email.includes("@");
//   const passwordIsInvalid = didEdit.password && values.password.length < 6;

//   function handleBlur(e) {
//     setDidEdit((curValue) => ({ ...curValue, [e.target.name]: true }));
//   }

//   function handleChange(e) {
//     setValues((curValues) => ({
//       ...curValues,
//       [e.target.name]: e.target.value,
//     }));

//     setDidEdit((curValues) => ({ ...curValues, [e.target.name]: false }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     console.log(values);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <Input
//         type="email"
//         label="Your Email"
//         id="email"
//         name="email"
//         value={values.email}
//         onBlur={handleBlur}
//         onChange={handleChange}
//         error={emailIsInvalid && "email is not valid!"}
//       />

//       <Input
//         type="password"
//         label="Password"
//         id="password"
//         name="password"
//         value={values.password}
//         onBlur={handleBlur}
//         onChange={handleChange}
//         error={passwordIsInvalid && "password is not valid!"}
//       />
//     </form>
//   );
// }

function Input({ label, id, error, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {error && <p>{error}</p>}
    </div>
  );
}
