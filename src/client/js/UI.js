module.exports = {
    screen: null,
    init: function () {
        nw.Screen.Init();
        nw.Screen.on('displayBoundsChanged', this.screenCB.onDisplayBoundsChanged);
        nw.Screen.on('displayAdded', this.screenCB.onDisplayAdded);
        nw.Screen.on('displayRemoved', this.screenCB.onDisplayRemoved);
        this.screen = nw.Screen.screens[0];
        this.configureUI();
    },
    screenCB:{
        onDisplayBoundsChanged: function(screen) {
            console.log('displayBoundsChanged', screen);
        },

        onDisplayAdded: function(screen) {
            console.log('displayAdded', screen);
        },

        onDisplayRemoved: function(screen) {
            console.log('displayRemoved', screen)
        }
    },
    getScreen:function(){
        return this.screen;
    },
    configureUI: function(){
        var win = nw.Window.get();
        win.menu = null;
        win.height = this.screen.work_area.height;
        win.width = this.screen.work_area.width;
        win.x = 0;
        win.y = 0;
        win.enterFullscreen();
    }
};