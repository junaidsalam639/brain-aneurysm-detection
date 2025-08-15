import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import {  Shield} from 'lucide-react'


function BiasDetectionContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Bias Detection Analysis
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-blue-800 font-medium mb-2">Analysis Timestamp</h3>
                    <p className="text-blue-700">{new Date(data?.analysis_timestamp).toLocaleString()}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Bias Metrics</h3>
                    {data?.bias_metrics?.length === 0 ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-yellow-800 font-medium">No bias metrics available</p>
                            <p className="text-sm text-yellow-700 mt-1">Insufficient data for comprehensive bias analysis</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {data?.bias_metrics?.map((metric, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3">
                                    <p className="font-medium">{metric?.name}: {metric?.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Requirements</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Min samples per group:</span>
                            <span className="font-semibold">{data?.data_requirements?.min_samples_per_group}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Min samples each class:</span>
                            <span className="font-semibold">{data?.data_requirements?.min_samples_each_class}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                    <div className="space-y-2">
                        {data?.recommendations?.map((rec, index) => (
                            <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <p className="text-green-800 text-sm">• {rec}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-700 text-sm">{data?.llm_summary}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default BiasDetectionContent

