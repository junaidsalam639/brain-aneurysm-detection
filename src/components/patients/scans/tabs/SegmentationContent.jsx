import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Scissors } from 'lucide-react'

function SegmentationContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Scissors className="w-6 h-6 mr-2" />
                    Image Segmentation Results
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-800 font-medium">Total Slice Indices</p>
                            <p className="text-2xl font-bold text-blue-900">{data?.slice_indices?.length}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800 font-medium">Processed Images</p>
                            <p className="text-2xl font-bold text-green-900">{data?.region_images?.length}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sample Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data?.region_images?.slice(0, 2).map((image, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Region Image {index + 1}</h4>
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Region ${index + 1}`}
                                    className="w-full h-48 object-contain bg-gray-100 rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Slice Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Analyzed slice indices range from {Math.min(...data?.slice_indices)} to {Math.max(...data?.slice_indices)}</p>
                        <p className="text-sm text-gray-600 mt-1">Total slices processed: {data?.slice_indices?.length}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default SegmentationContent