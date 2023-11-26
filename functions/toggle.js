document.getElementById('toggleButton').addEventListener('click', () => {
    const slider = document.getElementById('slider');
    if (slider.style.backgroundColor === 'red') {
        slider.style.backgroundColor = 'green';
        slider.innerText = 'ON';
    } else {
        slider.style.backgroundColor = 'red';
        slider.innerText = 'OFF';
    }
});
