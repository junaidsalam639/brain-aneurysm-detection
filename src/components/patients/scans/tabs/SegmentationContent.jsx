import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Scissors } from 'lucide-react'
import { ScrollArea } from "../../../ui/scroll-area"

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
                <div className="flex gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 w-1/2">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Region Images</h3>
                        <ScrollArea className="h-64 rounded-md border">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2">
                                {data?.region_images?.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Region ${index + 1}`}
                                            className="w-full h-full object-contain bg-gray-100 rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 w-1/2">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overlapped Images</h3>
                        <ScrollArea className="h-64 rounded-md border">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2">
                                {data?.overlapped_images?.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Overlapped Image ${index + 1}`}
                                            className="w-full h-full object-contain bg-gray-100 rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SegmentationContent
