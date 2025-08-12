import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card";
import { Scissors } from "lucide-react";
import { ScrollArea } from "../../../ui/scroll-area";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

function SegmentationContent({ data }) {
    const [photoIndex, setPhotoIndex] = useState(-1);

    const allImages = [
        ...(data?.region_images || []),
        ...(data?.overlapped_images || []),
        ...(data?.scan_frames || []),
    ];

    const openImage = (image) => {
        setPhotoIndex(allImages.indexOf(image));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Scissors className="w-6 h-6 mr-2" />
                    Image Segmentation Results
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <ScrollArea className="h-96 rounded-md border">
                    <div className="flex gap-4">
                        <div className="p-4 w-1/3">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Region Images
                            </h3>
                            <div className="grid grid-cols-1 gap-4 p-2">
                                {data?.region_images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image || "/placeholder.svg"}
                                        alt={`Region ${index + 1}`}
                                        className="w-full h-full object-contain bg-gray-100 rounded cursor-pointer"
                                        onClick={() => openImage(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="p-4 w-1/3">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Overlapped Images
                            </h3>
                            <div className="grid grid-cols-1 gap-4 p-2">
                                {data?.overlapped_images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image || "/placeholder.svg"}
                                        alt={`Overlapped Image ${index + 1}`}
                                        className="w-full h-full object-contain bg-gray-100 rounded cursor-pointer"
                                        onClick={() => openImage(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="p-4 w-1/3">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Scan Frames
                            </h3>
                            <div className="grid grid-cols-1 gap-4 p-2">
                                {data?.scan_frames?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image || "/placeholder.svg"}
                                        alt={`Scan Frame ${index + 1}`}
                                        className="w-full h-full object-contain bg-gray-100 rounded cursor-pointer"
                                        onClick={() => openImage(image)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <Lightbox
                    open={photoIndex >= 0}
                    index={photoIndex}
                    close={() => setPhotoIndex(-1)}
                    slides={allImages.map((src) => ({ src }))}
                    plugins={[Fullscreen, Zoom]}
                    zoom={{
                        maxZoomPixelRatio: 5, 
                        zoomInLabel: "Zoom In",
                        zoomOutLabel: "Zoom Out", 
                        scrollToZoom: true, 
                    }}
                />

            </CardContent>
        </Card>
    );
}

export default SegmentationContent;
