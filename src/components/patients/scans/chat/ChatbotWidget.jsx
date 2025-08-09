import { useState, useRef, useEffect } from "react"
import { Button } from "../../../ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/Card"
import { Input } from "../../../ui/Input"
import { MessageSquare, Send, X, Bot } from "lucide-react"


export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today regarding medical scans?", sender: "ai" },
    ])
    const [inputMessage, setInputMessage] = useState("")
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (inputMessage.trim()) {
            const newMessage = { text: inputMessage.trim(), sender: "user" }
            setMessages((prevMessages) => [...prevMessages, newMessage])
            setInputMessage("")
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: "Thank you for your message! I'm still learning to process complex queries. How else can I help?",
                        sender: "ai",
                    },
                ])
            }, 1000)
        }
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg z-50"
                size="icon"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </Button>

            {isOpen && (
                <Card className="fixed bottom-24 right-6 w-80 h-[400px] flex flex-col shadow-xl z-50 border border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 bg-red-600 text-white rounded-t-lg">
                        <CardTitle className="text-lg font-bold flex items-center">
                            <Bot className="w-5 h-5 mr-2" />
                            AI Assistant
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-red-700">
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[75%] p-3 rounded-lg shadow-sm ${msg.sender === "user"
                                            ? "bg-red-600 text-white rounded-br-none"
                                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </CardContent>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
                            />
                            <Button type="submit" size="icon" className="bg-red-600 hover:bg-red-700 text-white">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </Card>
            )}
        </>
    )
}
