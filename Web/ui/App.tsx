//<reference path="../shared/Interfaces.ts" />

import * as React from 'react'

import { Utils } from '../shared/Utils'

export class App extends React.Component<Interfaces.IAppProps, any> {

    private  handleNavClick(button:string):void {
        this.setState((prev, props) => {
            debugger;

            return prev;
        });
    }

    public render() {

        var activeTodoWord = Utils.pluralize(this.props.count, 'item');
        var clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="waves-effect waves-light btn-large clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed
                </button>
            );
        }

        let cx = Utils.renderClass;
        let nowShowing: string = this.props.nowShowing;
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <span className="brand-logo todo-count">
                            <strong>{this.props.count}</strong> {activeTodoWord} left
                        </span>
                        <ul className="filters right hide-on-med-and-down">
                            <li>
                                <a
                                    href="#/"
                                    className={cx({ active: nowShowing == '1' })}
                                    onClick={e => this.handleNavClick('1')}>
                                    All
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/active"
                                    className={cx({ active: nowShowing == '2' })}
                                    onClick={e => this.handleNavClick('2')}>
                                    Active
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/completed"
                                    className={cx({ active: nowShowing == '3' }) }
                                    onClick={e => this.handleNavClick('3')}>
                                    Completed
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                {clearButton}
            </div>
        );
    }
}