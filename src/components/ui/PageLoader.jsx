import { Loader2 } from "lucide-react";

export default function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
                <p className="text-red-600 text-sm font-medium">Loading, please wait...</p>
            </div>
        </div>
    );
}
