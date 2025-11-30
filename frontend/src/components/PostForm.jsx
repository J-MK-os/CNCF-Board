import React from "react";

function PostForm({ form, editingId, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
            <input
                name="title"
                placeholder="제목"
                value={form.title}
                onChange={onChange}
                style={{ width: "100%", marginBottom: 8 }}
            />
            <textarea
                name="content"
                placeholder="내용"
                value={form.content}
                onChange={onChange}
                style={{ width: "100%", marginBottom: 8, height: 80 }}
            />
            <input
                name="author"
                placeholder="작성자"
                value={form.author}
                onChange={onChange}
                style={{ width: "100%", marginBottom: 8 }}
            />
            <button type="submit">
                {editingId ? "수정" : "작성"}
            </button>
        </form>
    );
}

export default PostForm;
