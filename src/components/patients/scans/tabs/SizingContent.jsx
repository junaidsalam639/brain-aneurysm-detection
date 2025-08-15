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
                        <p className="text-lg font-bold text-red-900">{data?.summary?.max_length_mm}</p>
                        <p className="text-xs text-red-600">mm</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-blue-800 font-medium text-sm">Max Width</p>
                        <p className="text-lg font-bold text-blue-900">{data?.summary?.max_width_mm}</p>
                        <p className="text-xs text-blue-600">mm</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p className="text-green-800 font-medium text-sm">Max Area</p>
                        <p className="text-lg font-bold text-green-900">{data?.summary?.max_area_mm2}</p>
                        <p className="text-xs text-green-600">mm²</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <p className="text-purple-800 font-medium text-sm">Max Diameter</p>
                        <p className="text-lg font-bold text-purple-900">{data?.summary?.max_diameter_mm}</p>
                        <p className="text-xs text-purple-600">mm</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <p className="text-yellow-800 font-medium text-sm">Avg Length</p>
                        <p className="text-lg font-bold text-yellow-900">{data?.summary?.avg_length_mm}</p>
                        <p className="text-xs text-yellow-600">mm</p>
                    </div>
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                        <p className="text-pink-800 font-medium text-sm">Avg Width</p>
                        <p className="text-lg font-bold text-pink-900">{data?.summary?.avg_width_mm}</p>
                        <p className="text-xs text-pink-600">mm</p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                        <p className="text-indigo-800 font-medium text-sm">Avg Area</p>
                        <p className="text-lg font-bold text-indigo-900">{data?.summary?.avg_area_mm2}</p>
                        <p className="text-xs text-indigo-600">mm²</p>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                        <p className="text-teal-800 font-medium text-sm">Avg Diameter</p>
                        <p className="text-lg font-bold text-teal-900">{data?.summary?.avg_diameter_mm}</p>
                        <p className="text-xs text-teal-600">mm</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-gray-800 font-medium text-sm">Total Detected Regions</p>
                        <p className="text-lg font-bold text-gray-900">{data?.summary?.total_detected_regions}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                        <p className="text-orange-800 font-medium text-sm">Slices with Detections</p>
                        <p className="text-lg font-bold text-orange-900">{data?.summary?.slices_with_detections}</p>
                    </div>
                    <div className="bg-lime-50 border border-lime-200 rounded-lg p-4 text-center">
                        <p className="text-lime-800 font-medium text-sm">Total Slices Analyzed</p>
                        <p className="text-lg font-bold text-lime-900">{data?.summary?.total_slices_analyzed}</p>
                    </div>
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center">
                        <p className="text-cyan-800 font-medium text-sm">Pixel to mm Ratio</p>
                     <p className="text-lg font-bold text-cyan-900">
                         {data?.summary?.pixel_to_mm_ratio ? Number(data?.summary?.pixel_to_mm_ratio)?.toFixed(1) : ""}
                    </p>
                    </div>
                </div>
                {/* <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Slice Measurements</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {data?.slice_measurements?.map((trial, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Length</p>
                                        <p className="font-semibold">{trial?.length_mm} mm</p>
                                    </div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Width</p>
                                        <p className="font-semibold">{trial?.width_mm} mm</p>
                                    </div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Area</p>
                                        <p className="font-semibold">{trial?.area_mm2} mm²</p>
                                    </div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Diameter</p>
                                        <p className="font-semibold">{trial?.diameter_mm} mm</p>
                                    </div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Total Regions</p>
                                        <p className="font-semibold">{trial?.total_regions}</p>
                                    </div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Pixel Ratio</p>
                                        <p className="font-semibold">{trial?.pixel_to_mm_ratio}</p>
                                    </div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Slice Index</p>
                                        <p className="font-semibold">{trial?.slice_index}</p>
                                    </div>
                                    <div className="bg-white border rounded p-2 text-center">
                                        <p className="text-gray-500">Slice Number</p>
                                        <p className="font-semibold">{trial?.slice_number}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </CardContent>
        </Card>
    )
}

export default SizingContent

