import { Hospital, User } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { setScanId } from '../../redux/scanIdSlice';
import { useDispatch } from 'react-redux';


function PatientsList({ data, selectedPatient, setSelectedPatient, isLoading }) {
    const skeletonArray = Array(5).fill(null);
    const dispatch = useDispatch();

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
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedPatient?.id === patient.id ? "ring-2 ring-red-500 bg-red-50" : ""}`}
                        onClick={() => {
                            dispatch(setScanId(""));
                            setSelectedPatient(patient)
                        }}
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


export default PatientsList

