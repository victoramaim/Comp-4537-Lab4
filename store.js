document.getElementById('storeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const word = document.getElementById('wordInput').value;
    const definition = document.getElementById('definitionInput').value;

    const response = await fetch('https://yourDomainName2.wyz/api/definitions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word, definition })
    });

    const data = await response.json();
    if (response.ok) {
        document.getElementById('feedback').textContent = data.message;
    } else {
        document.getElementById('feedback').textContent = `Error: ${data.error}`;
    }
});