
// on form submission, this will grab post-title and post-url from the form and send them with a POST request to /api/posts || requires id which is obtained from the session
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]')
    .value;
    const post_url = document.querySelector('input[name="post-url"]')
    .value;  

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_url    
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

