namespace utils {
    export interface ILogger {
        log(message:string):void;
    }
}

export function main():void {
    var logger : utils.ILogger = console;
    logger.log('Test method!');
}