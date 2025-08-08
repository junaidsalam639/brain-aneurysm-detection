import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Textarea } from "../../ui/Textarea";
import { Label } from "../../ui/Label";
import {
    MessageSquare,
    Send,
    CheckCircle,
    Loader2,
} from "lucide-react";
import { useSendFeebackMutation } from "../../../service/sendFeedbackApi";

export default function FeedbackSection({ scanResultData }) {
    const { patient_id, scan_id } = scanResultData || {};
    const [feedback, setFeedback] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sendFeedback, { isLoading }] = useSendFeebackMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) return;
        setIsSubmitted(false);
        try {
            const formData = new FormData();
            formData.append("actual_outcome", feedback);
            await sendFeedback({ formData, patient_id, scan_id }).unwrap();
            setFeedback("");
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to submit feedback:", error);
        }
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Feedback & Comments
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="feedback"
                            className="text-sm font-medium text-gray-700"
                        >
                            Share your feedback about the scan analysis
                        </Label>
                        <Textarea
                            id="feedback"
                            placeholder="Please share your thoughts, suggestions, or any issues you encountered with the scan analysis..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                            className="resize-none"
                            maxLength={500}
                            disabled={isLoading}
                        />
                        <p className="text-xs text-gray-500">
                            {feedback.length}/500 characters
                        </p>
                    </div>

                    {isSubmitted && (
                        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                Thank you! Your feedback has been submitted successfully.
                            </span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={!feedback.trim() || isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Submit Feedback
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
