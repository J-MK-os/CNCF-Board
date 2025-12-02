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

        // 하드코딩 로그인
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

    // --- 스타일 정의 ---
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f4f6f8",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: "20px",
        },
        card: {
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
        },
        title: {
            color: "#2d3748",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "10px",
        },
        description: {
            color: "#718096",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "30px",
        },
        techStack: {
            display: "inline-block",
            backgroundColor: "#ebf8ff",
            color: "#3182ce",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "5px",
        },
        buttonGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        guestBtn: {
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
            transition: "background 0.2s",
        },
        adminToggleBtn: {
            backgroundColor: "transparent",
            color: "#718096",
            border: "1px solid #cbd5e0",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
        },
        loginBox: {
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f7fafc",
            borderRadius: "8px",
            border: "1px solid #edf2f7",
            textAlign: "left",
            animation: "fadeIn 0.3s ease-in-out",
        },
        loginTitle: {
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#4a5568",
            textAlign: "center",
        },
        input: {
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
            marginBottom: "10px",
            fontSize: "14px",
            boxSizing: "border-box",
            outline: "none",
        },
        loginBtn: {
            backgroundColor: "#2d3748",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            marginTop: "5px",
        },
        errorMessage: {
            color: "#e53e3e",
            fontSize: "13px",
            marginTop: "10px",
            textAlign: "center",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>CNCF Team Project</h1>
                
                <div style={{ marginBottom: "20px" }}>
                    <span style={styles.techStack}>Spring Boot</span>{" "}
                    <span style={styles.techStack}>React</span>{" "}
                    <span style={styles.techStack}>K8s</span>{" "}
                    <span style={styles.techStack}>ArgoCD</span>
                </div>

                <p style={styles.description}>
                    Cloud Native 환경에서 구축된<br />
                    보안 및 확장성 중심의 게시판 서비스입니다.
                </p>

                <div style={styles.buttonGroup}>
                    <button 
                        style={styles.guestBtn} 
                        onClick={onEnterGuest}
                    >
                        게스트로 입장하기
                    </button>

                    <button
                        style={styles.adminToggleBtn}
                        onClick={() => setShowLogin((v) => !v)}
                    >
                        {showLogin ? "로그인 창 닫기" : "관리자 로그인"}
                    </button>
                </div>

                {showLogin && (
                    <div style={styles.loginBox}>
                        <h3 style={styles.loginTitle}>Admin Login</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="username"
                                placeholder="아이디 (admin)"
                                value={loginForm.username}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="비밀번호 (admin1234)"
                                value={loginForm.password}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <button type="submit" style={styles.loginBtn}>
                                로그인 확인
                            </button>
                            {loginError && (
                                <p style={styles.errorMessage}>
                                    {loginError}
                                </p>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Intro;
