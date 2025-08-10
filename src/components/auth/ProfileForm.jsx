"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  User,
  Mail,
  Phone,
  Stethoscope,
  Edit,
  Save,
  Beaker,
  Loader,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { useProfileApiMutation } from "../../service/authApi";
import toast from "react-hot-toast";
import { setUser } from "../../redux/authSlice";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const [profileApi, { isLoading }] = useProfileApiMutation();
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const { values, handleBlur, handleSubmit, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        specialization: user?.specialization || "",
        experience: user?.experience || "",
        license_number: user?.license_number || "",
      },
      validationSchema: Yup.object({
        username: Yup.string().required("Full name is required"),
        email: Yup.string().email("Invalid email address"),
        phone: Yup.number().typeError("Phone must be a number"),
        experience: Yup.number().typeError("Experience must be a number"),
        specialization: Yup.string(),
        license_number: Yup.string(),
      }),
      onSubmit: async (values) => {
        try {
          const formData = new FormData();
          formData.append("username", values?.username);
          formData.append("email", values?.email);
          formData.append("phone", values?.phone || 0);
          formData.append("experience", values?.experience || 0);
          formData.append("specialization", values?.specialization);
          formData.append("license_number", values?.license_number);
          const response = await profileApi({ formData }).unwrap();
          dispatch(setUser(response?.doctor_info));
          setIsEditing(false);
          toast.success(response?.msg || "Profile Successfully");
        } catch (err) {
          toast.error(err?.data?.detail || "Something went wrong");
        }
      },
    });

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-red-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-red-600 capitalize">
                    {user?.username}
                  </h1>
                </div>
              </div>
              {!isEditing && (
                <Button
                  onClick={handleEdit}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isEditing ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-600 flex items-center">
                <Edit className="w-6 h-6 mr-2" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-sm font-medium text-gray-700"
                    >
                      User Name
                    </Label>
                    <Input
                      id="name"
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      className={
                        touched.username && errors.username
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.username && errors.username && (
                      <p className="text-sm text-red-600">{errors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.email && errors.email ? "border-red-500" : ""
                      }
                    />
                    {touched.email && errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.phone && errors.phone ? "border-red-500" : ""
                      }
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="experience"
                      className="text-sm font-medium text-gray-700"
                    >
                      Experience
                    </Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="text"
                      value={values.experience}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.experience && errors.experience
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.experience && errors.experience && (
                      <p className="text-sm text-red-600">
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="specialization"
                      className="text-sm font-medium text-gray-700"
                    >
                      Specialization
                    </Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      type="text"
                      value={values.specialization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.specialization && errors.specialization
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.specialization && errors.specialization && (
                      <p className="text-sm text-red-600">
                        {errors.specialization}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="license_number"
                      className="text-sm font-medium text-gray-700"
                    >
                      License
                    </Label>
                    <Input
                      id="license_number"
                      name="license_number"
                      type="text"
                      value={values.license_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.license_number && errors.license_number
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {touched.license_number && errors.license_number && (
                      <p className="text-sm text-red-600">
                        {errors.license_number}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isLoading ? (
                      <Loader className="animate-spin w-5 h-5" />
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Beaker className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{user?.experience}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-medium text-lg">
                    {user?.specialization}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium">{user?.license_number}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
