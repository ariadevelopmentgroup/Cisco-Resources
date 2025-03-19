function convertMarkdown() {
    const markdownInput = document.getElementById("markdown-input").value;
    const htmlContent = marked.parse(markdownInput);
    
    document.getElementById("slides-output").innerHTML = htmlContent;
    
    Reveal.initialize();
}

function changeTheme(theme) {
    document.getElementById("theme").href = `https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/theme/${theme}.min.css`;
}

async function generateSlidesWithAI() {
    const userInput = document.getElementById("markdown-input").value;
    
    if (!userInput.trim()) {
        alert("Please enter some text to generate slides!");
        return;
    }

    const apiKey = "YOUR_OPENAI_API_KEY";
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const requestBody = {
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are an expert in creating slides using Markdown." },
            { role: "user", content:f (!userInput.trim()) {
        alert("Please enter some text to generate slides!");
        return;
    }
        ],
        temperature: 0.7,
        max_tokens: 500
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":

function changeThe            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        const generatedMarkdown = data.choices[0].message.content.trim();

        document.getElementById("markdown-input").value = generatedMarkdown;
        convertMarkdown();
    } catch (error) {
        console.error("Error generating slides:", error);
        alert("Failed to generate slides. Please try again.");
    }
}

// Pagination Functions
let currentSlide = 0;

function updateSlideNumber() {
    document.getElementById("slide-number").textContent = currentSlide + 1;
}

function prevSlide() {
    Reveal.prev();
    if (currentSlide > 0) {
        currentSlide--;
    }
    updateSlideNumber();
}

function nextSlide() {
    Reveal.next();
    if (currentSlide < Reveal.getTotalSlides() - 1) {
        currentSlide++;
    }
    updateSlideNumber();
}

Reveal.initialize({
    transition: 'fade',
    width: '100%',
    height: 'auto'
});
