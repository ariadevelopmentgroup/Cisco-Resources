let slides = [];
let currentIndex = 0;

// Markdown ֆայլի ներբեռնում
fetch("slides.md")
    .then(response => response.text())
    .then(text => {
        slides = text.split("\n---\n").map(md => marked.parse(md));
        showSlide(currentIndex);
    });

function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    document.getElementById("slides").innerHTML = slides[index];
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
    }
}

function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
    }
}
