import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import DetailViewPage from "./pages/DetailViewPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/detailView" element={<DetailViewPage/>}/>
            </Routes>
        </Router>
    )
}