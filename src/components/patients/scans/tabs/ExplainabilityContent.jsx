
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Eye } from 'lucide-react'

function ExplainabilityContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Eye className="w-6 h-6 mr-2" />
                    AI Explainability Report
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-blue-800 font-medium text-sm mb-2">Image Dimensions</h4>
                            <p className="text-blue-900 font-semibold">{data?.image_statistics.image_dimensions.join(' × ')}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="text-green-800 font-medium text-sm mb-2">Voxel Size</h4>
                            <p className="text-green-900 font-semibold">
                                {data?.image_statistics.voxel_size.map((v) => v.toFixed(3)).join(' × ')}
                            </p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="text-purple-800 font-medium text-sm mb-2">Intensity Range</h4>
                            <p className="text-purple-900 font-semibold">
                                {data?.image_statistics.intensity_range[0]} - {data?.image_statistics.intensity_range[1]}
                            </p>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="text-orange-800 font-medium text-sm mb-2">Mean Intensity</h4>
                            <p className="text-orange-900 font-semibold">
                                {data?.image_statistics.mean_intensity.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagnostic Report</h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: data?.diagnostic_report_html }}
                        />
                    </div>
                </div>

                {data?.gradcam_overlay_b64 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">GradCAM Visualization</h3>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <img
                                src={data?.gradcam_overlay_b64 || "/placeholder.svg"}
                                alt="GradCAM Overlay"
                                className="w-full max-w-md mx-auto rounded"
                            />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ExplainabilityContent