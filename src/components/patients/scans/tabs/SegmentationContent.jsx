import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Scissors } from 'lucide-react'
import { ScrollArea } from "../../../ui/scroll-area";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";


function SegmentationContent({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const allImages = [
        ...(data?.region_images || []),
        ...(data?.overlapped_images || []),
        ...(data?.scan_frames || []),
    ];

    const openImage = (image) => {
        setPhotoIndex(allImages?.indexOf(image));
        setIsOpen(true);
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

                {isOpen && (
                    <Lightbox
                        mainSrc={allImages[photoIndex]}
                        nextSrc={allImages[(photoIndex + 1) % allImages?.length]}
                        prevSrc={allImages[(photoIndex + allImages?.length - 1) % allImages?.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex(
                                (photoIndex + allImages?.length - 1) % allImages?.length
                            )
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % allImages?.length)
                        }
                    />
                )}
            </CardContent>

        </Card>
    )
}

export default SegmentationContent
