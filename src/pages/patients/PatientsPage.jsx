import React, { useState } from 'react'
import { useDeletePatientsMutation, useGetPatientsQuery, useUpdatePatientsMutation } from '../../service/patientsApi'
import AddPatientForm from '../../components/patients/AddPatientForm';
import EditPatientForm from '../../components/patients/EditPatientForm';
import PatientDetails from '../../components/patients/PatientDetails';
import { Button } from '../../components/ui/Button';
import { Hospital, Plus, User } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { useAddPatientsMutation } from '../../service/patientsApi';
import toast from 'react-hot-toast';
import ProfileHeader from '../../components/layout/ProfileHeader';


function PatientsList({ data, selectedPatient, setSelectedPatient, isLoading }) {
    const skeletonArray = Array(5).fill(null)

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-700" />
                Patients List
            </h3>

            {isLoading
                ? skeletonArray.map((_, index) => (
                    <Card key={index} className="animate-pulse">
                        <CardContent className="p-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
                : data?.map((patient) => (
                    <Card
                        key={patient.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedPatient?.id === patient.id ? "ring-2 ring-red-500 bg-red-50" : ""
                            }`}
                        onClick={() => setSelectedPatient(patient)}
                    >
                        <CardContent className="p-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 flex items-center gap-1">
                                        <Hospital className="w-4 h-4 text-gray-500" />
                                        ID: {patient.id}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <User className="w-4 h-4 text-gray-500" />
                                        {patient.name}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    )
}

export default function PatientsPage() {
    const { data, isLoading: getIsLoading } = useGetPatientsQuery();
    const [addPatientApi, { isLoading: addIsLoading }] = useAddPatientsMutation();
    const [editPatientApi, { isLoading: editIsLoading }] = useUpdatePatientsMutation();
    const [deletePatientApi, { isLoading: deleteIsLoading }] = useDeletePatientsMutation();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    const addPatient = async (patient) => {
        try {
            const formData = new FormData();
            formData.append("name", patient?.name);
            formData.append("age", patient?.age);
            formData.append("sex", patient?.sex);
            formData.append("history", patient?.history);
            const response = await addPatientApi({ formData }).unwrap();
            toast.success(response?.msg || "Add Patients Successfully");
            setShowAddForm(false)
        } catch (err) {
            toast.error(err?.data?.detail || "Something went wrong");
        }
    }

    const updatePatient = async (updatedValue) => {
        try {
            const formData = new FormData();
            formData.append("name", updatedValue?.name);
            formData.append("age", updatedValue?.age);
            formData.append("sex", updatedValue?.sex);
            formData.append("history", updatedValue?.history);
            const response = await editPatientApi({ formData, id: updatedValue?.id }).unwrap();
            toast.success(response?.msg || "Edit Patients Successfully");
            setEditingPatient(null);
        } catch (err) {
            toast.error(err?.data?.detail || "Something went wrong");
        }
    }

    const deletePatient = async (id) => {
        try {
            const response = await deletePatientApi(id).unwrap();
            toast.success(response?.msg || "Patients delete successfully");
            setSelectedPatient(null)
        } catch (err) {
            toast.error(err?.data?.detail || "Something went wrong");
        }
    }

    return (
        <>
            <ProfileHeader />
            <div className="min-h-screen bg-gray-50 flex">
                <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-hidden h-screen">
                    <Button onClick={() => {
                        setShowAddForm(true);
                        setEditingPatient(null);
                    }} className="w-full mb-6 bg-red-600 hover:bg-red-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Patient
                    </Button>

                    <PatientsList
                        data={data}
                        isLoading={getIsLoading}
                        selectedPatient={selectedPatient}
                        setSelectedPatient={setSelectedPatient}
                    />
                </div>

                <div className="flex-1 h-screen overflow-auto p-6">
                    {showAddForm && (<AddPatientForm
                        onSubmit={addPatient}
                        onCancel={() => setShowAddForm(false)}
                        isLoading={addIsLoading}
                    />)}

                    {editingPatient && (
                        <EditPatientForm
                            patient={editingPatient}
                            onSubmit={updatePatient}
                            onCancel={() => setEditingPatient(null)}
                            isLoading={editIsLoading}
                        />
                    )}

                    {!showAddForm && !editingPatient && selectedPatient && (
                        <PatientDetails
                            patient={selectedPatient}
                            onEdit={() => setEditingPatient(selectedPatient)}
                            onDelete={() => deletePatient(selectedPatient?.id)}
                            isLoading={deleteIsLoading}
                        />
                    )}

                    {!showAddForm && !editingPatient && !selectedPatient && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Patient</h3>
                                <p className="text-gray-500">Choose a patient from the list to view details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

