const { response } = require("express");

async function editFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector("#post_id").getAttribute("data-post-id")
    const title = document.querySelector("#post_title").value.trim();

    await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);