"use client"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { User, Mail, Phone,  Stethoscope, Edit, Save, Beaker } from "lucide-react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Label } from "../ui/Label"
import { Input } from "../ui/Input"
import { useSelector } from "react-redux"


export default function ProfileForm() {
    const {user} = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Dr. Ahmad Hassan",
    email: "ahmad.hassan@medicare.com",
    phone: "+92-300-1234567",
    address: "123 Medical Center, Lahore, Pakistan",
    specialization: "Cardiology",
    experience: "8 years",
    license: "PMC-12345",
    bio: "Experienced cardiologist with expertise in interventional cardiology and heart disease prevention. Committed to providing excellent patient care and advancing cardiovascular health.",
    joinDate: "January 2020",
  })

  const formik = useFormik({
    initialValues: profileData,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("Address is required"),
      specialization: Yup.string().required("Specialization is required"),
      experience: Yup.string().required("Experience is required"),
      license: Yup.string().required("License is required"),
      bio: Yup.string().required("Bio is required"),
    }),
    onSubmit: (values) => {
      setProfileData(values)
      setIsEditing(false)
    },
  })

  const handleEdit = () => {
    setIsEditing(true)
    formik.setValues(profileData)
  }

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
                  <h1 className="text-3xl font-bold text-red-600 capitalize">{user?.username}</h1>
                  <p className="text-gray-500">{profileData?.experience} of experience</p>
                </div>
              </div>
              {!isEditing && (
                <Button onClick={handleEdit} className="bg-red-600 hover:bg-red-700 text-white">
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
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.name && formik.errors.name ? "border-red-500" : ""}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm text-red-600">{formik.errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-sm text-red-600">{formik.errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.phone && formik.errors.phone ? "border-red-500" : ""}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-sm text-red-600">{formik.errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                      Experience
                    </Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formik.values.experience}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.experience && formik.errors.experience ? "border-red-500" : ""}
                    />
                    {formik.touched.experience && formik.errors.experience && (
                      <p className="text-sm text-red-600">{formik.errors.experience}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
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
                    <p className="font-medium">{profileData?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Beaker className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{profileData?.experience}</p>
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
                  <p className="font-medium text-lg">{profileData?.specialization}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium">{profileData?.license}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
