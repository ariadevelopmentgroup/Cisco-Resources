document.addEventListener('DOMContentLoaded', () => {
  const sliderContent = document.getElementById('slider-content');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const pagination = document.getElementById('pagination');
  const fullscreenButton = document.getElementById('fullscreen-button');
  let currentIndex = 0;
  let slides = [];

  fetch('/slider.md')
    .then(response => response.text())
    .then(markdown => {
      slides = markdown.split('---'); // Assuming slides are separated by '---'
      renderSlide();
      renderPagination();
    });

  const renderSlide = () => {
    if (slides.length > 0) {
      sliderContent.innerHTML = marked(slides[currentIndex]);
    }
  };

  const renderPagination = () => {
    pagination.innerHTML = `${currentIndex + 1} / ${slides.length}`;
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderSlide();
      renderPagination();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      renderSlide();
      renderPagination();
    }
  });

  fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
});
