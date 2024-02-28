const { processFoldersForRenaming } = require('../scripts/naming/renaming.js');
const { processFoldersForDeletion } = require('../scripts/deletingFiles/deleteFiles.js');

document.getElementById('start-app').addEventListener('click', async () => {
    const targetFolderPath = document.getElementById('targetFolder').textContent;
    showFeedbackIcon('⚙️'); // Show the wrench icon

    try {
        // Assuming these functions are now async, use await to handle them properly
        await processFoldersForRenaming(targetFolderPath);
        // await processFoldersForDeletion(targetFolderPath);
        showFeedbackIcon('✅'); // Change to checkmark icon on completion
    } catch (error) {
        console.error('An error occurred:', error);
        showFeedbackIcon('❌'); // Show an error icon or handle the error appropriately
    } finally {
        // Hide the feedback icon after a delay
        setTimeout(() => {
            document.getElementById('feedback-container').classList.remove('show-feedback');
        }, 2000);
    }
});

function showFeedbackIcon(icon) {
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackIcon = document.getElementById('feedback-icon');

    feedbackIcon.textContent = icon;
    feedbackContainer.classList.add('show-feedback');

    if (icon === '✅') {
        setTimeout(() => {
            feedbackIcon.classList.add('fade-out'); // Trigger fade out after the icon appears
        }, 2200);

        setTimeout(() => {
            feedbackContainer.classList.remove('show-feedback');
            feedbackIcon.classList.remove('fade-out'); // Reset for next use
        }, 200);
    }
}

