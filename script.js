document.addEventListener("DOMContentLoaded", async function () {
    const markdownContainer = document.getElementById("markdown-content");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const paginationContainer = document.getElementById("pagination");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const card = document.getElementById("card");
    const fileInput = document.getElementById("fileInput");

    let slides = [];
    let currentSlide = 0;

    async function loadMarkdownFromURL(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Ֆայլը չի գտնվել");
            const text = await response.text();
            slides = text.split("\n---\n");
            renderSlide();
            renderPagination();
        } catch (error) {
            markdownContainer.innerHTML = "<p>Չհաջողվեց բեռնել Markdown ֆայլը.</p>";
        }
    }

    function loadMarkdownFromFile(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            slides = event.target.result.split("\n---\n");
            renderSlide();
            renderPagination();
        };
        reader.readAsText(file);
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

    fileInput.addEventListener("change", (event) => {
        if (event.target.files.length > 0) {
            loadMarkdownFromFile(event.target.files[0]);
        }
    });

    // GitHub-ում տեղադրված ֆայլի URL-ն
    const githubMarkdownFile = "https://raw.githubusercontent.com/ANUN/PROJECT/main/slides.md";
    await loadMarkdownFromURL(githubMarkdownFile);
});