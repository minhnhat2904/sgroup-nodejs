document.getElementById('logout').addEventListener('click', async function(event) {
    localStorage.removeItem('user');

    location.href = '/auth/login';
})

// event.preventDefault();
//     const url = 'http://localhost:3000/auth/logout';

//     const deleteMethod = {
//         method: 'GET', // Method itself
//         headers: {
//             'Accept' : 'application/json, text/plain, */*',
//             'Content-type': 'application/json; charset=UTF-8'
//         },
//     };

//     try {
//         await (await fetch(url, deleteMethod)).json();
//         localStorage.removeItem('user');       
//     } catch (error) {
//         alert(error);
//     }