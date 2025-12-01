import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

const API_BASE = "";

function Board({ user, onLogout }) {
    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({
        title: "",
        content: "",
        author: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${API_BASE}/api/posts`);
            if (!res.ok) {
                throw new Error(`Failed to fetch posts: ${res.status}`);
            }

            const data = await res.json();
            const list = Array.isArray(data) ? data : data.content || [];
            setPosts(list);
        } catch (err) {
            console.error(err);
            setError(err.message || "게시글을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `${API_BASE}/api/posts/${editingId}`
            : `${API_BASE}/api/posts`;

        try {
            setError(null);
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errorBody = await res.json();
                if (errorBody && errorBody.message) {
                    throw new Error(errorBody.message);
                }
                throw new Error(`Failed to save post: ${res.status}`);
            }

            setForm({ title: "", content: "", author: "" });
            setEditingId(null);
            await loadPosts();
        } catch (err) {
            console.error(err);
            setError(err.message || "게시글 저장 중 오류가 발생했습니다.");
        }
    };

    const handleEdit = (post) => {
        setEditingId(post.id);
        setForm({
            title: post.title,
            content: post.content,
            author: post.author,
        });
        // 폼이 있는 상단으로 스크롤 이동 부드럽게
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            setError(null);
            const res = await fetch(`${API_BASE}/api/posts/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error(`Failed to delete post: ${res.status}`);
            }

            await loadPosts();
        } catch (err) {
            console.error(err);
            setError(err.message || "게시글 삭제 중 오류가 발생했습니다.");
        }
    };

    // --- 스타일 정의 (Inline Styles) ---
    const styles = {
        container: {
            backgroundColor: "#f4f6f8",
            minHeight: "100vh",
            padding: "40px 20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        card: {
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
        },
        header: {
            backgroundColor: "#2d3748", // Dark Navy
            color: "#ffffff",
            padding: "20px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            margin: 0,
            fontSize: "24px",
            fontWeight: "600",
        },
        userInfo: {
            display: "flex",
            alignItems: "center",
            gap: "15px",
            fontSize: "14px",
        },
        badge: {
            backgroundColor: "#4a5568",
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
            color: "#e2e8f0",
        },
        logoutBtn: {
            backgroundColor: "#e53e3e",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background 0.2s",
        },
        contentArea: {
            padding: "30px",
        },
        errorBox: {
            backgroundColor: "#fff5f5",
            border: "1px solid #feb2b2",
            color: "#c53030",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            whiteSpace: "pre-line",
        },
        loading: {
            textAlign: "center",
            color: "#718096",
            padding: "20px",
        },
        emptyState: {
            textAlign: "center",
            color: "#a0aec0",
            marginTop: "40px",
            padding: "40px",
            backgroundColor: "#f7fafc",
            borderRadius: "8px",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* 헤더 영역 */}
                <header style={styles.header}>
                    <h1 style={styles.title}>CNCF Team Project</h1>
                    <div style={styles.userInfo}>
                        <span>
                            Welcome, <strong>{user.username}</strong>
                        </span>
                        <span style={styles.badge}>{user.role}</span>
                        <button
                            style={styles.logoutBtn}
                            onClick={onLogout}
                        >
                            로그아웃
                        </button>
                    </div>
                </header>

                {/* 콘텐츠 영역 */}
                <div style={styles.contentArea}>

                    {/* 에러 메시지 */}
                    {error && (
                        <div style={styles.errorBox}>
                            <strong>⚠️ Error:</strong> {error}
                        </div>
                    )}

                    {/* 입력 폼 (PostForm 컴포넌트) */}
                    <div style={{ marginBottom: "40px" }}>
                        <PostForm
                            form={form}
                            editingId={editingId}
                            onChange={handleFormChange}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    <hr style={{ border: "0", borderTop: "1px solid #e2e8f0", margin: "30px 0" }} />

                    {/* 로딩 표시 */}
                    {loading && <p style={styles.loading}>데이터를 불러오는 중입니다...</p>}

                    {/* 게시글 목록 (PostList 컴포넌트) */}
                    <PostList
                        posts={posts}
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* 게시글 없음 표시 */}
                    {!loading && posts.length === 0 && (
                        <div style={styles.emptyState}>
                            <p>등록된 게시글이 없습니다. 첫 글을 작성해 보세요!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Board;