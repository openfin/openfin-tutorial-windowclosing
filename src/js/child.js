var _childApp;

document.addEventListener("DOMContentLoaded", function(){
  initChild();
});

function initChild(){

  fin.desktop.main(function(){
      initChildWithOpenFin();
  })
}

initChildWithOpenFin = function(){
  _childApp = fin.desktop.Window.getCurrent();
  _childApp.show();
};
