import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Ruler } from 'lucide-react'


function SizingContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Ruler className="w-6 h-6 mr-2" />
                    Measurement Analysis
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-800 font-medium text-sm">Max Length</p>
                        <p className="text-2xl font-bold text-red-900">{data?.summary.max_length_mm}</p>
                        <p className="text-xs text-red-600">mm</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-blue-800 font-medium text-sm">Max Width</p>
                        <p className="text-2xl font-bold text-blue-900">{data?.summary.max_width_mm}</p>
                        <p className="text-xs text-blue-600">mm</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p className="text-green-800 font-medium text-sm">Max Area</p>
                        <p className="text-2xl font-bold text-green-900">{data?.summary.max_area_mm2}</p>
                        <p className="text-xs text-green-600">mm²</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <p className="text-purple-800 font-medium text-sm">Max Diameter</p>
                        <p className="text-2xl font-bold text-purple-900">{data?.summary.max_diameter_mm}</p>
                        <p className="text-xs text-purple-600">mm</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistical Summary</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Average Length:</span>
                            <span className="font-semibold">{data?.summary.avg_length_mm} mm</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Average Width:</span>
                            <span className="font-semibold">{data?.summary.avg_width_mm} mm</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Average Area:</span>
                            <span className="font-semibold">{data?.summary.avg_area_mm2} mm²</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Average Diameter:</span>
                            <span className="font-semibold">{data?.summary.avg_diameter_mm} mm</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Detection Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                            <p className="text-yellow-800 font-medium text-sm">Total Regions</p>
                            <p className="text-2xl font-bold text-yellow-900">{data?.summary.total_detected_regions}</p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                            <p className="text-indigo-800 font-medium text-sm">Slices with Detections</p>
                            <p className="text-2xl font-bold text-indigo-900">{data?.summary.slices_with_detections}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                            <p className="text-gray-800 font-medium text-sm">Total Slices</p>
                            <p className="text-2xl font-bold text-gray-900">{data?.summary.total_slices_analyzed}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SizingContent

