namespace Interfaces {

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

    // Defines the interface of the properties of the Footer component
    export interface IFooterProps {
        completedCount: number;
        onClearCompleted?: any;
        nowShowing: string;
        count: number;
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

    // Defines the interface of the properties of the App component
    export interface IAppProps {
        model: ITodoModel;
    }

    // Defines the interface of the state of the App component
    export interface IAppState {
        editing?: string;
        nowShowing?: string
    }
}