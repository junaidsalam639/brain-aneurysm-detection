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
      phone: "",
      experience: "",
      specialization: "",
      license_number: "",
      terms: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email address"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      phone: Yup.number().typeError("Phone must be a number"),
      experience: Yup.number().typeError("Experience must be a number"),
      specialization: Yup.string(),
      license_number: Yup.string(),
      terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("username", values?.username);
        formData.append("password", values?.password);
        if (values?.email) formData.append("email", values?.email);
        if (values?.phone) formData.append("phone", values?.phone);
        if (values?.experience) formData.append("experience", values?.experience);
        if (values?.specialization) formData.append("specialization", values?.specialization);
        if (values?.license_number) formData.append("license_number", values?.license_number);

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
      <Card className="w-full max-w-xl animate-fadeIn">
        <form onSubmit={formik.handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-red-600">Create an Account</CardTitle>
            <CardDescription className="text-center">Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username *</label>
              <Input id="username" name="username" type="text" placeholder="Enter your username"
                value={formik.values?.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.username && formik.errors.username && <p className="text-sm text-red-600">{formik.errors.username}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <Input id="email" name="email" type="email" placeholder="john.doe@example.com"
                value={formik.values?.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email && <p className="text-sm text-red-600">{formik.errors.email}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password *</label>
              <Input id="password" name="password" type="password"
                value={formik.values?.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password && formik.errors.password && <p className="text-sm text-red-600">{formik.errors.password}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password *</label>
              <Input id="confirmPassword" name="confirmPassword" type="password"
                value={formik.values?.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-sm text-red-600">{formik.errors.confirmPassword}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
              <Input id="phone" name="phone" type="text"
                value={formik.values?.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.phone && formik.errors.phone && <p className="text-sm text-red-600">{formik.errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium text-gray-700">Experience</label>
              <Input id="experience" name="experience" type="text"
                value={formik.values?.experience} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.experience && formik.errors.experience && <p className="text-sm text-red-600">{formik.errors.experience}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="specialization" className="text-sm font-medium text-gray-700">Specialization</label>
              <Input id="specialization" name="specialization" type="text"
                value={formik.values?.specialization} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.specialization && formik.errors.specialization && <p className="text-sm text-red-600">{formik.errors.specialization}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="license_number" className="text-sm font-medium text-gray-700">License Number</label>
              <Input id="license_number" name="license_number" type="text"
                value={formik.values?.license_number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.license_number && formik.errors.license_number && <p className="text-sm text-red-600">{formik.errors.license_number}</p>}
            </div>
            <div className="col-span-2">
              <div className="flex gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formik.values?.terms}
                  onChange={(checked) => formik.setFieldValue("terms", checked.target.checked)}
                  onBlur={formik.handleBlur}
                  className="accent-red-600"
                />
                <label htmlFor="terms" className="text-sm font-medium leading-none">
                  I agree to the{" "}
                  <Link href="#" className="text-red-600 hover:underline">terms of service</Link> and{" "}
                  <Link href="#" className="text-red-600 hover:underline">privacy policy</Link>
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms && <p className="text-sm text-red-600">{formik.errors.terms}</p>}
            </div>
            <div className="col-span-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-3 rounded-md transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader className="animate-spin w-5 h-5" /> : 'Create Account'}
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 hover:underline">Sign in</Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
