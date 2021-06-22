document.querySelector("#new_article").addEventListener('submit', async function(event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;

    const response = await fetch('http://localhost:3000/articles/new', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            category,
        }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    
    if (!response.ok) {
        alert('Error');
    } else {
        alert('Create success');
        location.href = '/';
        return;
    }
})