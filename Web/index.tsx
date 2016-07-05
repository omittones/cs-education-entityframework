//<references path="./shared/Interfaces.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './ui/App'

namespace utils {
    export interface ILogger {
        log(message: string): void;
    }
}

export function main(): void {

    let logger: utils.ILogger = console;
    logger.log('Test method!');

    let model: Interfaces.IAppProps = { nowShowing: '1', completedCount: 0, count: 0, onClearCompleted: null };

    ReactDOM.render(
        <App completedCount={1}
             nowShowing="2"
             count={1} />,
        document.getElementsByClassName('container')[0]
    );
}