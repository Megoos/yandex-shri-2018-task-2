var Modal = (function() {
  var trigger = $qsa('.modal__trigger'); // what you click to activate the modal
  var modals = $qsa('.modal'); // the entire modal (takes up entire window)
  var modalsbg = $qsa('.modal__bg'); // the entire modal (takes up entire window)
  var content = $qsa('.modal__content'); // the inner content of the modal
  var closers = $qsa('.modal__close'); // an element used to close the modal
  var w = window;
  var isOpen = false;
  var contentDelay = 400; // duration after you click the button and wait for the content to show
  console.log(trigger);

  var len = trigger.length;

  // make it easier for yourself by not having to type as much to select an element
  function $qsa(el) {
      return document.querySelectorAll(el);
  }

  var getId = function(event) {
      event.preventDefault();
      var self = this;
      // получить значение атрибута data-modal от кнопки
      var modalId = self.dataset.modal;
      var len = modalId.length;
      // удалить # из id
      var modalIdTrimmed = modalId.substring(1, len);
      // выбираем модалку которую хотим активировать
      var modal = document.getElementById(modalIdTrimmed);
      // выполнить функцию, которая создает временное расширение div
      makeDiv(self, modal);
  };

  var makeDiv = function(self, modal) {
      var fakediv = document.getElementById('modal__temp');

      /**
       * if there isn't a 'fakediv', create one and append it to the button that was
       * clicked. after that execute the function 'moveTrig' which handles the animations.
       */

      if (fakediv === null) {
          var div = document.createElement('div');
          div.id = 'modal__temp';
          self.appendChild(div);
          moveTrig(self, modal, div);
      }
  };

  var moveTrig = function(trig, modal, div) {
        var trigProps = trig.getBoundingClientRect();
        var m = modal;
        var mProps = m.querySelector('.modal__content').getBoundingClientRect();
        var transX, transY, scaleX, scaleY;
        var xc = w.innerWidth / 2;
        var yc = w.innerHeight / 2;

        // this class increases z-index value so the button goes overtop the other buttons
        trig.classList.add('modal__trigger--active');

        // these values are used for scale the temporary div to the same size as the modal
        scaleX = mProps.width / trigProps.width;
        scaleY = mProps.height / trigProps.height;

        scaleX = scaleX.toFixed(3); // round to 3 decimal places
        scaleY = scaleY.toFixed(3);

        // these values are used to move the button to the center of the window
        transX = Math.round(xc - trigProps.left - trigProps.width / 2);
        transY = Math.round(yc - trigProps.top - trigProps.height / 2);


        // translate button to center of screen
        trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
        trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
        // expand temporary div to the same size as the modal
        div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
        div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';
  };

  var open = function(m, div) {

  };

  var close = function(event) {

  };

  var bindActions = function() {
      for (var i = 0; i < len; i++) {
          trigger[i].addEventListener('click', getId, false);
          closers[i].addEventListener('click', close, false);
          modalsbg[i].addEventListener('click', close, false);
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
