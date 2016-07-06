set bin="./node_modules/.bin"

call %bin%/tsc.cmd

call %bin%/browserify.cmd ./obj/index.js ./obj/details.js --debug -p [ factor-bundle -o ./bin/index.js -o ./bin/details.js ] -o ./bin/common.js