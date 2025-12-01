import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

const API_BASE = "http://localhost:8080"; 

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
            setError(
                err.message || "게시글을 불러오는 중 오류가 발생했습니다."
            );
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
                // 💡 서버에서 400 Bad Request가 왔을 때 (서버리스 필터링 실패)
                const errorBody = await res.json();
                
                // 💡 1. 서버가 보낸 message 필드를 추출하여 에러 메시지로 사용
                if (errorBody && errorBody.message) {
                    throw new Error(errorBody.message);
                }
                
                // 💡 2. 일반적인 HTTP 오류 메시지 (404 등)
                throw new Error(`Failed to save post: ${res.status}`);
            }

            setForm({ title: "", content: "", author: "" });
            setEditingId(null);
            // 💡 중요: POST/PUT 성공 시에만 목록을 다시 불러옵니다.
            await loadPosts(); 
        } catch (err) {
            console.error(err);
            // 💡 catch 블록이 이제 서버에서 보낸 메시지를 출력합니다.
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
    };

    const handleDelete = async (id) => {
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

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <div>
                    <h1>게시판</h1>
                    <div>
                        <strong>현재 사용자:</strong>{" "}
                        {user.username} ({user.role})
                        {user.role === "ADMIN" && " · 관리자 권한으로 삭제 가능"}
                    </div>
                </div>
                <div>
                    <button onClick={onLogout}>로그아웃</button>
                </div>
            </header>

            <PostForm
                form={form}
                editingId={editingId}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
            />

            {loading && <p>로딩 중...</p>}
            {error && (
                <p style={{ color: "red", whiteSpace: "pre-line" }}>{error}</p>
            )}

            <PostList
                posts={posts}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {!loading && posts.length === 0 && (
                <p>등록된 게시글이 없습니다. 첫 글을 작성해 보세요.</p>
            )}
        </div>
    );
}

export default Board;
