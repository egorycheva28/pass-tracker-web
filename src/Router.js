import { Route, Routes } from "react-router-dom";
import LoginUser from "./Components/login/loginUser";
import RegisterUserContainer from "./Components/registration/registerUserContainer";
import ListStudentsContainer from "./Components/teacher/listStudentsContainer";
import GetUserProfile from "./Components/profil/getUserProfil";
import ApprovedApplicationsContainer from "./Components/deanery/approvedApplicationContainer";
import UnapprovedApplicationsContainer from "./Components/dean/unapprovedContainer";

function RoutesPage() {
    return (
        <Routes>
            <Route path="/" element={<ListStudentsContainer />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/profile" element={<GetUserProfile />} />
            <Route path="/registration" element={<RegisterUserContainer />} />
            <Route path="/listStudents" element={<ListStudentsContainer />} />
            <Route path="/approvedApplications" element={<ApprovedApplicationsContainer/>} />
            <Route path="/applications" element={<UnapprovedApplicationsContainer/>}/>
            <Route path="/detail/:id" element={<GetUserProfile/>}/>
            <Route path="/role" />
        </Routes>
    )
};

export default RoutesPage;