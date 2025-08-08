"use client"
import {
    Edit,
    Trash2,
    User,
    Cake,
    Mars,
    Venus,
    Fingerprint,
    ClipboardList,
    Loader
} from "lucide-react"
import { Card, CardContent, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import ScansIds from "./scans/ScansIds";

export default function PatientDetails({ patient, onEdit, onDelete, isLoading }) {
    const history = patient?.history?.split(",") || [];

    const handleDelete = () => {
        onDelete();
    }

    return (
        <>
            <Card className="max-w-4xl mx-auto">
                <CardContent className="space-y-6 px-4 py-3">
                    <Accordion type="detail" collapsible>
                        <AccordionItem value="document">
                            <AccordionTrigger className="text-base font-semibold">
                                <CardTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
                                    <User className="w-6 h-6" />
                                    Patient Details
                                </CardTitle>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex space-x-2 justify-end">
                                    <Button onClick={onEdit} size="sm" className="bg-red-600 hover:bg-red-700 text-white w-24">
                                        <Edit className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        disabled={isLoading}
                                        onClick={handleDelete}
                                        size="sm"
                                        variant="outline"
                                        className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent w-24"
                                    >
                                        {isLoading ? <Loader className="animate-spin w-5 h-5" /> : <>
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </>}
                                    </Button>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                                    <Fingerprint className="w-4 h-4" />
                                                    Patient ID
                                                </h3>
                                                <p className="text-lg font-semibold text-gray-900">{patient?.id}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    Full Name
                                                </h3>
                                                <p className="text-lg font-semibold text-gray-900">{patient?.name}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                                    <Cake className="w-4 h-4" />
                                                    Age
                                                </h3>
                                                <p className="text-lg font-semibold text-gray-900">{patient?.age} years</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                                                    {patient?.sex === "male" ? <Mars className="w-4 h-4" /> : <Venus className="w-4 h-4" />}
                                                    Sex
                                                </h3>
                                                <p className="text-lg font-semibold text-gray-900 capitalize">
                                                    {patient?.sex}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <ClipboardList className="w-5 h-5 text-red-600" />
                                            Medical History
                                        </h3>
                                        {history?.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {history?.map((condition, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium capitalize">
                                                        {condition?.replace(/_/g, " ")}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic">No medical history recorded</p>
                                        )}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            <ScansIds patient={patient} />
        </>
    )
}

