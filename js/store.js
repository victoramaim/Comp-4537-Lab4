function storeDefinition() {
    const word = document.getElementById('wordInput').value;
    const definition = document.getElementById('definitionInput').value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/api/definitions");
    xhttp.send(JSON.stringify({ word, definition }));
}