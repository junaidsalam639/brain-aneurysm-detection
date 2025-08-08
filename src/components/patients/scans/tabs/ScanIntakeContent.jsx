import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { FileText } from 'lucide-react'


function ScanIntakeContent({ data }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Scan Intake Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">File Format</h3>
                            <p className="text-lg font-semibold text-gray-900">{data?.file_format}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">File Size</h3>
                            <p className="text-lg font-semibold text-gray-900">{data?.file_size_mb} MB</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Dimensions</h3>
                            <p className="text-lg font-semibold text-gray-900">{data?.dimensions.join(' × ')}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Data Type</h3>
                            <p className="text-lg font-semibold text-gray-900">{data?.data_type}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Orientation</h3>
                            <p className="text-lg font-semibold text-gray-900">{data?.orientation}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Processing Time</h3>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date(data?.processing_timestamp).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality Assessment</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 font-medium">Overall Quality: {data?.quality_assessment?.overall_quality}</p>
                        {data?.quality_assessment?.issues?.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">Issues:</p>
                                <ul className="list-disc list-inside text-sm text-gray-700">
                                    {data?.quality_assessment?.issues?.map((issue, index) => (
                                        <li key={index}>{issue}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Processing Status</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 font-medium">
                            Compatible: {data?.ai_processing_ready?.compatible ? "Yes" : "No"}
                        </p>
                        {data?.ai_processing_ready?.preprocessing_required?.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">Preprocessing Required:</p>
                                <ul className="list-disc list-inside text-sm text-gray-700">
                                    {data?.ai_processing_ready?.preprocessing_required?.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ScanIntakeContent