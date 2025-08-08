import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { AlertTriangle} from 'lucide-react'
import { Badge } from "../../../ui/badge"

function RuptureRiskContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Rupture Risk Assessment
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-red-700 mb-2">Escalation Tier: {data?.escalation_tier}</h3>
                    <Badge className="bg-red-600 text-white text-md px-4 py-2">
                        {data?.risk_assessment?.priority} PRIORITY
                    </Badge>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-orange-800 font-medium">Risk Level:</span>
                            <Badge className="bg-orange-600 text-white">{data?.risk_assessment?.risk_level}</Badge>
                        </div>
                        <p className="text-orange-700 text-sm">{data?.risk_assessment?.reasoning}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Risk Factors</h3>
                    <div className="space-y-2">
                        {data?.risk_assessment?.key_risk_factors?.map((factor, index) => (
                            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <p className="text-yellow-800 text-sm">• {factor}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Immediate Recommendations</h3>
                    <div className="space-y-2">
                        {data?.risk_assessment?.recommendations?.map((rec, index) => (
                            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-800 text-sm font-medium">• {rec}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                    <h4 className="text-red-800 font-bold mb-2">URGENT ACTION REQUIRED</h4>
                    <p className="text-red-700 text-sm">
                        This case has been flagged as high-risk requiring immediate medical attention.
                        Please ensure appropriate clinical staff are notified immediately.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}


export default RuptureRiskContent