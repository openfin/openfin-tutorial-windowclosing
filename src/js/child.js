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

  _childApp.show(function() {
      console.log("show succeeded");
    }, function() {
      console.log("show failed");
    });

  _childApp.addEventListener("restored", function (event) {
    console.log("The window has been moved or restored");
    _childApp.setBounds(0, 0, 1000, 1000, function () {
    }, function () {
      console.log("The registration was successful");
    }, function (reason) {
      console.log("failure:" + reason);
    });

  });
};