import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { FlaskConical } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Badge } from "../../../ui/badge"

function ClinicalTrialsContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <FlaskConical className="w-6 h-6 mr-2" />
                    Clinical Trials Matching
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <h4 className="text-blue-800 font-medium text-sm">Total Matches</h4>
                        <p className="text-3xl font-bold text-blue-900">{data?.total_matches}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <h4 className="text-green-800 font-medium text-sm">Top Match Score</h4>
                        <p className="text-3xl font-bold text-green-900">{data?.top_match.match_score}%</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Match</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="text-green-800 font-bold mb-2">{data?.top_match.title}</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-green-700">NCT ID:</span>
                                <span className="font-semibold">{data?.top_match.nct_id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-700">Status:</span>
                                <Badge className="bg-green-600 text-white text-xs">{data?.top_match.status}</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-700">Phase:</span>
                                <span className="font-semibold">{data?.top_match.phase}</span>
                            </div>
                            <p className="text-green-700 mt-2">
                                <strong>Match Reason:</strong> {data?.top_match.primary_reason}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">All Matching Trials</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {data?.trials.map((trial, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-gray-800 font-medium text-sm flex-1 mr-2">{trial.title}</h4>
                                    <Badge className="bg-blue-100 text-blue-800 text-xs">{trial.match_score}%</Badge>
                                </div>
                                <div className="space-y-1 text-xs text-gray-600">
                                    <div className="flex justify-between">
                                        <span>NCT ID:</span>
                                        <span className="font-semibold">{trial.nct_id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Status:</span>
                                        <span className="font-semibold">{trial.status}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Location:</span>
                                        <span className="font-semibold">{trial.location}</span>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <a
                                        href={trial.clinicaltrials_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-600 hover:text-red-700 text-xs font-medium"
                                    >
                                        View on ClinicalTrials.gov →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 text-sm">{data?.summary}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}



export default ClinicalTrialsContent