
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Activity } from 'lucide-react'

function SummaryContent({ data }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <Activity className="w-6 h-6 mr-2" />
                    Medical Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {data?.comprehensive_summary?.summary_type?.split("_")?.join(" ")}
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div dangerouslySetInnerHTML={{ __html: data?.comprehensive_summary?.medical_summary }} />
                </div>
            </CardContent>
        </Card>
    )
}

export default SummaryContent


