async function searchDefinition() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/api/definitions/?word=" + document.getElementById('searchInput').value, true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('searchResult').textContent = `Word: ${JSON.parse(this.responseText).word}, Definition: ${JSON.parse(this.responseText).definition}`;
        } else {
            document.getElementById('searchResult').textContent = `Error: ${this.statusText}`;
        }
    };
}
