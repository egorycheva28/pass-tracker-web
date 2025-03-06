import { Route, Routes } from "react-router-dom";
import LoginUser from "./Components/login/loginUser";
import GetUserProfile from "./Components/profil/getUserProfil";
import RegisterUserContainer from "./Components/registration/registerUserContainer";
import ListStudentsContainer from "./Components/teacher/listStudentsContainer";

function RoutesPage() {
    return (
        <Routes>
            <Route path="/" />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/listStudents" />
            <Route path="/applications" />
            <Route path="/role" />
        </Routes>
    )
};

export default RoutesPage;