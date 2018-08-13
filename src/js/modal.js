let Modal = (function() {
  const trigger = $qsa('.modal__trigger');
  const closers = $qsa('.modal__close');
  let isOpen = false;
  let text = '';
  let subtext = '';
  let value = 0;

  const contentDelay = 200;

  const len = trigger.length;

  function $qsa(el) {
    return document.querySelectorAll(el);
  }

  // Получение информации эт элемента на который кликнули
  const handleClick = function(event) {
    event.preventDefault();
    const modal = document.getElementById('modal');
    const self = this;

    text = self.querySelector('.device__text').textContent;
    subtext = self.querySelector('.device__subtext').textContent;
    value = self.dataset.value;

    modal.classList.add('active');
    makeDiv(self, modal);
  };

  // Подсавляем значения для фейкового дива
  const makeDiv = function(self, modal) {
    const fakediv = document.getElementById('modal__temp');

    if (fakediv === null) {
      const div = document.createElement('div');
      div.id = 'modal__temp';
      const coord = self.getBoundingClientRect();

      div.style.top = coord.top + 'px';
      div.style.left = coord.left + 'px';

      modal.appendChild(div);

      window.requestAnimationFrame(function() {
        moveTrig(modal, div);
      });
    }
  };

  // накидываем новые свойства
  const moveTrig = function(modal, div) {
    const mProps = modal.querySelector('.modal__info').getBoundingClientRect();

    div.style.top = mProps.top + 'px';
    div.style.left = mProps.left + 'px';

    div.style.height = mProps.height + 'px';
    div.style.width = mProps.width + 'px';

    div.style.backgroundColor = 'white';
    div.style.opacity = 1;

    const slider = document.getElementById('temperature-range');
    const output = document.getElementById('value');
    slider.value = value;
    output.innerHTML = slider.value >= 0 ? '+' + slider.value : slider.value;

    const textContent = modal.querySelector('.modal__title-text');
    const subtextContent = modal.querySelector('.modal__title-subtext');

    textContent.innerHTML = text;
    subtextContent.innerHTML = subtext;

    setTimeout(() => {
      window.requestAnimationFrame(function() {
        open(modal, div);
      });
    }, contentDelay);
  };

  // открываем модалку
  const open = function(m, div) {
    if (!isOpen) {
      const info = m.querySelector('.modal__info');
      const control = m.querySelector('.modal__control');

      div.style.opacity = 0;
      info.style.opacity = 1;
      control.style.opacity = 1;

      isOpen = true;
    }
  };

  // закрываем модалку
  const close = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const target = event.target;
    const modal = document.getElementById('modal');
    const div = document.getElementById('modal__temp');
    const info = modal.querySelector('.modal__info');
    const control = modal.querySelector('.modal__control');

    if (isOpen || target.classList.contains('modal__close')) {
      div.removeAttribute('style');

      info.style.opacity = 0;
      control.style.opacity = 0;

      modal.classList.remove('active');
      isOpen = false;

      window.requestAnimationFrame(function() {
        div.remove();
      });
    }
  };

  const bindActions = function() {
    for (let i = 0; i < len; i++) {
      trigger[i].addEventListener('click', handleClick, false);
      closers[0].addEventListener('click', close, false);
    }
  };

  const init = function() {
    bindActions();
  };

  return {
    init: init
  };
})();

Modal.init();
