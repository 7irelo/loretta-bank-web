document.getElementById('hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('nav-links').classList.toggle('active');
    document.querySelector('.bar1').classList.toggle('active');
    document.querySelector('.bar2').classList.toggle('active');
    document.querySelector('.bar3').classList.toggle('active');
});
