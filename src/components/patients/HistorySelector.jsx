"use client"

import { Label } from "../ui/Label"

const historyCategories = {
  "Primary Risk Factors": [
    "hypertension",
    "smoking",
    "family history",
    "previous aneurysm",
    "stroke history",
    "head trauma",
  ],
  "Cardiovascular Conditions": [
    "heart disease",
    "atrial fibrillation",
    "coronary artery disease",
    "atherosclerosis",
    "high cholesterol",
  ],
  "Neurological History": [
    "seizures",
    "migraine",
    "previous brain surgery",
    "subarachnoid hemorrhage",
    "intracerebral hemorrhage",
  ],
  "Medical Conditions": [
    "diabetes",
    "kidney disease",
    "liver disease",
    "blood clotting disorders",
    "autoimmune diseases",
  ],
  "Lifestyle Factors": ["alcohol use", "drug use", "oral contraceptives", "pregnancy"],
  "Surgical History": ["previous neurosurgery", "vascular procedures", "aneurysm clipping", "coiling procedure"],
}

export default function HistorySelector({ selectedHistory, onChange }) {
  const handleToggle = (condition) => {
    if (selectedHistory?.includes(condition)) {
      onChange(selectedHistory?.filter((item) => item !== condition))
    } else {
      onChange([...selectedHistory, condition])
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">📋 Medical History (Optional)</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(historyCategories).map(([category, conditions]) => (
          <div key={category} className="space-y-3">
            <h4 className="font-medium text-gray-800 text-sm">{category}</h4>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div
                  key={condition}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleToggle(condition)}
                >
                  <input
                    type="checkbox"
                    hidden
                    aria-hidden="true"
                    checked={selectedHistory.includes(condition)}
                    readOnly
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center ${selectedHistory?.includes(condition)
                        ? "bg-red-600 border-red-600"
                        : "border-gray-300"
                      }`}
                  >
                    {selectedHistory?.includes(condition) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 capitalize">
                    {condition?.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
