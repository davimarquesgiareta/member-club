document.addEventListener('DOMContentLoaded', function() {
    const valor = 7; // Exemplo de valor
    const progressBar = document.querySelector('.progress-bar');
    console.log(progressBar)
    progressBar.style.width = (valor / 10) * 100 + '%';
});