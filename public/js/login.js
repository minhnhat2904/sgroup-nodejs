document.getElementById("login").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch('http://localhost:3000/auth/login?case=0', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        alert('Error');
    } else {
        const data = await response.json();

        localStorage.setItem('user', JSON.stringify(data));
        alert('Login success');
        location.href = '/';
        return;
    }
})