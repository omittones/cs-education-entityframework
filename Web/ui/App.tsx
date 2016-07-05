//<reference path="../shared/Interfaces.ts" />
import * as React from 'react'
import { Utils } from '../shared/Utils'
import { Editor } from './Editor'

export class App extends React.Component<Interfaces.IAppProps, { nowShowing: string, lines: Array<string> }> {

    constructor(props: Interfaces.IAppProps, context: any) {
        super(props, context);
        this.state = {
            nowShowing: this.props.firstShowing,
            lines: ['1', '2', '3', '4']
        };
    }

    private handleNavClick(event: React.MouseEvent, nowShowing: string): void {
        this.setState((prev, props) => {
            if (prev.nowShowing === nowShowing)
                return prev;
            else
                return {
                    nowShowing: nowShowing,
                    lines: prev.lines
                };
        });
    }

    private addLine(line: string) {
        this.setState((prev, props) => {
            var lines = prev.lines;
            lines.push(line);
            return {
                nowShowing: prev.nowShowing,
                lines: lines
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
                <div>
                    <Editor lineAdded={line => this.addLine(line) } lines={this.state.lines}>
                    </Editor>
                </div>
                {clearButton}
            </div>
        );
    }
}