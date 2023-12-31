import { Form, Formik } from "formik";
import InputGroup from "../../../common/InputGroup.tsx";
import { useNavigate } from "react-router-dom";
import { ILogin, ILoginResult } from "../../../entities/Auth.ts";
import http_common from "../../../http_common.ts";
import { useState } from "react";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { LoginUserAction } from "../../../store/actions/AuthActions.ts";
import { store } from "../../../store/store.ts";
import GoogleAuth from "../GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

function LoginPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigate = useNavigate();

  const initialValues: ILogin = {
    email: "",
    password: "",
    recaptchaToken: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (values: ILogin) => {
    try {
      if (!executeRecaptcha) {
        alert("Bot detected");
        return;
      }
      values.recaptchaToken = await executeRecaptcha();
      const result = await http_common.post<ILoginResult>(
        "api/account/login",
        values,
      );
      LoginUserAction(store.dispatch, result.data.token);
      setMessage("");
      navigate("/");
    } catch {
      setMessage("Invalid email or password");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ handleChange, errors, touched, handleBlur }) => (
          <Form>
            <i
              className="bi bi-arrow-left-circle-fill back-button"
              onClick={() => navigate("..")}
            ></i>
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <InputGroup
              label="Email"
              type="email"
              field="email"
              handleBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              handleChange={handleChange}
            ></InputGroup>
            <InputGroup
              label="Password"
              type="password"
              field="password"
              handleBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              handleChange={handleChange}
            ></InputGroup>
            <GoogleOAuthProvider
              clientId={
                "982436313952-5tbme741pdht0po8i1vejs587fb2b1lc.apps.googleusercontent.com"
              }
            >
              <GoogleAuth></GoogleAuth>
            </GoogleOAuthProvider>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginPage;
