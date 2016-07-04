///<reference path="utils.ts" />

var logger : ILogger = console;
logger.log('Test method!');

logger = new EnableDecorator(console, true);
logger.log('Test method!');

logger = new EnableDecorator(console, false);
logger.log('Test method!');