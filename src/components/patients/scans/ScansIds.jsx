import { Card } from "../../ui/Card";
import { ScanEye, Upload } from "lucide-react";
import { Button } from "../../ui/Button";
import { Skeleton } from "../../ui/skeleton";
import { useState } from "react";
import UploadModal from "./upload/UploadModal";
import {
  useGetScansQuery,
  useLazyGetScansResultQuery,
} from "../../../service/scanApi";
import ScansResultTabs from "./tabs/ScansResultTabs";
import { useDispatch, useSelector } from "react-redux";
import { setScanId } from "../../../redux/scanIdSlice";

export default function ScansIds({ patient }) {
  const dispatch = useDispatch();
  const { scanId } = useSelector((state) => state.scanId);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const { data: scanData, isLoading } = useGetScansQuery({
    patient_id: patient?.id,
  });
  const [triggerScanResult, { data: scanResultData }] =
    useLazyGetScansResultQuery();

  if (isLoading) {
    return (
      <Card className="p-4 mt-4">
        <div className="grid md:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  const handleTabClick = async (scanId) => {
    dispatch(setScanId(scanId));
    setLocalLoading(true);
    try {
      await triggerScanResult(
        { patient_id: patient?.id, scan_id: scanId },
        { forceRefetch: true }
      );
    } catch (error) {
      console.error("Failed to fetch scan result:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <>
      <Card className="p-4 my-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-red-600">
              Medical Scan Analysis
            </h1>
            <p className="text-gray-600">
              Advanced AI-powered medical scan processing
            </p>
          </div>
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload New Scan
          </Button>
        </div>
        {scanData?.scans?.length > 0 && (
          <div className="mt-4 space-y-2 grid md:grid-cols-6 gap-2 justify-center items-baseline">
            {scanData?.scans?.map((scan) => (
              <button
                key={scan?.scan_id}
                onClick={() => handleTabClick(scan?.scan_id)}
                className={`w-full p-3 rounded-lg flex h-12 items-center space-x-3 text-sm font-medium transition-all
                ${scanId === scan?.scan_id ? "bg-red-50 text-red-700 border-l-4 border-red-600"
                  : "bg-gray-100 text-gray-700"}`}>
                <ScanEye className="w-5 h-5" />
                <span>ID: {scan?.scan_id}</span>
              </button>
            ))}
          </div>
        )}
      </Card>

      {scanId && (
        <ScansResultTabs
          scanResultData={scanResultData}
          isLoading={localLoading}
        />
      )}

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        patient={patient}
      />
    </>
  );
}
