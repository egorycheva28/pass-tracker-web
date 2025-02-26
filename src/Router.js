import { Route, Routes } from "react-router-dom";

function RoutesPage() {
    return (
        <Routes>
            <Route path="/" />
            <Route path="/login" />
            <Route path="/listStudents" />
            <Route path="/applications" />
            <Route path="/role" />
        </Routes>
    )
};

export default RoutesPage;