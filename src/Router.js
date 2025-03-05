import { Route, Routes } from "react-router-dom";
import LoginUser from "./Components/login/loginUser";
import GetSpecificRequest from "./Components/specificRequest/getSpecificRequest";

function RoutesPage() {
    return (
        <Routes>
            <Route path="/" />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/listStudents" element={<GetSpecificRequest />} />
            <Route path="/applications" />
            <Route path="/role" />
        </Routes>
    )
};

export default RoutesPage;