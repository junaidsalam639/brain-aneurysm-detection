
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Pill } from 'lucide-react'

function TreatmentContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Pill className="w-6 h-6 mr-2" />
                    Treatment Recommendations
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <h4 className="text-blue-800 font-medium text-sm">Patient Age</h4>
                        <p className="text-2xl font-bold text-blue-900">{data?.treatment_recommendations.patientAge}</p>
                        <p className="text-xs text-blue-600">years</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <h4 className="text-red-800 font-medium text-sm">Diagnosis</h4>
                        <p className="text-lg font-bold text-red-900">{data?.treatment_recommendations.diagnosis}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <h4 className="text-green-800 font-medium text-sm">AI Confidence</h4>
                        <p className="text-2xl font-bold text-green-900">{data?.treatment_recommendations.aiConfidence}%</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Analysis Timestamp:</span>
                            <span className="font-semibold">{new Date(data?.analysis_timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Patient ID:</span>
                            <span className="font-semibold">{data?.patient_id}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="text-yellow-800 font-medium mb-2">Important Notice</h4>
                    <p className="text-yellow-700 text-sm">
                        Treatment recommendations should be reviewed by qualified medical professionals.
                        This analysis is for informational purposes and should not replace clinical judgment.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h3>
                    <div className="space-y-2">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">• Immediate radiologist consultation recommended</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">• Consider additional imaging studies (CTA/MRA)</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">• Neurosurgical evaluation may be required</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default TreatmentContent