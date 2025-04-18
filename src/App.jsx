import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import DetailViewPage from "./pages/DetailViewPage";
import Patientenprofile from "./pages/Patientenprofile";
import AddUserPage from "./pages/AddUserPage";
import CameraView from "./pages/CameraView";

 

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/detailView/:patientId" element={<DetailViewPage/>}/>
                <Route path="/patientenprofile" element={<Patientenprofile/>}/>
                <Route path="/addUser" element={<AddUserPage/>}/>                          
                <Route path="/addUser/camera/" element={<CameraView/>}/>
            </Routes>
        </Router>
    )
}