import { useState } from "react";
import { loginForm } from "../../../utilities/Arrays";
import type { loginPayload } from "../../../utilities/interfaces";
import { useDispatch } from "react-redux";

export default function LoginFirstContainer() {
  const dispatch = useDispatch();
  const [loginInputVal, setLoginInputVal] = useState<loginPayload>({
    username: "",
    password: "",
  });

  /* function */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formattedData: loginPayload = Object.fromEntries(
        Object.entries(loginInputVal).map(([key, value]) => [
          key,
          key === "password"
            ? value
            : typeof value === "string"
              ? value.trim().toLowerCase()
              : value,
        ]),
      ) as loginPayload;
      dispatch({ type: "FETCH_LOGIN_USER", payload: formattedData });
    } catch (error) {}
  };

  /*  */
  return (
    <div>
      <div>
        <h2> Login Form</h2>
        <form action="" onSubmit={handleSubmit}>
          {loginForm.map((inp, ind) => {
            return (
              <label htmlFor={inp.name} key={ind}>
                <p>{inp.label}</p>
                <input
                  type={inp.type}
                  placeholder={inp.placeHolder}
                  id={inp.name}
                  name={inp.name}
                  value={loginInputVal[inp.name as keyof loginPayload]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLoginInputVal((prev) => ({
                      ...prev,
                      [inp.name]: e.target.value,
                    }))
                  }
                />
              </label>
            );
          })}
          <button type="submit">Login </button>
        </form>
      </div>
    </div>
  );
}
