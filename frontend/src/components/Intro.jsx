import React, { useState } from "react";

function Intro({ onEnterGuest, onLoginSuccess }) {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [loginError, setLoginError] = useState("");
    const [showLogin, setShowLogin] = useState(false);

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ⚠️ 데모용 하드코딩 로그인 (나중에 백엔드 연동으로 교체 예정)
        if (
            loginForm.username === "admin" &&
            loginForm.password === "admin1234"
        ) {
            onLoginSuccess({
                username: "admin",
                role: "ADMIN",
            });
            setLoginError("");
        } else {
            setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
            <h1>CNCF 팀 프로젝트 발표</h1>
            <p>
                Spring Boot + React + PostgreSQL + Docker를 활용한
                <br />
                CNCF 게시판 데모 페이지입니다.
            </p>

            <div style={{ marginTop: 24 }}>
                <button onClick={onEnterGuest}>게스트로 입장하기</button>

                <button
                    style={{ marginLeft: 12 }}
                    onClick={() => setShowLogin((v) => !v)}
                >
                    관리자 로그인
                </button>
            </div>

            {showLogin && (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        marginTop: 16,
                        padding: 12,
                        border: "1px solid #ddd",
                        maxWidth: 320,
                    }}
                >
                    <h3>관리자 로그인</h3>
                    <input
                        name="username"
                        placeholder="아이디"
                        value={loginForm.username}
                        onChange={handleChange}
                        style={{ width: "100%", marginBottom: 8 }}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={loginForm.password}
                        onChange={handleChange}
                        style={{ width: "100%", marginBottom: 8 }}
                    />
                    <button type="submit">로그인</button>
                    {loginError && (
                        <p style={{ color: "red", marginTop: 8 }}>
                            {loginError}
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}

export default Intro;
