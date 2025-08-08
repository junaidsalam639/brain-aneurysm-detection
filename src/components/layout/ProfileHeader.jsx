import { useState, useRef, useEffect } from "react"
import { User, LogOut, ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../redux/authSlice";
import toast from "react-hot-toast";


export default function ProfileHeader() {
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        navigate('/profile')
    }

    const handlerLogout = async () => {
        dispatch(clearAuth());
        toast.success("Successfully Logout");
        navigate("/login")
    }

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <Link to="/patients" className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-red-600"
                    >
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                    </svg>
                    <span className="font-bold text-red-600">Lilia-AI</span>
                </Link>

                <div className="relative" ref={dropdownRef}>
                    <Button
                        variant="ghost"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 hover:bg-red-50 p-2"
                    >
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-gray-700 font-medium">Dr. {user?.username}</span>
                        <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                    </Button>

                    {isDropdownOpen && (
                        <Card className="absolute right-0 top-full mt-2 w-48 shadow-lg border border-gray-200 z-50">
                            <div className="py-2">
                                <button
                                    onClick={handleProfileClick}
                                    className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-gray-700"
                                >
                                    <User className="w-4 h-4 text-red-600" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handlerLogout}
                                    className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-gray-700"
                                >
                                    <LogOut className="w-4 h-4 text-red-600" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </header>
    )
}
