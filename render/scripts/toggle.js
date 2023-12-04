let appStatus = false

document.getElementById('toggleButton').addEventListener('click', () => {
    const slider = document.getElementById('slider');
    if (appStatus === false) {
        appStatus = !appStatus;
        printFolderContents();
        slider.style.backgroundColor = 'green';
        slider.innerText = 'ON';
    } else {
        appStatus = !appStatus;
        slider.style.backgroundColor = 'red';
        slider.innerText = 'OFF';
    }
});
