
function get(url, resolve, reject) {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('Origin', 'localhost:5000')
    fetch(url)
        .then((response) => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
}

function post(url, data, resolve, reject) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
}