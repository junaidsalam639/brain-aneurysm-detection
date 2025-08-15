
import { useState } from "react";
import { Button } from "../../../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Eye, Grab, X } from 'lucide-react';
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'


function ExplainabilityContent({ data }) {
    const [gradModal, setGradModal] = useState(false);

    return (
        <>
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
                                <p className="text-blue-900 font-semibold">{data?.image_statistics?.image_dimensions?.join(' × ')}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h4 className="text-green-800 font-medium text-sm mb-2">Voxel Size</h4>
                                <p className="text-green-900 font-semibold">
                                    {data?.image_statistics?.voxel_size?.map((v) => v.toFixed(3)).join(' × ')}
                                </p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h4 className="text-purple-800 font-medium text-sm mb-2">Intensity Range</h4>
                                <p className="text-purple-900 font-semibold">
                                    {data?.image_statistics?.intensity_range[0]} - {data?.image_statistics?.intensity_range[1]}
                                </p>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <h4 className="text-orange-800 font-medium text-sm mb-2">Mean Intensity</h4>
                                <p className="text-orange-900 font-semibold">
                                    {data?.image_statistics?.mean_intensity.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div
                            className="max-w-none [&_h1]:my-3 [&_h2]:my-3 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_p]:text-base"
                            dangerouslySetInnerHTML={{ __html: data?.diagnostic_report_html }}
                        />
                    </div>

                    {data?.gradcam_overlay_b64 && (
                        <div className="flex justify-center items-center">
                            <Button onClick={() => setGradModal(true)}>
                                View GradCAM Visualization
                            </Button>

                        </div>
                    )}
                </CardContent>
            </Card>
            {gradModal &&
                <GradModal
                    data={data}
                    setGradModal={setGradModal}
                />}
        </>
    )
}

export default ExplainabilityContent

function GradModal({ data, setGradModal }) {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="max-w-md w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-red-600 flex items-center">
                            <Grab className="w-6 h-6 mr-2" />
                            GradCAM Visualization
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setGradModal(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <InnerImageZoom
                                src={data?.gradcam_overlay_b64}
                                zoomSrc={data?.gradcam_overlay_b64}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
