import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Brain } from 'lucide-react'


function ClassificationContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Brain className="w-6 h-6 mr-2" />
                    AI Classification Results
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                        <h2 className="text-3xl font-bold text-red-700 mb-2">{data?.prediction}</h2>
                        <p className="text-xl text-red-600">Confidence: {data?.confidence}</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 font-medium">Important Note</p>
                        <p className="text-sm text-gray-700 mt-2">
                            This is an AI-generated prediction. Please consult with a qualified radiologist for final diagnosis and treatment recommendations.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ClassificationContent
