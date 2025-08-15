import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Brain, Stethoscope, FlaskConical, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function TreatmentContent({ data }) {
    const {
        surgical_candidacy,
        anesthesia_risks,
        preoperative_workup,
        treatment_options,
        optimization_steps,
        urgency_assessment,
    } = data?.treatment_recommendations || {};

    return (
        <div className="space-y-6">
            <Card className="shadow-lg border border-gray-200 rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-red-700 flex items-center">
                        <Stethoscope className="w-7 h-7 mr-2 text-red-600" />
                        Treatment Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <Brain className="w-5 h-5 mr-2 text-blue-600" /> Surgical Candidacy
                        </h3>
                        <p className="text-gray-700 mb-3">{surgical_candidacy?.assessment}</p>
                        {surgical_candidacy?.size_considerations && (
                            <p className="text-sm text-gray-600 italic">{surgical_candidacy.size_considerations}</p>
                        )}
                        {surgical_candidacy?.factors?.length > 0 && (
                            <>
                                <p className="text-sm font-medium text-gray-600 mt-2">Key Factors:</p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                                    {surgical_candidacy.factors.map((factor, index) => (
                                        <li key={index}>{factor}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </section>
                    <section className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" /> Anesthesia Risks
                        </h3>
                        <p className="text-gray-700 mb-3">
                            Risk Level:{" "}
                            <span className={`font-semibold ${anesthesia_risks?.risk_level === "High" ? "text-red-600" : "text-green-600"}`}>
                                {anesthesia_risks?.risk_level}
                            </span>
                        </p>
                        {anesthesia_risks?.considerations?.length > 0 && (
                            <>
                                <p className="text-sm font-medium text-gray-600">Considerations:</p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                                    {anesthesia_risks.considerations.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {anesthesia_risks?.age_related_factors && (
                            <p className="mt-2 text-sm italic text-gray-600">{anesthesia_risks.age_related_factors}</p>
                        )}
                    </section>
                    <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FlaskConical className="w-5 h-5 mr-2 text-blue-600" /> Preoperative Workup
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {["imaging_required", "lab_tests", "consultations"].map((key, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                    <p className="text-sm font-semibold text-gray-800 mb-2">
                                        {key.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                                    </p>
                                    {preoperative_workup?.[key]?.length > 0 ? (
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                            {preoperative_workup[key].map((item, index) => <li key={index}>{item}</li>)}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-sm italic">No data</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {preoperative_workup?.sizing_verification && (
                            <p className="mt-4 text-sm italic text-gray-600">{preoperative_workup.sizing_verification}</p>
                        )}
                    </section>
                    <section className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" /> Treatment Options
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {treatment_options && Object.keys(treatment_options).map((optionKey, index) => (
                                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                    <p className="font-semibold capitalize text-gray-800">{optionKey}</p>
                                    {Object.entries(treatment_options[optionKey]).map(([k, v], idx) => (
                                        <p key={idx} className="text-sm text-gray-700 mt-1">
                                            <strong>{k.replace(/_/g, " ")}:</strong> {v}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-purple-600" /> Optimization Steps
                        </h3>
                        {optimization_steps?.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                                {optimization_steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No optimization steps.</p>
                        )}
                    </section>
                    <section className="bg-red-100 p-4 rounded-lg border border-red-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-red-600" /> Urgency Assessment
                        </h3>
                        {urgency_assessment && (
                            <div className="space-y-1 text-gray-700">
                                <p><strong>Timeline:</strong> {urgency_assessment.timeline}</p>
                                <p><strong>Reasoning:</strong> {urgency_assessment.reasoning}</p>
                                <p><strong>Size Impact:</strong> {urgency_assessment.size_impact}</p>
                            </div>
                        )}
                    </section>
                </CardContent>
            </Card>
        </div>
    )
}
