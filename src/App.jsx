import { BrowserRouter } from "react-router"
import { useEffect } from "react"
import AppRoutes from "./routes"
import { useDispatch } from "react-redux"

function App() {
const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(clearAuth());
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);
  
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

    </>
  )
}

export default App
