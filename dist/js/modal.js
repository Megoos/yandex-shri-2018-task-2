var Modal = (function() {
  var trigger = $qsa('.modal__trigger');
  //var modals = $qsa('.modal'); 
  var modalsbg = $qsa('.modal__bg'); 
  var content = $qsa('.modal__content'); 
  var closers = $qsa('.modal__close'); 
  var w = window;
  var isOpen = false;
  var contentDelay = 400; 
  console.log(trigger);

  var len = trigger.length;

  function $qsa(el) {
    return document.querySelectorAll(el);
  }

  var getId = function(event) {
    event.preventDefault();

    var self = this;
    // получить значение атрибута data-modal от кнопки
    //var modalId = self.dataset.modal;
    // выбираем модалку которую хотим активировать
    var modal = document.getElementById('modal');
    modal.className += ' active';
    
    makeDiv(self, modal);
  };

  var makeDiv = function(self, modal) {
    var fakediv = document.getElementById('modal__temp');

    if (fakediv === null) {
      var div = document.createElement('div');
      div.id = 'modal__temp';
      var coord = self.getBoundingClientRect();

      div.style.top = coord.top + 'px';
      div.style.left = coord.left + 'px';

      modalContent = document.getElementById('modal');

      modalContent.appendChild(div);
      moveTrig(modalContent, modal, div);
    }
  };

  var moveTrig = function(trig, modal, div) {
    var trigProps = div.getBoundingClientRect();
    var m = modal;
    var mProps = m.querySelector('#modal-content').getBoundingClientRect();

    div.style.top = mProps.top + 'px';
    div.style.left = mProps.left + 'px';

    div.style.height = mProps.height + 'px';
    div.style.width = mProps.width + 'px';
    div.style.backgroundColor = 'white';
    div.style.opacity = 1;

    setTimeout(() => {
      window.requestAnimationFrame(function() {
        open(m, div);
      });
    }, 200);
  };

  var open = function(m, div) {
    if (!isOpen) {
      var info = m.querySelector('.modal__info');
      var control = m.querySelector('.modal__control');

      div.style.opacity = 0;
      info.style.opacity = 1;
      control.style.opacity = 1;

      isOpen = true;
    }
  };

  var close = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var target = event.target;
    var modal = document.getElementById('modal');
    var div = document.getElementById('modal__temp');
    var info = modal.querySelector('.modal__info');
    var control = modal.querySelector('.modal__control');

    if (isOpen || target.classList.contains('modal__close')) {
      
      div.removeAttribute('style');

      info.style.opacity = 0;
      control.style.opacity = 0;

      modal.className = 'modal modal__bg';
      isOpen = false;

      
      window.requestAnimationFrame(function() {
        div.remove();
      });
    }
  };

  var bindActions = function() {
    for (var i = 0; i < len; i++) {
      trigger[i].addEventListener('click', getId, false);
      closers[0].addEventListener('click', close, false);
      modalsbg[0].addEventListener('click', close, false);
    }
  };

  var init = function() {
    bindActions();
  };

  return {
    init: init
  };
})();

Modal.init();
