import * as utils from './Utils';

export function main():void {

    var logger : utils.ILogger = console;
    logger.log('Test method!');

    logger = new utils.EnableDecorator(console, true);
    logger.log('Test method!');

    logger = new utils.EnableDecorator(console, false);
    logger.log('Test method!');

}