import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Patientenprofile from "./pages/Patientenprofile";
import Assistant from "./pages/Assistant"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/patientenprofile" element={<Patientenprofile/>}/>
                <Route path="/assistant/:patientId" element={<Assistant/>}/>
            </Routes>
        </Router>
    )
}