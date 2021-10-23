const { doc } = require("prettier");

async function deleteFormHandler(event) {
    event.preventDefault();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
           post_id,
           comment_text 
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard/')
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);