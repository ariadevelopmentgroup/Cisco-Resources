document.addEventListener("DOMContentLoaded", function () {
    fetch("slides.md")
        .then(response => response.text())
        .then(text => {
            let slides = text.split("\n---\n"); // Սլայդերը բաժանելու համար օգտագործում ենք "---" բաժանարար
            let currentSlide = 0;

            function renderSlide() {
                document.getElementById("slideContent").innerHTML = marked.parse(slides[currentSlide]);
            }

            document.getElementById("prevSlide").addEventListener("click", function () {
                if (currentSlide > 0) {
                    currentSlide--;
                    renderSlide();
                }
            });

            document.getElementById("nextSlide").addEventListener("click", function () {
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                    renderSlide();
                }
            });

            renderSlide(); // Սկզբում ցուցադրում ենք առաջին սլայդը
        });
});
