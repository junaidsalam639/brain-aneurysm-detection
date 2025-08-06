"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import {
    X,
    UserRound,
    CalendarClock,
    Venus,
    Mars,
    Stethoscope,
    Loader,
} from "lucide-react"
import HistorySelector from "./HistorySelector"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"

export default function AddPatientForm({ onSubmit, onCancel, isLoading }) {
    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            sex: "",
            history: [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            age: Yup.number()
                .positive("Age must be positive")
                .integer("Age must be a whole number")
                .required("Age is required"),
            sex: Yup.string().oneOf(["male", "female"]).required("Sex is required"),
        }),
        onSubmit: (values) => {
            onSubmit({
                name: values.name,
                age: Number(values.age),
                sex: values.sex,
                history: values.history,
            })
        },
    })

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
                    <Stethoscope className="w-6 h-6" />
                    Add New Patient
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    <X className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <UserRound className="w-4 h-4" />
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter patient's full name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.touched.name && formik.errors.name ? "border-red-500" : ""}
                        />
                        {formik.touched.name && formik.errors.name && <p className="text-sm text-red-600">{formik.errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="age" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <CalendarClock className="w-4 h-4" />
                            Age
                        </Label>
                        <Input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="Enter patient's age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.touched.age && formik.errors.age ? "border-red-500" : ""}
                        />
                        {formik.touched.age && formik.errors.age && <p className="text-sm text-red-600">{formik.errors.age}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Sex</Label>
                        <div className="flex space-x-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="sex"
                                    value="male"
                                    checked={formik.values.sex === "male"}
                                    onChange={formik.handleChange}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formik.values.sex === "male" ? "bg-red-600 border-red-600" : "border-gray-300"
                                        }`}
                                >
                                    {formik.values.sex === "male" && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <span className="text-sm text-gray-700 flex items-center gap-1">
                                    <Mars className="w-4 h-4" />
                                    Male
                                </span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="sex"
                                    value="female"
                                    checked={formik.values.sex === "female"}
                                    onChange={formik.handleChange}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formik.values.sex === "female" ? "bg-red-600 border-red-600" : "border-gray-300"
                                        }`}
                                >
                                    {formik.values.sex === "female" && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <span className="text-sm text-gray-700 flex items-center gap-1">
                                    <Venus className="w-4 h-4" />
                                    Female
                                </span>
                            </label>
                        </div>
                        {formik.touched.sex && formik.errors.sex && <p className="text-sm text-red-600">{formik.errors.sex}</p>}
                    </div>

                    <HistorySelector
                        selectedHistory={formik.values.history}
                        onChange={(history) => formik.setFieldValue("history", history)}
                    />

                    <div className="flex space-x-4 pt-4">
                        <Button disabled={isLoading} type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                            {isLoading ? <Loader className="animate-spin w-5 h-5" /> : 'Add Patient'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
