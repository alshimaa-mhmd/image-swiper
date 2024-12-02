const slides = document.querySelectorAll('.swiper-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const pagination = document.querySelector('.pagination');
const swiperContainer = document.querySelector('.swiper-container');
let currentIndex = 0;
let interval;
let isHovered = false;

function showSlide(index) {
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -(currentIndex * 100 );
    document.querySelector('.swiper-wrapper').style.transform = `translateX(${offset}%)`;
    updatePagination();
    updateActiveSlide();
}


function updateActiveSlide(){ slides.forEach((element, index) => {

        element.classList.toggle('active-img', index === currentIndex)
        element.classList.toggle('normal-img', index !== currentIndex);
    
    
});


}
function updatePagination() {
    pagination.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.toggle('active', index === currentIndex);
        dot.classList.toggle('normalPagination', index !== currentIndex);
        pagination.appendChild(dot);
    });

}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function startAutoSlide() {
    if(!isHovered){
        stopAutoSlide();
        interval = setInterval(nextSlide, 3000);
    }
}

function stopAutoSlide() {
    clearInterval(interval);
}

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

pagination.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        stopAutoSlide();
        const index = Array.from(pagination.children).indexOf(e.target);
        showSlide(index);
        startAutoSlide();
    }
});

swiperContainer.addEventListener('mouseenter', ()=>{
    isHovered = true;
    stopAutoSlide();
}
);

// Resume swiper when mouse leaves the container
swiperContainer.addEventListener('mouseleave', ()=>{
    isHovered = false;
    nextSlide();
    startAutoSlide()
});

// swipe on touch screens
const slider = document.querySelector('.swiper-wrapper'); // The container that moves
let startX = 0; // Initial touch position
let currentX = 0; // Current touch position
let isSwiping = false; // Indicates if the user is swiping

// When the user starts touching the screen
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Get the X position of the first touch
    isSwiping = true; // Indicate that a swipe gesture has started
});

// When the user moves their finger on the screen
slider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX; // Update the current touch position
     e.preventDefault();
});

// When the user lifts their finger
slider.addEventListener('touchend', () => {
    if (!isSwiping) return;
    const deltaX = currentX - startX; // Calculate the swipe distance
    isSwiping = false; // Reset swiping state

    // Determine swipe direction
    if (deltaX > 200) {
        // Swipe right
        prevSlide(); // 
    } else if (deltaX < -200) {
        // Swipe left
        nextSlide(); 
    }
});

startAutoSlide();
