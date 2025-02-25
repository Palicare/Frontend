import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    )
}