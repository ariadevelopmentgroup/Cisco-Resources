document.addEventListener("DOMContentLoaded", async function () {
    const markdownContainer = document.getElementById("markdown-content");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const paginationContainer = document.getElementById("pagination");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const card = document.getElementById("card");

    let slides = [];
    let currentSlide = 0;

    async function loadMarkdown() {
        try {
            const response = await fetch("slides.md");
            if (!response.ok) throw new Error("Ֆայլը չի գտնվել");
            const text = await response.text();
            slides = text.split("\n---\n"); // Բաժանում "---" սիմվոլով
            renderSlide();
            renderPagination();
        } catch (error) {
            markdownContainer.innerHTML = "<p>Չհաջողվեց բեռնել Markdown ֆայլը.</p>";
        }
    }

    function renderSlide() {
        if (slides.length > 0) {
            markdownContainer.innerHTML = marked.parse(slides[currentSlide]);
        }
        updateButtons();
    }

    function updateButtons() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
        document.querySelectorAll(".page-btn").forEach((btn, index) => {
            btn.classList.toggle("active", index === currentSlide);
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const btn = document.createElement("button");
            btn.classList.add("page-btn");
            btn.textContent = index + 1;
            btn.addEventListener("click", () => {
                currentSlide = index;
                renderSlide();
            });
            paginationContainer.appendChild(btn);
        });
    }

    prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            renderSlide();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            renderSlide();
        }
    });

    fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            card.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    await loadMarkdown();
});