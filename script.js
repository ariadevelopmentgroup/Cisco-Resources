document.addEventListener("DOMContentLoaded", function () {
    let slides = [];
    let currentSlide = 0;

    // Բեռնում ենք slider.md ֆայլը
    fetch("slider.md")
        .then(response => response.text())
        .then(text => {
            slides = text.split("\n\n---\n\n").map(slide => marked.parse(slide));
            showSlide(currentSlide);
        });

    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentSlide = index;
        document.getElementById("content").innerHTML = slides[currentSlide];
        document.getElementById("pagination").textContent = ${currentSlide + 1} / ${slides.length};
    }

    document.getElementById("prev").addEventListener("click", () => showSlide(currentSlide - 1));
    document.getElementById("next").addEventListener("click", () => showSlide(currentSlide + 1));

    document.getElementById("fullscreen").addEventListener("click", function () {
        let elem = document.getElementById("slider-card");
        if (!document.fullscreenElement) {
            elem.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
});
