import { useState } from "react";
import { registerForm } from "../../../utilities/Arrays";
import type { RegisterInputValType } from "../../../utilities/interfaces";
import { useDispatch } from "react-redux";

export default function RegisterFirstPage() {
  const [registerInputVal, setRegisterInputVal] =
    useState<RegisterInputValType>({
      username: "",
      email: "",
      password: "",
      repassword: "",
      firstname: "",
      lastname: "",
      dateOfBirth: "",
    });
  const dispatch = useDispatch();

  /* function */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterInputVal((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: "FETCH_ADD_USER", payload: registerInputVal });
    } catch (error) {}
  };
  console.log("registerInputVal", registerInputVal);
  return (
    <div>
      <div> Register Form</div>
      <form onSubmit={handleSubmit}>
        {registerForm.map((inp, ind) => {
          return (
            <label htmlFor={inp.name} key={ind}>
              <p>{inp.label}</p>
              <input
                id={inp.name}
                type={inp.type}
                placeholder={inp?.placeHolder}
                name={inp.name}
                value={registerInputVal[inp.name as keyof RegisterInputValType]}
                onChange={(e) => handleChange(e)}
              />
            </label>
          );
        })}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
