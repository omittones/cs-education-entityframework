//<reference path="../shared/Interfaces.ts" />

import * as React from 'react'

import { Utils } from '../shared/Utils'

export class App extends React.Component<Interfaces.IAppProps, { nowShowing: string }> {

    constructor(props: Interfaces.IAppProps, context: any) {
        super(props, context);
        this.state = {
            nowShowing: this.props.firstShowing
        };
    }

    private handleNavClick(event: React.MouseEvent, nowShowing: string): void {
        this.setState((prev, props) => {
            if (prev.nowShowing === nowShowing)
                return prev;
            else
                return {
                    nowShowing: nowShowing
                };
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
        let state = this.state;
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <span className="brand-logo todo-count">
                            <strong>{this.props.count}</strong> {activeTodoWord} left
                        </span>
                        <ul className="filters right hide-on-med-and-down">
                            <li className={cx({ active: this.state.nowShowing == '1' }) }>
                                <a
                                    href="#/"
                                    onClick={e => this.handleNavClick(e, '1') }>
                                    All
                                </a>
                            </li>
                            <li className={cx({ active: this.state.nowShowing == '2' }) }>
                                <a
                                    href="#/active"
                                    onClick={e => this.handleNavClick(e, '2') }>
                                    Active
                                </a>
                            </li>
                            <li className={cx({ active: this.state.nowShowing == '3' }) }>
                                <a
                                    href="#/completed"
                                    onClick={e => this.handleNavClick(e, '3') }>
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