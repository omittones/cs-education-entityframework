//<references path="./shared/Interfaces.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './ui/App'
import { Editor } from './ui/Editor'

namespace utils {
    export interface ILogger {
        log(message: string): void;
    }
}

let logger: utils.ILogger = console;
logger.log('Test method!');

ReactDOM.render(
    <App completedCount={1}
         firstShowing="2"
         count={1}>
    </App>,
    document.getElementsByClassName('container')[0]
);