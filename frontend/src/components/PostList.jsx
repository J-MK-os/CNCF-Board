import React from "react";

function PostList({ posts, user, onEdit, onDelete }) {
    const styles = {
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // 반응형 카드 배치
            gap: "20px",
        },
        card: {
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.2s, box-shadow 0.2s",
        },
        cardHeader: {
            marginBottom: "10px",
            borderBottom: "1px solid #edf2f7",
            paddingBottom: "10px",
        },
        title: {
            fontSize: "18px",
            fontWeight: "700",
            color: "#2d3748",
            margin: "0 0 5px 0",
        },
        author: {
            fontSize: "12px",
            color: "#718096",
        },
        content: {
            fontSize: "14px",
            color: "#4a5568",
            lineHeight: "1.6",
            marginBottom: "20px",
            whiteSpace: "pre-wrap", // 줄바꿈 유지
            flexGrow: 1, // 내용이 적어도 버튼을 아래로 밀어냄
        },
        buttonGroup: {
            display: "flex",
            gap: "10px",
            marginTop: "auto", // 하단 고정
        },
        editBtn: {
            flex: 1,
            padding: "8px",
            border: "1px solid #3182ce",
            backgroundColor: "white",
            color: "#3182ce",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "13px",
        },
        deleteBtn: {
            flex: 1,
            padding: "8px",
            border: "1px solid #e53e3e",
            backgroundColor: "white",
            color: "#e53e3e",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "13px",
        },
        disabledBtn: {
            flex: 1,
            padding: "8px",
            border: "1px solid #cbd5e0",
            backgroundColor: "#f7fafc",
            color: "#a0aec0",
            borderRadius: "4px",
            cursor: "not-allowed",
            fontSize: "13px",
        },
    };

    return (
        <div style={styles.grid}>
            {posts.map((post) => (
                <div key={post.id} style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h3 style={styles.title}>{post.title}</h3>
                        <span style={styles.author}>By {post.author}</span>
                    </div>

                    <p style={styles.content}>{post.content}</p>

                    <div style={styles.buttonGroup}>
                        {/* 수정 버튼: 본인 글이거나 관리자일 때 */}
                        {(user.role === "ADMIN" || user.username === post.author) ? (
                            <button
                                style={styles.editBtn}
                                onClick={() => onEdit(post)}
                            >
                                수정
                            </button>
                        ) : (
                            <button style={styles.disabledBtn} disabled>
                                수정 불가
                            </button>
                        )}

                        {/* 삭제 버튼: 본인 글이거나 관리자일 때 */}
                        {(user.role === "ADMIN" || user.username === post.author) ? (
                            <button
                                style={styles.deleteBtn}
                                onClick={() => onDelete(post.id)}
                            >
                                삭제
                            </button>
                        ) : (
                            <button style={styles.disabledBtn} disabled>
                                삭제 불가
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostList;