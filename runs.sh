#!/bin/bash
function dojade {
    while :
    do
        sleep 1
        inotifywait -e modify index.jade
        sleep .5
        jade index.jade
    done
}
dojade&
scss --watch index.scss:index.css
