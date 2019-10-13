# Overview
Real Time Support (rtsupport) application on client side
This project is what I learned from the lecture (https://www.udemy.com/course/realtime-apps-with-reactjs-golang-rethinkdb/) 

Ref:
- https://github.com/knowthen/rtsupportclient
- https://github.com/knowthen/rtsupportserver

### How to create a project
```
mkdir rtsupport
cd rtsupport
npm init
# Shoichis-MacBook-Pro:rtsupport shoichisato$ npm init
# This utility will walk you through creating a package.json file.
# It only covers the most common items, and tries to guess sensible defaults.
# 
# See `npm help json` for definitive documentation on these fields
# and exactly what they do.
# 
# Use `npm install <pkg>` afterwards to install a package and
# save it as a dependency in the package.json file.
# 
# Press ^C at any time to quit.
# package name: (rtsupport)
# version: (1.0.0)
# description: Realtime Support Frontend
# entry point: (index.js)
# test command:
# git repository:
# keywords:
# author: Shoichi Sato
# license: (ISC)
# About to write to /Users/shoichisato/IdeaProjects/rtsupport/package.json:
# 
# {
#   "name": "rtsupport",
#   "version": "1.0.0",
#   "description": "Realtime Support Frontend",
#   "main": "index.js",
#   "scripts": {
#     "test": "echo \"Error: no test specified\" && exit 1"
#   },
#   "author": "Shoichi Sato",
#   "license": "ISC"
# }
# 
# 
# Is this OK? (yes)
```

### Directory Structure
```
rtsupport
  |- app.css
  |- index.html
  |- index.js                   // Entry point of the app
  |- bundle.js                  // Traspile *.jsx files with Bable and bundled into this single file
  |- components/                // Client side javascript
  |   |- App.jsx                // Top component hierarchy
  |   |- channels/              // Each logical section
  |   |   |- Channel.jsx        // Each React component
  |   |   |- ChannelForm.jsx
  |   |   |- ChannelList.jsx
  |   |   |- ChannelSection.jsx
  |   |- messages/
  |   |- users/
```

### Webpack 4 (build tool)
Reference: https://webpack.js.org/configuration/
```
webpack <entryfile> -o <outputfile> --mode {'development'|'production'}
# webpack ./index.js -o bundle.js --mode 'development' 
# => Create 'webpack.config.js' for webpack configration

# Installing webpack
npm install webpack -g

# For Babel
npm install webpack babel-loader --save-dev
npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react webpack
touch .babelrc
----[.babelrc]-----
{
  "presets": [
    "@babel/preset-env", "@babel/preset-react"
  ]
}
-------------------

# For React
npm install react --save-dev

# For ReactDOM
npm install react-dom --save

# For prop-types
# https://reactjs.org/docs/typechecking-with-proptypes.html
npm install prop-types --save-dev

# webpack-dev-server
# it will re-read bundle file when changed
npm install webpack-dev-server -g
webpack-dev-server --hot --inline
# with port number
webpack-dev-server --port 4001

# After setting up the config file, you can just execute 'webpack' to build this app
```

### React Lifecycle Hooks
```javascript
class App extends Comment {
    // Called before render()
    componentWillMount() {
    }
    // Called once after render()
    componentDidMount() {
    }
    // Called before removed
    componentWillUnmount() {
    }    
}
```