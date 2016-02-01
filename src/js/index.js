var _mainWin, apps = []

document.addEventListener("DOMContentLoaded", function(){
    init();
});
//------


function init(){
    console.log("Dom Loaded ", this);
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

function initWithOpenFin(){
    // NB it is 'Window' not 'Application' that the EventListener is being attached to
    _mainWin = fin.desktop.Window.getCurrent()
    _mainWin.addEventListener('close-requested', function(e) {
        var challenge = confirm('are you sure?');
        if (challenge == true) {
            terminateAllApps();
            _mainWin.close(true);
        }else{
            console.log("The confirm was false")
        }
    });
//create an new app
    initNewApp("BGCIROVolumeMatch").then(function(value){
        apps.push(value)
    });
// and a second - for good measure...
    initNewApp("BGCIROVolumeMatch2").then(function(value){
        apps.push(value)
    });
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
}

function terminateAllApps(){
    for(var app in apps ){
        apps[app].terminate();
    }
}


function initNewApp(uuid){
    return new Promise(function(resolve, reject){
        var volumeMatchApplication = new fin.desktop.Application({
            name: "BGC IRO Volume Match",
            uuid: uuid,
            url: "http://localhost:3030/child.html",
            mainWindowOptions: {
                name: "BGC IRO Volume Match",
                autoShow: true,
                defaultCentered: true,
                alwaysOnTop: true,
                state: "minimized",
                saveWindowState: true,
                icon: "favicon.ico"
            }
        }, function () {
            // Ensure the Volume Match application is closed when the main application is closed.
            console.log("running");
            volumeMatchApplication.run();
            resolve(volumeMatchApplication)
        });
    })

}