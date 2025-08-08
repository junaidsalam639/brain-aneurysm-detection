import React, { useEffect, useState } from 'react'
import { useDeletePatientsMutation, useGetPatientsQuery, useUpdatePatientsMutation } from '../../service/patientsApi'
import AddPatientForm from '../../components/patients/AddPatientForm';
import EditPatientForm from '../../components/patients/EditPatientForm';
import PatientDetails from '../../components/patients/PatientDetails';
import { Button } from '../../components/ui/Button';
import { Plus, User } from 'lucide-react';
import { useAddPatientsMutation } from '../../service/patientsApi';
import toast from 'react-hot-toast';
import ProfileHeader from '../../components/layout/ProfileHeader';
import PatientsList from '../../components/patients/PatientsList';

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
            setSelectedPatient(response?.patient);
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

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    return (
        <>
            <ProfileHeader />
            <div className="flex h-screen pb-20">
                <aside className="w-80 bg-white border-r border-gray-200 p-4">
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
                </aside>
                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
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
                </main>
            </div>

        </>
    )
}

