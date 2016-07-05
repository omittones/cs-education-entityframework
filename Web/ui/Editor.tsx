//<reference path="../shared/Interfaces.ts" />
import * as React from 'react'
import { Utils } from '../shared/Utils'

export class Editor extends React.Component<Interfaces.IEditorProps, {}> {

    constructor(props: Interfaces.IEditorProps, context: any) {
        super(props, context);
    }

    private handleKeydown(event: React.KeyboardEvent) {
        if (event.keyCode === 13) {
            let el = this.refs['newLineText'] as HTMLInputElement;
            if (this.props.lineAdded)
                this.props.lineAdded(el.value);
            el.value = '';
        }
    }

    public render() {
        return (
            <div>
                <ul>
                    {
                        this.props.lines.map((line: string, index:number) => {
                            return <li key={index}>{line}</li>
                        })
                    }
                </ul>
                <input ref="newLineText" type="text" onKeyDown={e => this.handleKeydown(e) }>
                </input>
            </div>);
    }
}