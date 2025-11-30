import React from "react";

function PostList({ posts, user, onEdit, onDelete }) {
    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map((p) => (
                <li
                    key={p.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: 10,
                        marginBottom: 8,
                    }}
                >
                    <h3>{p.title}</h3>
                    <p>{p.content}</p>
                    <small>작성자: {p.author}</small>
                    <div style={{ marginTop: 8 }}>
                        <button onClick={() => onEdit(p)}>수정</button>

                        {user.role === "ADMIN" ? (
                            <button
                                onClick={() => onDelete(p.id)}
                                style={{ marginLeft: 8 }}
                            >
                                삭제
                            </button>
                        ) : (
                            <button
                                disabled
                                title="관리자만 삭제할 수 있습니다."
                                style={{
                                    marginLeft: 8,
                                    opacity: 0.5,
                                    cursor: "not-allowed",
                                }}
                            >
                                삭제 (관리자 전용)
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default PostList;
