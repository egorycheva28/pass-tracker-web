import React from "react";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import RoutesPage from "./Router";

function MainPage() {
    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Navbar />
                <RoutesPage />
            </Layout>
        </BrowserRouter>
    )
};

export default MainPage;