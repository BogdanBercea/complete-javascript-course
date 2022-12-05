'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Event Handlers
const scrollToSection1 = (event) => {
  // Method 1
  // window.scrollTo(s1cords.left + window.pageXOffset, s1cords.top + window.pageYOffset);

  // Method 2
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  // Method 3 (Modern method)
  section1.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners
btnScrollTo.addEventListener('click', scrollToSection1);

// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (event) {
//     event.preventDefault();
//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (event) {
  event.preventDefault();

  // Matching strategy
  if (event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component 
tabsContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.operations__tab');

  if (!clicked) {
    return;
  }

  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach((tabContent) => tabContent.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((sibling) => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation - Bad method
// const initialSection1Coordinates = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialSection1Coordinates.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky navigation - Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: `-${navHeight}px` });
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return
  }

  // Replace src attribute with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '600px'
});

imgTargets.forEach((imgTarget) => imgObserver.observe(imgTarget));

// Slider 
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `
      <button class="dots__dot" data-slide="${i}"></button>
    `)
  });
}

const activateDot = function (slide) {
  document.querySelectorAll('dots__dot').forEach((dot) => {
    dot.classList.remove('dots__dot--active');
  });

  document.querySelector(`.dots__dot[data-slide="${slide}]"`)
    ?.classList.add('dots__dot--active');
}

createDots();

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
}

goToSlide(0);

const nextSlide = function () {
  if (currentSlide === (maxSlide - 1)) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
}

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    nextSlide();
  }

  if (event.key === 'ArrowLeft') {
    prevSlide()
  }
});

dotContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('dots__dot')) {
    const { slide } = event.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});