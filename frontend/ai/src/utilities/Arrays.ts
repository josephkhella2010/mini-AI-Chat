import type { registerFormType } from "./interfaces";

export const registerForm: registerFormType[] = [
  { label: "First name", type: "text", name: "firstname" },
  { label: "Last name", type: "text", name: "lastname" },
  { label: "Date of Birth", type: "date", name: "dateOfBirth" },
  { label: "Username", type: "text", name: "username" },
  { label: "Email", type: "text", name: "email" },
  { label: "Password", type: "password", name: "password" },
  { label: "Confirm Password", type: "password", name: "repassword" },
].map((it) => {
  if (it.name === "repassword") {
    return { ...it, placeHolder: ` Please confirm your password` };
  } else if (it.name === "dateOfBirth") {
    return { ...it };
  }
  return { ...it, placeHolder: `Please enter your ${it.label}` };
});
