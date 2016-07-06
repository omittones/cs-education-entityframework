set bin=./node_modules/.bin

call %bin%/onchange ./** -e ./bin -e ./obj -w -- build.bat