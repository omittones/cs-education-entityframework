//<reference path="../shared/Interfaces.ts" />

import * as React from 'react'

import { Utils } from '../shared/Utils'

export class Footer extends React.Component<Interfaces.IFooterProps, {}> {

    public render() {

        var activeTodoWord = Utils.pluralize(this.props.count, 'item');
        var clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed
                </button>
            );
        }

        // React idiom for shortcutting to `classSet` since it'll be used often
        //var cx = React.addons.classSet;
        var cx = function(object:any) {
            for(var prop in object) {
                if (object[prop] == true) {
                    return prop;
                }
            }
        };

        var nowShowing:string = this.props.nowShowing;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoWord} left
                </span>
                <ul className="filters">
                    <li>
                        <a
                            href="#/"
                            className={cx({ selected: nowShowing == '1' }) }>
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/active"
                            className={cx({ selected: nowShowing == '2' }) }>
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/completed"
                            className={cx({ selected: nowShowing == '3' }) }>
                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
}