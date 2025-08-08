
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import {  DollarSign } from 'lucide-react'


function BillingContent({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-red-600 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2" />
                    Billing Optimization
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggested Medical Codes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-blue-800 font-medium mb-2">ICD-10 Code</h4>
                            <p className="text-2xl font-bold text-blue-900">{data?.suggested_codes["ICD-10"]}</p>
                            <p className="text-sm text-blue-700 mt-1">Cerebral aneurysm, unruptured</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="text-green-800 font-medium mb-2">CPT Code</h4>
                            <p className="text-2xl font-bold text-green-900">{data?.suggested_codes.CPT}</p>
                            <p className="text-sm text-green-700 mt-1">Cerebral angiography procedure</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Code Explanation</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-700 text-sm leading-relaxed">{data?.explanation}</p>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="text-yellow-800 font-medium mb-2">Billing Notice</h4>
                    <p className="text-yellow-700 text-sm">
                        These are AI-suggested codes based on the analysis results. Please verify with your coding specialist
                        and ensure all documentation requirements are met before submitting claims.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Considerations</h3>
                    <div className="space-y-2">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">• Consider additional imaging codes if further studies are performed</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">• Consultation codes may apply for specialist referrals</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">• Document medical necessity for all procedures</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BillingContent
