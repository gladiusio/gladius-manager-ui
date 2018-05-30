var {
  app,
  BrowserWindow,
  Tray,
  Menu
} = require('electron')

var path = require('path')
var url = require('url')
var iconpath = path.join(__dirname, 'icon.png') // path of y
var win

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    icon: iconpath
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  var appIcon = new Tray(iconpath)

  var contextMenu = Menu.buildFromTemplate([{
      label: 'Show Gladius Manager',
      click: function() {
        win.show()
      }
    },
    {
      label: 'Quit',
      click: function() {
        app.isQuiting = true
        app.quit()
      }
    }
  ])

  appIcon.setContextMenu(contextMenu)

  win.on('close', function(event) {
    if(!app.isQuiting){
        event.preventDefault();
        win.hide();
    }

    return false;
  })

  win.on('minimize', function(event) {
    event.preventDefault()
    win.hide()
  })

  win.on('show', function() {
    appIcon.setHighlightMode('always')
  })

}

app.on('ready', createWindow)
