'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close-modal');
const openModalButtons = document.querySelectorAll('.show-modal');

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const handleEscPress = (event) => {
  if ((event.key === 'Escape') && !modal.classList.contains('hidden')) {
    closeModal();
  }
}

openModalButtons.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

closeModalButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', handleEscPress);
