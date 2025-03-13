import { Route, Routes } from "react-router-dom";
import LoginUser from "./Components/login/loginUser";
import RegisterUserContainer from "./Components/registration/registerUserContainer";
import ListStudentsContainer from "./Components/teacher/listStudentsContainer";
import GetUserProfile from "./Components/profil/getUserProfil";
import ApprovedApplicationsContainer from "./Components/deanery/firstPage/approvedApplicationContainer";
import UnapprovedApplicationsContainer from "./Components/deanery/secondPage/unapprovedContainer";
import RoleContainer from "./Components/deanery/thirdPage/roleContainer";
import ProfileById from "./Components/profil/profileById";

function RoutesPage() {
    return (
        <Routes>
            <Route path="/" element={<LoginUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/profile" element={<GetUserProfile />} />
            <Route path="/registration" element={<RegisterUserContainer />} />
            <Route path="/listStudents" element={<ListStudentsContainer />} />
            <Route path="/approvedApplications" element={<ApprovedApplicationsContainer/>} />
            <Route path="/unapprovedApplications" element={<UnapprovedApplicationsContainer/>}/>
            <Route path="/detail/:id" element={<GetUserProfile/>}/>
            <Route path="/profile/:id" element={<ProfileById/>}/>
            <Route path="/role" element={<RoleContainer/>}/>
        </Routes>
    )
};

export default RoutesPage;