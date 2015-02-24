# Billboard

A little Billboard app that allows you to post messages to the big screen.

## Installation and Execution
```bash
git clone git@bitbucket.org:piotr/ccbillboard
cd ccbillboard
npm install

nodejs app.js #(on Debian-based distros)
node app.js #(on all other distros)
``` 

## Options

`--log <log file>`  the location where the chat log is stored

`--css <css file>` choose the design of your billboard. css files are stored in static/css

`--title <title>` the title for your billboard

`--port <portno>` the port on which the billboard runs

## Custom CSS

You can store custom CSS files in `static/css`. You'll find examples there.