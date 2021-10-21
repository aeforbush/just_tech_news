async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // wrapped in if statment to prevent users from submitting empty strings
  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      // expects {post_id and comment_text}
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
