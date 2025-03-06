import { Route, Routes } from "react-router-dom";
import LoginUser from "./Components/login/loginUser";
import RegisterUserContainer from "./Components/registration/registerUserContainer";
import ListStudentsContainer from "./Components/teacher/listStudentsContainer";
import GetUserProfile from "./Components/profil/getUserProfil";

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