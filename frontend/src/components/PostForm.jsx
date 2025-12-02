import React from "react";

function PostForm({ form, onChange, onSubmit, editingId }) {
    const styles = {
        formCard: {
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
        },
        inputGroup: {
            marginBottom: "15px",
        },
        label: {
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#4a5568",
            fontSize: "14px",
        },
        input: {
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
            fontSize: "14px",
            boxSizing: "border-box", // 패딩 포함 너비 계산
            outline: "none",
            transition: "border-color 0.2s",
        },
        textarea: {
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
            fontSize: "14px",
            minHeight: "100px",
            boxSizing: "border-box",
            resize: "vertical",
            fontFamily: "inherit",
        },
        submitBtn: {
            backgroundColor: editingId ? "#3182ce" : "#2b6cb0", // 수정일 때 조금 더 밝게
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
            transition: "background-color 0.2s",
        },
    };

    return (
        <form style={styles.formCard} onSubmit={onSubmit}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>제목</label>
                <input
                    style={styles.input}
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    placeholder="제목을 입력하세요 (욕설 금지 테스트)"
                    required
                />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>내용</label>
                <textarea
                    style={styles.textarea}
                    name="content"
                    value={form.content}
                    onChange={onChange}
                    placeholder="내용을 입력하세요..."
                    required
                />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>작성자</label>
                <input
                    style={styles.input}
                    name="author"
                    value={form.author}
                    onChange={onChange}
                    placeholder="작성자 이름"
                    required
                />
            </div>
            <button style={styles.submitBtn} type="submit">
                {editingId ? "수정 완료" : "게시글 작성"}
            </button>
        </form>
    );
}

export default PostForm;