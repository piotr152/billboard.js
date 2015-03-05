# billboard.js

A little Billboard app that allows you to post messages to the big screen.

## Installation and Execution

Make sure you have nodejs and npm installed on your system.

```bash
git clone https://github.com/piotr152/billboard.js.git
cd billboard.js
npm install

nodejs billboard.js #(on Debian and Ubuntu-based distributions)
node billboard.js #(on all other distros)
``` 
billboard.js will run on port 8000 if no other port is specified. Open your browser at localhost:8000 to read or on localhost:8000/write to write messages.


## Options

`--log <log file>`  the location where the chat log is stored

`--css <css file>` choose the design of your billboard. css files are stored in static/css

`--title <title>` the title for your billboard

`--port <portno>` the port on which the billboard runs

`--writelink <link>` the link name used for writing. Default is "write"

## Custom CSS

You can store custom CSS files in `static/css`. You'll find examples there.
