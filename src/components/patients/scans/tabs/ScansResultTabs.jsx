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
import SummaryContent from "./SummaryContent"

export default function ScansResultTabs({ scanResultData, isLoading, activeTab, setActiveTab }) {

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
            case "medical_summary_agent":
                return <SummaryContent data={scanResultData?.ai_result?.medical_summary_agent} />
            case "feed_back":
                return <FeedbackSection scanResultData={scanResultData} />
            default:
                return <div>Select a tab to view data</div>
        }
    }

    const filteredTabs = [
        scanResultData?.ai_result?.scan_intake_agent && {
            id: "scan_intake_agent",
            label: "Scan Intake",
            icon: FileText,
            content: <ScanIntakeContent data={scanResultData.ai_result.scan_intake_agent} />,
        },
        scanResultData?.ai_result?.classification_agent && {
            id: "classification_agent",
            label: "Classification",
            icon: Brain,
            content: <ClassificationContent data={scanResultData.ai_result.classification_agent} />,
        },
        scanResultData?.ai_result?.segmentation_agent && {
            id: "segmentation_agent",
            label: "Segmentation",
            icon: Scissors,
            content: <SegmentationContent data={scanResultData.ai_result.segmentation_agent} />,
        },
        scanResultData?.ai_result?.sizing_agent && {
            id: "sizing_agent",
            label: "Sizing",
            icon: Ruler,
            content: <SizingContent data={scanResultData.ai_result.sizing_agent} />,
        },
        scanResultData?.ai_result?.clinical_context_agent && {
            id: "clinical_context_agent",
            label: "Clinical Context",
            icon: Stethoscope,
            content: <ClinicalContextContent data={scanResultData.ai_result.clinical_context_agent} />,
        },
        scanResultData?.ai_result?.treatment_recommendations && {
            id: "treatment_recommendations",
            label: "Treatment",
            icon: Pill,
            content: <TreatmentContent data={scanResultData.ai_result.treatment_recommendations} />,
        },
        scanResultData?.ai_result?.bias_detection_agent && {
            id: "bias_detection_agent",
            label: "Bias Detection",
            icon: Shield,
            content: <BiasDetectionContent data={scanResultData.ai_result.bias_detection_agent} />,
        },
        scanResultData?.ai_result?.explainability_agent && {
            id: "explainability_agent",
            label: "Explainability",
            icon: Eye,
            content: <ExplainabilityContent data={scanResultData.ai_result.explainability_agent} />,
        },
        scanResultData?.ai_result?.rupture_risk_agent && {
            id: "rupture_risk_agent",
            label: "Rupture Risk",
            icon: AlertTriangle,
            content: <RuptureRiskContent data={scanResultData.ai_result.rupture_risk_agent} />,
        },
        scanResultData?.ai_result?.clinical_trials_matching_agent && {
            id: "clinical_trials_matching_agent",
            label: "Clinical Trials",
            icon: FlaskConical,
            content: <ClinicalTrialsContent data={scanResultData.ai_result.clinical_trials_matching_agent} />,
        },
        scanResultData?.ai_result?.billing_optimization_agent && {
            id: "billing_optimization_agent",
            label: "Billing Optimization",
            icon: DollarSign,
            content: <BillingContent data={scanResultData.ai_result.billing_optimization_agent} />,
        },
        scanResultData?.ai_result?.medical_summary_agent && {
            id: "medical_summary_agent",
            label: "Medical Summary",
            icon: FileText,
            content: <SummaryContent data={scanResultData.ai_result.medical_summary_agent} />,
        },
        {
            id: "feed_back",
            label: "Feedback",
            icon: MessageSquare,
            content: <FeedbackSection scanResultData={scanResultData} />,
        },
    ].filter(Boolean);


    if (isLoading) {
        return <PageLoader />
    }


    return (
        <>
            <Card className="p-4">
                <div className="space-y-2 grid md:grid-cols-5 gap-2 justify-center items-baseline">
                    {filteredTabs?.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-nowrap bg-gray-100 h-12 text-left p-3 rounded-lg transition-all flex items-center space-x-3 ${activeTab === tab.id
                                    ? "bg-red-50 text-red-700 border-l-4 border-red-600"
                                    : "text-gray-700"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{tab.label}</span>
                            </button>
                        );
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

