namespace Interfaces {

    export interface IEditorProps {
        lines:Array<string>;
        lineAdded?: (line: string)=>void;
    }

    export interface IAppProps {
        completedCount: number;
        onClearCompleted?: any;
        firstShowing: string;
        count: number;
    }

    // Defines the interface of the structure of a task
    export interface ITodo {
        id: string,
        title: string,
        completed: boolean
    }

    // Defines the interface of the properties of the TodoItem component
    export interface ITodoItemProps {
        key: string,
        todo: ITodo;
        editing?: boolean;
        onSave: (val: any) => void;
        onDestroy: () => void;
        onEdit: () => void;
        onCancel: (event: any) => void;
        onToggle: () => void;
    }

    // Defines the interface of the state of the TodoItem component
    export interface ITodoItemState {
        editText: string
    }

    // Defines the TodoModel interface
    export interface ITodoModel {
        key: any;
        todos: Array<ITodo>;
        onChanges: Array<any>;
        subscribe(onChange);
        inform();
        addTodo(title: string);
        toggleAll(checked);
        toggle(todoToToggle);
        destroy(todo);
        save(todoToSave, text);
        clearCompleted();
    }

    // Defines the interface of the state of the App component
    export interface IAppState {
        editing?: string;
        nowShowing?: string
    }
}