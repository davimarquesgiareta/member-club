document.addEventListener('DOMContentLoaded', function() {
    const valor = 7;
    const progressBar = document.querySelector('.progress-bar');
    console.log('barra de progresso', progressBar)
    progressBar.style.width = (valor / 10) * 100 + '%';
});