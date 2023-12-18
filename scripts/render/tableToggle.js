document.getElementById("rename-header").addEventListener('click', () => {
    const renameDiv = document.getElementById('files-table');
    renameDiv.classList.toggle('hidden');
})

document.getElementById("delete-header").addEventListener('click', () => {
    const renameDiv = document.getElementById('delete-table');
    renameDiv.classList.toggle('hidden');
})