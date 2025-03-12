import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import DetailViewPage from "./pages/DetailViewPage";
import Patientenprofile from "./pages/Patientenprofile";
import Assistant from "./pages/Assistant"
import AddUserPage from "./pages/AddUserPage";



export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/detailView/:patientId" element={<DetailViewPage/>}/>
                <Route path="/patientenprofile" element={<Patientenprofile/>}/>
                <Route path="/assistant/:patientId" element={<Assistant/>}/>
                <Route path="/adduser" element={<AddUserPage/>}/>                          
            </Routes>
        </Router>
    )
}