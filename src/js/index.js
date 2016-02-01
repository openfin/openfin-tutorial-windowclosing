var _mainWin, apps = []

document.addEventListener("DOMContentLoaded", function(){
    init();
});
//------

function init(){
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
    _mainWin = fin.desktop.Window.getCurrent();

    document.querySelector("#min-btt").addEventListener('click', function(e){
        minAll()
    });

    document.querySelector("#max-btt").addEventListener('click', function(e){
        maxAll();
    });



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
        var _childWin = value.getWindow()
        _childWin.addEventListener('close-requested', function(e){
            console.log("close requested, but blocked. Close me from the main app.");
            _childWin.minimize();
        });
        apps.push(value);
    });
// and a second - for good measure...
    initNewApp("BGCIROVolumeMatch2").then(function(value){
        var _childWin2 = value.getWindow()
        _childWin2.addEventListener('close-requested', function(e){
            console.log("close requested, but blocked. Close me from the main app.");
            _childWin2.minimize();
        });
        apps.push(value);
    });

    // and a third - for even better measure...
    initNewApp("BGCIROVolumeMatch3").then(function(value){
        var _childWin3 = value.getWindow()
        _childWin3.addEventListener('close-requested', function(e){
            console.log("close requested, but blocked. Close me from the main app.");
            _childWin3.minimize();
        });
        apps.push(value);
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

function minAll(){
    for(var app in apps ){
        apps[app].getWindow().minimize();
    }
}

function maxAll(){
    for(var app in apps ){
        apps[app].getWindow().restore();
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