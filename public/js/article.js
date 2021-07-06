

document.querySelector("#new_article").addEventListener('submit', async function(event){
    event.preventDefault();
    let data = new FormData();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;
    const method = document.getElementById("method").value;
    const file = document.querySelector("#thumbnail");
    let linkImg = "";

    const user = localStorage.getItem('user');

    data.append("thumbnail", file.files[0]);

    let options = {
        method: "POST",
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }
   
    delete options.headers['Content-Type'];
    
    let postImageRes = await fetch('http://localhost:3000/articles/upload', options);

    if (!postImageRes.ok) {
        postImageRes.json().then((r) => alert(r.message));
        return;
    } else {
        let upload = await postImageRes.json();
        linkImg = upload.link;
    }

    if(!user){
        alert('Your current login is out of date');
    }

    const response = await fetch('http://localhost:3000/articles/new', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            category,
            linkImg,
        }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + JSON.parse(user).data.accessToken,
        },
    });
    
    if (!response.ok) {
        alert('Create failed');
    } else {
        alert('Create success');
        location.href = '/';
        return;
    }
})