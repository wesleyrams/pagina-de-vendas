document.querySelectorAll('a').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
        if (this.href.includes('https://api.whatsapp.com')) {
            window.open(this.href, '_blank');
            event.preventDefault();
        }
    });
});


