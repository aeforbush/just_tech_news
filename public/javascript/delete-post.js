async function deleteFormHandler(event) {
  event.preventDefault();

  // await fetch(`/api/posts/${id}`, {
  //   method: 'DELETE'
  // });

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  if (comment_text) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}
document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
