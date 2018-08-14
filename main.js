let {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage
} = require('electron')

let path = require('path')
let url = require('url')
let win

// Icons
let imageFolder = __dirname + '/img'
let platform = require('os').platform()
let iconPath = path.join(imageFolder, '/icon/icon.png')
let trayImage
let appIcon

// Determine appropriate icon for platform
if (platform == 'darwin') {
  trayImage = path.join(imageFolder, '/tray/mac/icon.png')
  app.dock.hide()
} else if (platform == 'win32') {
  trayImage = path.join(imageFolder, '/tray/win/icon.ico')
} else if (platform == 'linux') {
  trayImage = path.join(imageFolder, '/tray/mac/icon.png')
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: iconPath
  })

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  if (platform != "darwin") {
    appIcon = new Tray(nativeImage.createFromPath(trayImage));
  }

  let contextMenu = Menu.buildFromTemplate(
    [{
        label: 'Show Gladius Manager',
        click: function() {
          win.show()
        }
      },
      {
        label: 'Quit',
        click: function() {
          // gladius-controld stop
          app.isQuiting = true
          app.quit()
        }
      }
    ]
  )

  if (platform != "darwin") {
    appIcon.setContextMenu(contextMenu)
  }

  win.on('close', function(event) {
      app.isQuiting = true
      app.quit()
      return true
  })

  win.on('minimize', function(event) {
    event.preventDefault()
    win.hide()
  })

  win.on('show', function() {
    if (platform != "darwin") {
      appIcon.setHighlightMode('selection')
    }
  })

  // Create the Application's main menu
  var template = [{
    label: "Application",
    submenu: [{
        label: "About Application",
        selector: "orderFrontStandardAboutPanel:"
      },
      {
        type: "separator"
      }
    ]
  }, {
    label: "Edit",
    submenu: [{
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        selector: "undo:"
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        selector: "redo:"
      },
      {
        type: "separator"
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        selector: "cut:"
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        selector: "copy:"
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        selector: "paste:"
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:"
      }
    ]
  }]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

app.on('ready', createWindow)
