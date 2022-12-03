import { Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login/Login.jsx";
import Register from "./components/Pages/Register/Register.jsx";
import "./App.css";
import Home from "./components/Pages/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Explore from "./components/Pages/Explore/Explore.jsx";
import Profile from "./components/Pages/Profile/Profile.jsx";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/explore"
                element={
                    <Layout>
                        <Explore />
                    </Layout>
                }
            />
            <Route
                path="/profile/:id"
                element={
                    <Layout>
                        <Profile />
                    </Layout>
                }
            />
        </Routes>
    );
}

export default App;
