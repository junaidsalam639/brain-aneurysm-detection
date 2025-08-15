import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Separator } from "../../../ui/separator"
import { Brain, Stethoscope, FlaskConical, AlertTriangle, CheckCircle, XCircle } from "lucide-react"


export default function TreatmentContent({ data }) {
    const {
        surgical_candidacy,
        anesthesia_risks,
        preoperative_workup,
        optimization_steps,
        alternative_treatments,
        analysis_timestamp,
        patient_id,
    } = data?.treatment_recommendations;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-red-600 flex items-center">
                        <Stethoscope className="w-6 h-6 mr-2" />
                        Treatment Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <Brain className="w-5 h-5 mr-2 text-red-600" /> Surgical Candidacy
                        </h3>
                        <p className="text-gray-700 mb-3">{surgical_candidacy?.assessment}</p>
                        {surgical_candidacy?.factors.length > 0 && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Key Factors:</p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                                    {surgical_candidacy?.factors.map((factor, index) => (
                                        <li key={index}>{factor}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <Separator className="bg-gray-200" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" /> Anesthesia Risks
                        </h3>
                        <p className="text-gray-700 mb-3">
                            Risk Level:{" "}
                            <span
                                className={`font-semibold ${anesthesia_risks?.risk_level === "High" ? "text-red-600" : "text-green-600"
                                    }`}
                            >
                                {anesthesia_risks?.risk_level}
                            </span>
                        </p>
                        {anesthesia_risks?.considerations?.length > 0 && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-600">Considerations:</p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                                    {anesthesia_risks?.considerations?.map((consideration, index) => (
                                        <li key={index}>{consideration}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <Separator className="bg-gray-200" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center pb-2">
                            <FlaskConical className="w-5 h-5 mr-2 text-red-600" /> Preoperative Workup
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-red-800 mb-2">Imaging Required</p>
                                {preoperative_workup?.imaging_required?.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {preoperative_workup?.imaging_required?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-sm italic">No imaging required</p>
                                )}
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-blue-800 mb-2">Lab Tests</p>
                                {preoperative_workup?.lab_tests?.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {preoperative_workup?.lab_tests?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-sm italic">No lab tests required</p>
                                )}
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-green-800 mb-2">Consultations</p>
                                {preoperative_workup?.consultations?.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {preoperative_workup?.consultations?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-sm italic">No consultations required</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-gray-200" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-red-600" /> Optimization Steps
                        </h3>
                        {optimization_steps?.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                                {optimization_steps?.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No specific optimization steps recommended.</p>
                        )}
                    </div>
                    <Separator className="bg-gray-200" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <XCircle className="w-5 h-5 mr-2 text-red-600" /> Alternative Treatments
                        </h3>
                        {alternative_treatments?.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                                {alternative_treatments?.map((treatment, index) => (
                                    <li key={index}>{treatment}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No alternative treatments suggested.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
