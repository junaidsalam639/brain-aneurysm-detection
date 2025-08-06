import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader } from "lucide-react";
import { useSignupApiMutation } from "../../service/authApi";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [signup, { isLoading }] = useSignupApiMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("username", values?.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        const response = await signup({ formData }).unwrap();
        toast.success(response?.msg || "Signup Successfully");
        navigate("/login");
      } catch (err) {
        toast.error(err?.data?.detail || "Something went wrong");
      }
    },
  });

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-6">
      <Card className="w-full max-w-md animate-fadeIn">
        <form onSubmit={formik.handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-red-600">Create an Account</CardTitle>
            <CardDescription className="text-center">Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-sm text-red-600">{formik.errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-sm text-red-600">{formik.errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={formik.values.terms}
                onChange={(checked) => {
                  formik.setFieldValue("terms", checked.target.checked)
                }}
                onBlur={formik.handleBlur}
                className="accent-red-600"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none"
              >
                I agree to the{" "}
                <Link href="#" className="text-red-600 hover:underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-red-600 hover:underline">
                  privacy policy
                </Link>
              </label>
            </div>

            {formik.touched.terms && formik.errors.terms && (
              <p className="text-sm text-red-600">{formik.errors.terms}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-3 rounded-md transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="animate-spin w-5 h-5" /> : 'Create Account'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

