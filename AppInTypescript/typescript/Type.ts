export abstract class BaseComponent {
    protected  currentComponent: HTMLDivElement | undefined;
    abstract init() : void;
    public destroy() : void {
        this.currentComponent?.remove();
    };
}

export type UserRole = {
    userName: string,
    password: string,
    role: string,
};

export type SelectedUser = {
    userName: string,
    password: string,
    role: string,
    selectedIndex: string
};