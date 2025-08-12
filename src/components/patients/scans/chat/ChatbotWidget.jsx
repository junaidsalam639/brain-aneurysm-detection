import {
    useDeleteMessageMutation,
    useGetMessageQuery,
    useSendMessageMutation,
} from "../../../../service/chatApi";
import toast from "react-hot-toast";
import { Button } from "../../../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card";
import { Input } from "../../../ui/Input";
import { MessageSquare, Send, X, Brain, Loader, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function ChatbotWidget({ scanResultData }) {
    const { patient_id, scan_id } = scanResultData || {};
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading: isMessagesLoading } = useGetMessageQuery({
        patient_id,
        scan_id,
    });
    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
    const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [data]);
    useEffect(() => {
        if (isOpen) {
            setTimeout(scrollToBottom, 100);
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;
        try {
            await sendMessage({ inputMessage, patient_id, scan_id }).unwrap();
            setInputMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error(error?.data?.detail?.[0]?.msg || "Failed to send message");
        }
    };

    const handleClearChat = async () => {
        if (!patient_id || !scan_id) return;
        try {
            await deleteMessage({ patient_id, scan_id }).unwrap();
            toast.success("Chat cleared successfully");
        } catch (error) {
            console.error("Failed to clear chat:", error);
            toast.error("Failed to clear chat");
        }
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-14 bg-red-600 hover:bg-red-700 text-white rounded-full
                 w-16 h-16 shadow-lg z-50 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"
                    }`}
                size="icon"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageSquare className="w-6 h-6" />
                )}
            </Button>

            {isOpen && (
                <Card
                    className="fixed bottom-24 right-6 w-96 h-[400px] flex flex-col shadow-xl z-50 border border-gray-200
                    transition-all duration-300 ease-in-out transform animate-slide-up"
                >
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 bg-red-600 text-white rounded-t-lg">
                        <CardTitle className="text-lg font-bold flex items-center">
                            <Brain className="w-5 h-5 mr-2" />
                            Brain Aneurysm Detection
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                            {data?.messages?.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearChat}
                                    disabled={isDeleting}
                                    className="text-white"
                                    title="Clear Chat"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="text-white"
                                title="Close"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {isMessagesLoading ? (
                            <>
                                <div className="flex justify-start">
                                    <div className="w-40 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="w-28 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
                                </div>
                            </>
                        ) : (
                            data?.messages?.map((msg, index) => (
                                <div key={index} className="space-y-2">
                                    {msg?.human && (
                                        <div className="flex justify-end">
                                            <div className="max-w-[75%] p-3 bg-red-600 text-white rounded-lg rounded-br-none shadow-sm">
                                                <ReactMarkdown>{msg?.human}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                    {msg?.ai && (
                                        <div className="flex justify-start">
                                            <div className="max-w-[75%] p-3 bg-gray-200 text-gray-800 rounded-lg rounded-bl-none shadow-sm">
                                                <ReactMarkdown>{msg?.ai}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>

                    <form
                        onSubmit={handleSendMessage}
                        className="p-4 border-t border-gray-200 bg-white"
                    >
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            />
                            <Button
                                disabled={isSending}
                                type="submit"
                                size="icon"
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                {isSending ? (
                                    <Loader className="animate-spin w-4 h-4" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}
        </>
    );
}


