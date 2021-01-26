import { MenuItem } from "electron";

declare global {

    const invoker: InvokerAPI;
    
    interface PluginContext {
        readonly modelContextMenu: ContextMenuAPI;

        readonly navigation: NavigationAPI;

        readonly modelDetails: ModelDetailsAPI;

        executePhar: (parameters: object) => Promise<any>;
    }

    interface ModelDetailsAPI {
        /**
         * Adds a new component to the available model detail panels.
         */
        add(component: object): void;
    }

    interface NavigationAPI {
        /**
         * Adds a new component to the navigation bar.
         */
        add(component: object): void;
    }

    interface ContextMenuAPI {
        /**
         * Adds a new menu item to the context menu.
         */
        add(options: ContextMenuOptions): void;
    }

    interface ContextMenuOptions {
        item: MenuItem,
        isVisible: (selectedEntries: ModelEntry[], modelDefinition: ModelDefinition) => boolean
    }

    interface MenuItem {
        label: string,
        click: (selectedEntries: ModelEntry[], modelDefinition: ModelDefinition) => void
    }

    interface ModelEntry {
        [key: string]: any
    }

    interface ModelDefinition {
        attributes: ModelAttribute[],
        columns: ModelColumn[],
        model: Model
    }

    interface ModelColumn {
        cast: string,
        fillable: boolean,
        hidden: boolean,
        name: string,
        related?: string,
        relation_type?: string,
        title: string,
        type: string,
        values?: string[]
    }

    interface ModelAttribute {
        appended: boolean,
        cast: string,
        fillable: boolean,
        hidden: boolean,
        name: string,
        title: string,
        values?: string[]
    }

    interface Model {
        class: string,
        name: string,
        namespace: string,
        path: string,
        primaryKey: string,
        title: string
    }

    interface InvokerAPI {
        /**
         * Show a completely customized dialog using a custom Vue component.
         */
        showModal(title: string, component: object): void;

        /**
         * Show a confirmation dialog.
         */
        showConfirmation(options: ConfirmationOptions): void;

        /**
         * Evaluates the given PHP code. If the evaluated
         * code contains a return statement, Invoker will
         * try to return the JSON encoded value in the
         * result promise.
         */
        evaluate(code: string): Promise<any>;

        /**
         * Show a notification.
         */
        showNotification(options: NotificationOptions): void;

        /**
         * Returns the currently active project.
         */
        getProject(): Project;
    }

    interface Project {
        is_local: boolean,
        id: string,
        path: string,
        name: string,
    }

    interface NotificationOptions {
        title: string,
        text?: string,
        duration?: number,
        type?: 'error' | 'success'
    }

    interface ConfirmationOptions {
        title?: string,
        text?: string,
        component?: object,
        onConfirm?: () => void,
        confirmButtonClass?: string,
        cancelButtonClass?: string,
        confirmButtonText?: string,
        cancelButtonText?: string,
    }
} 

export {};
