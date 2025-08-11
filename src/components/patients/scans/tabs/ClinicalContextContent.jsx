import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Stethoscope } from 'lucide-react'
import { Badge } from "../../../ui/badge"


function ClinicalContextContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Stethoscope className="w-6 h-6 mr-2" />
                    Clinical Context Analysis
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <h4 className="text-yellow-800 font-medium text-sm">Priority Level</h4>
                        <p className="text-2xl font-bold text-yellow-900">{data?.priority}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <h4 className="text-blue-800 font-medium text-sm">AI Priority</h4>
                        <p className="text-2xl font-bold text-blue-900">{data?.ai_priority_level}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                        <h4 className="text-orange-800 font-medium text-sm">Risk Level</h4>
                        <p className="text-2xl font-bold text-orange-900">{data?.risk_stratification}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Context</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Patient ID:</span>
                            <span className="font-semibold">{data?.contextual_data?.patient_id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Age:</span>
                            <span className="font-semibold">{data?.contextual_data?.age} years</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Sex:</span>
                            <span className="font-semibold capitalize">{data?.contextual_data?.sex}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">History:</span>
                            <div className="flex flex-wrap gap-2">
                                {data?.contextual_data?.history?.split(",")?.map((history, index) => (
                                    <Badge key={index} className="bg-red-100 text-red-800 border-red-200">
                                        {history}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Clinical Reasoning</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">{data?.clinical_reasoning || "Clinical reasoning not available"}</p>
                    </div>
                </div>

                {data?.recommendations && data?.recommendations.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                        <div className="space-y-2">
                            {data?.recommendations.map((rec, index) => (
                                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-green-800 text-sm">• {rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data?.key_factors && data?.key_factors.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Factors</h3>
                        <div className="flex flex-wrap gap-2">
                            {data?.key_factors.map((factor, index) => (
                                <Badge key={index} className="bg-red-100 text-red-800 border-red-200">
                                    {factor}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {data?.immediate_actions && data?.immediate_actions.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Immediate Actions</h3>
                        <div className="space-y-2">
                            {data?.immediate_actions.map((rec, index) => (
                                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-green-800 text-sm">• {rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Treatment Considerations</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">{data?.treatment_considerations || "Treatment Considerations not available"}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default ClinicalContextContent

