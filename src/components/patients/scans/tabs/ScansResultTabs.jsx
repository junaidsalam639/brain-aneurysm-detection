import { useState } from "react"
import { Card } from "../../../ui/Card"
import { FileText, Brain, Scissors, Ruler, Shield, Eye, Stethoscope, Pill, AlertTriangle, DollarSign, FlaskConical, MessageSquare } from 'lucide-react'
import ScanIntakeContent from "./ScanIntakeContent"
import ClassificationContent from "./ClassificationContent"
import SegmentationContent from "./SegmentationContent"
import SizingContent from "./SizingContent"
import BiasDetectionContent from "./BiasDetectionContent"
import ExplainabilityContent from "./ExplainabilityContent"
import ClinicalContextContent from "./ClinicalContextContent"
import TreatmentContent from "./TreatmentContent"
import RuptureRiskContent from "./RuptureRiskContent"
import BillingContent from "./BillingContent"
import ClinicalTrialsContent from "./ClinicalTrialsContent"
import FeedbackSection from "./FeedbackSection"
import PageLoader from "../../../ui/PageLoader"
import ChatbotWidget from "../chat/ChatbotWidget"

export default function ScansResultTabs({ scanResultData, isLoading }) {
    const [activeTab, setActiveTab] = useState("scan_intake_agent");

    const tabs = [
        { id: "scan_intake_agent", label: "Scan Intake", icon: FileText },
        { id: "classification_agent", label: "Classification", icon: Brain },
        { id: "segmentation_agent", label: "Segmentation", icon: Scissors },
        { id: "sizing_agent", label: "Sizing", icon: Ruler },
        { id: "bias_detection_agent", label: "Bias Detection", icon: Shield },
        { id: "explainability_agent", label: "Explainability", icon: Eye },
        { id: "clinical_context_agent", label: "Clinical Context", icon: Stethoscope },
        { id: "treatment_recommendations", label: "Treatment", icon: Pill },
        { id: "rupture_risk_agent", label: "Rupture Risk", icon: AlertTriangle },
        { id: "billing_optimization_agent", label: "Billing", icon: DollarSign },
        { id: "clinical_trials_matching_agent", label: "Clinical Trials", icon: FlaskConical },
        { id: "feed_back", label: "Feed Back", icon: MessageSquare }
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case "scan_intake_agent":
                return <ScanIntakeContent data={scanResultData?.ai_result?.scan_intake_agent} />
            case "classification_agent":
                return <ClassificationContent data={scanResultData?.ai_result?.classification_agent} />
            case "segmentation_agent":
                return <SegmentationContent data={scanResultData?.ai_result?.segmentation_agent} />
            case "sizing_agent":
                return <SizingContent data={scanResultData?.ai_result?.sizing_agent} />
            case "bias_detection_agent":
                return <BiasDetectionContent data={scanResultData?.ai_result?.bias_detection_agent} />
            case "explainability_agent":
                return <ExplainabilityContent data={scanResultData?.ai_result?.explainability_agent} />
            case "clinical_context_agent":
                return <ClinicalContextContent data={scanResultData?.ai_result?.clinical_context_agent} />
            case "treatment_recommendations":
                return <TreatmentContent data={scanResultData?.ai_result?.treatment_recommendations} />
            case "rupture_risk_agent":
                return <RuptureRiskContent data={scanResultData?.ai_result?.rupture_risk_agent} />
            case "billing_optimization_agent":
                return <BillingContent data={scanResultData?.ai_result?.billing_optimization_agent} />
            case "clinical_trials_matching_agent":
                return <ClinicalTrialsContent data={scanResultData?.ai_result?.clinical_trials_matching_agent} />
            case "feed_back":
                return <FeedbackSection scanResultData={scanResultData} />
            default:
                return <div>Select a tab to view data</div>
        }
    }

    if (isLoading) {
        return <PageLoader />
    }

    console.log(scanResultData, 'scanResultData')

    return (
        <>
            <Card className="p-4">
                <div className="space-y-2 grid md:grid-cols-6 gap-2 justify-center items-baseline">
                    {tabs?.map((tab) => {
                        const Icon = tab?.icon
                        return (
                            <button
                                key={tab?.id}
                                onClick={() => setActiveTab(tab?.id)}
                                className={`w-full bg-gray-100 h-12 text-left p-3 rounded-lg transition-all flex items-center space-x-3 ${activeTab === tab?.id
                                    ? "bg-red-50 text-red-700 border-l-4 border-red-600"
                                    : "text-gray-700"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{tab?.label}</span>
                            </button>
                        )
                    })}
                </div>

                <div className="rounded-lg transition-all border-t-4 border-red-600 my-4" />

                <div className="">
                    {renderTabContent()}
                </div>
            </Card>
            <ChatbotWidget scanResultData={scanResultData} />
        </>
    )
}

