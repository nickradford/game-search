import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

import { useRandomBackground } from "../util/useRandomBackground";
import { Button } from "../components/button";

interface ContactFormValues {
  name: string;
  email: string;
  feedback: string;
}

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Please enter more than 3 characters")
    .max(50, "Please enter fewer than 50 characters")
    .required("Your name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Your email is required"),
  feedback: Yup.string()
    .min(20, "Please enter more than 20 characters")
    .required("Why contact me with no feedback?"),
});

export function ContactPage() {
  useRandomBackground();
  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    feedback: "",
  };
  const [emailSent, setEmailSent] = React.useState(false);
  const [emailError, setEmailError] = React.useState<boolean | string>(false);

  return (
    <>
      <Helmet>
        <title>Contact | GameSearch</title>
      </Helmet>
      <div className="bg-black p-4 rounded bg-opacity-75 max-w-3xl m-auto prose prose-invert">
        <h1 className="italic">Contact</h1>
        <p>
          Thanks for using <span className="font-bold italic">GameSearch</span>!
        </p>
        <p>
          If you've run into some issues, please feel free to open a ticket on{" "}
          <a
            className="text-pink-500"
            href="https://github.com/nickradford/game-search/issues"
          >
            Github
          </a>{" "}
          {/* or let me know what's happened using the form below. */}
        </p>
        {/* {emailError ? <div className="px-3 py-2 bg-red-900">{emailError}</div> : null}
        {emailSent ? (
          <p>Thanks for the email, I'll be sure to respond as soon as I can!</p>
        ) : (
          !emailError && (
            <Formik
              initialValues={initialValues}
              validationSchema={ContactSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const resp = await fetch('https://api.nickradford.dev/api/sendmail', {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                  body: JSON.stringify({
                    ...values,
                    from: 'no-reply@gamesearch.xyz',
                    templateId: 'd-874e16697d0d467596249e3f80d0b285',
                  }),
                });

                if (resp.ok) {
                  setSubmitting(false);
                  setEmailSent(true);
                } else {
                  const err = await resp.json();
                  setSubmitting(false);
                  setEmailError(err.msg);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex-col w-full font-asap text-black">
                  <Field type="name" name="name" placeholder="Your name" className="px-3 py-2 rounded flex-1 w-full" />
                  <ErrorMessage name="name" component="div" className="text-white bg-gray-800 px-3 py-2" />

                  <Field
                    type="email"
                    name="email"
                    placeholder="Your email"
                    className="px-3 py-2 mt-2 rounded flex-1 w-full"
                  />
                  <ErrorMessage name="email" component="div" className="text-white bg-gray-800 px-3 py-2" />

                  <Field
                    as="textarea"
                    name="feedback"
                    className="w-full rounded px-3 py-2 mt-2"
                    required
                    rows={6}
                    placeholder="What's on your mind?"
                  />
                  <ErrorMessage name="feedback" component="div" className="text-white bg-gray-800 px-3 py-2" />

                  <Button
                    className="mt-4 bg-pink-600 border-pink-600 text-white uppercase w-full"
                    disabled={isSubmitting}
                    disabledClasses="bg-opacity-25"
                    type="submit"
                  >
                    Send Email
                  </Button>
                </Form>
              )}
            </Formik>
          )
        )} */}
      </div>
    </>
  );
}
