import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { UserContext } from "./context/UserProvider";
import LayoutContainerForm from "./components/LayoutContainerForm";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) return <p>Loading...</p>;

    return (
        <>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />

                <Route path="/" element={<LayoutContainerForm />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
