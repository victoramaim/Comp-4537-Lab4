async function searchDefinition() {
    const word = document.getElementById('searchInput').value;
    const response = await fetch(`https://yourDomainName2.wyz/api/definitions/?word=${word}`);

    if (response.ok) {
        const data = await response.json();
        document.getElementById('searchResult').textContent = `Word: ${data.word}, Definition: ${data.definition}`;
    } else {
        document.getElementById('searchResult').textContent = `Error: ${response.statusText}`;
    }
}
