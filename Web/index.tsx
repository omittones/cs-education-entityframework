//<references path="./shared/Interfaces.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Footer } from './ui/Footer'

namespace utils {
    export interface ILogger {
        log(message: string): void;
    }
}

export function main(): void {

    let logger: utils.ILogger = console;
    logger.log('Test method!');

    let model: Interfaces.IFooterProps = { nowShowing: '1', completedCount: 0, count: 0, onClearCompleted: null };

    ReactDOM.render(
        <Footer model={model}/>,
        document.getElementsByClassName('app-container')[0]
    );
}