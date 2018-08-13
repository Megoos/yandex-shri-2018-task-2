let Modal = (function() {
  const trigger = $qsa('.modal__trigger');
  const modalsbg = $qsa('.modal__bg');
  const closers = $qsa('.modal__close');
  let isOpen = false;
  const contentDelay = 200;

  const len = trigger.length;

  function $qsa(el) {
    return document.querySelectorAll(el);
  }

  const handleClick = function(event) {
    event.preventDefault();
    const modal = document.getElementById('modal');
    const self = this;
    // получить значение атрибута data-modal от кнопки
    //var modalId = self.dataset.modal;

    modal.classList.add('active');
    makeDiv(self, modal);
  };

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

  const moveTrig = function(modal, div) {
    const mProps = modal.querySelector('.modal__info').getBoundingClientRect();

    div.style.top = mProps.top + 'px';
    div.style.left = mProps.left + 'px';

    div.style.height = mProps.height + 'px';
    div.style.width = mProps.width + 'px';

    div.style.backgroundColor = 'white';
    div.style.opacity = 1;

    setTimeout(() => {
      window.requestAnimationFrame(function() {
        open(modal, div);
      });
    }, contentDelay);
  };

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
      modalsbg[0].addEventListener('click', close, false);
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
