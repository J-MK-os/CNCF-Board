import React, { useState } from "react";
import Intro from "./components/Intro";
import Board from "./components/Board";

function App() {
    const [screen, setScreen] = useState("intro"); // 'intro' | 'board'
    const [user, setUser] = useState({
        username: "guest",
        role: "GUEST",
    });

    const handleEnterGuest = () => {
        setUser({ username: "guest", role: "GUEST" });
        setScreen("board");
    };

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser); // { username, role }
        setScreen("board");
    };

    const handleLogout = () => {
        setUser({ username: "guest", role: "GUEST" });
        setScreen("intro");
    };

    if (screen === "intro") {
        return (
            <Intro
                onEnterGuest={handleEnterGuest}
                onLoginSuccess={handleLoginSuccess}
            />
        );
    }

    return <Board user={user} onLogout={handleLogout} />;
}

export default App;
