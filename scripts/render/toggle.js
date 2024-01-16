const { processFoldersForRenaming } = require('../scripts/naming/renaming.js');
const { processFoldersForDeletion } = require('../scripts/deletingFiles/deleteFiles.js');

document.getElementById('start-app').addEventListener('click', () => {
    const targetFolderPath = document.getElementById('targetFolder').textContent; // Get the current target folder path

    // Start the process and show the feedback icon
    showFeedbackIcon('🔧'); // Show the wrench icon

    // Perform the operations
    processFoldersForRenaming(targetFolderPath); // Pass the target folder path to the function
    processFoldersForDeletion(targetFolderPath);

    // Simulate the completion of the process
    // Replace with actual logic to detect when both functions have completed
    setTimeout(() => {
        showFeedbackIcon('✅'); // Change to checkmark icon
    }, 3000); // Adjust timing based on your process duration
});

function showFeedbackIcon(icon) {
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackIcon = document.getElementById('feedback-icon');

    feedbackIcon.textContent = icon; // Set the icon
    feedbackContainer.classList.add('show-feedback'); // Show the container

    if (icon === '✅') {
        // Hide the feedback icon after a delay
        setTimeout(() => {
            feedbackContainer.classList.remove('show-feedback');
        }, 2000); // Adjust timing as needed
    }
}
