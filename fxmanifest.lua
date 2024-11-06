
fx_version 'bodacious'
game 'rdr3'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'MOR'
description 'legends keypress Mini-Game'
version '1.0'

client_scripts {
    'client.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/assets/*',
    'html/script.js'
}


exports {
    "startkp"
}