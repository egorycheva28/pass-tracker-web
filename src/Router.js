import { Route, Routes } from "react-router-dom";
import LoginUser from "./Components/login/loginUser";
import GetUserProfile from "./Components/profil/getUserProfil";
import RegisterUser from "./Components/registration/registerUser";

function RoutesPage() {
    return (
        <Routes>
            <Route path="/" />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/listStudents"element={<GetUserProfile />} />
            <Route path="/applications"  element={<RegisterUser />}/>
            <Route path="/role" />
        </Routes>
    )
};

export default RoutesPage;