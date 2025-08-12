/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import {
  X,
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useUploadNiiMutation } from "../../../../service/uploadNiiApi";

export default function UploadModal({ isOpen, onClose, patient }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadNii, { isLoading }] = useUploadNiiMutation();

  if (!isOpen) return null;

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith(".nii")) {
        setUploadError("Please select a .nii file only");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file first");
      return;
    }
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await uploadNii({
        formData,
        patient_id: patient?.id,
      }).unwrap();
      console.log(response, "response");
      setSelectedFile(null);
      setUploadError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    } catch (error) {
      setUploadError("Failed to upload file. Please try again.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.toLowerCase().endsWith(".nii")) {
        setSelectedFile(file);
        setUploadError(null);
      } else {
        setUploadError("Please select a .nii file only");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-red-600 flex items-center">
            <Upload className="w-6 h-6 mr-2" />
            Upload Medical Scan
          </CardTitle>
          {!isLoading && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              selectedFile
                ? "border-red-600 bg-red-50"
                : "border-gray-300 hover:border-red-400"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-2">
                <CheckCircle className="w-8 h-8 text-red-600 mx-auto" />
                <p className="text-sm font-medium text-red-600">
                  File Selected
                </p>
                <p className="text-xs text-gray-600">{selectedFile?.name}</p>
                <p className="text-xs text-gray-500">
                  Size: {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">
                  Drag and drop your .nii file here, or click to browse
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="file-upload"
              className="text-sm font-medium text-gray-700"
            >
              Select .nii File
            </Label>
            <Input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept=".nii"
              onChange={handleFileSelect}
              className="cursor-pointer"
              disabled={isLoading}
            />
          </div>

          {uploadError && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{uploadError}</span>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload & Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
