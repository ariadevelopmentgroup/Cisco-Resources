document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const slider = document.querySelector(".slider");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const paginationContainer = document.querySelector(".pagination");
    const fullscreenBtn = document.querySelector(".fullscreen-btn");

    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = translateX(-${currentIndex * 100}%);
        updatePagination();
    }

    function updatePagination() {
        paginationContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === currentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
            });
            paginationContainer.appendChild(dot);
        });
    }

    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    fullscreenBtn.addEventListener("click", function () {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    updatePagination();
});
