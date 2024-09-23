import { AutoBind, RenderComponent } from "./CustomDecorator.js";
import { BaseComponent } from './Type.js';

//import { currLoggedInUser, menuTextMap, roleMenuMap } from "./Data.js";

@RenderComponent("administration-component", "portal")
export class AdminComponent extends BaseComponent {
    headerBtn: HTMLButtonElement | undefined;
    tableCmpt : HTMLDivElement | undefined;

    constructor() {
        super();
    }

    init(): void {
        this.currentComponent = document.querySelector('.admin-component') as HTMLDivElement;
        this.headerBtn = document.querySelector('.admin-header') as HTMLButtonElement;
        this.tableCmpt = document.querySelector('.user-table-component') as HTMLDivElement;
        this.config();
    }
   
    private config() {
        this.headerBtn?.addEventListener('click', this.headerBtnClickHandler);
    }

    @AutoBind
    private headerBtnClickHandler(event : Event) {
        this.tableCmpt?.classList.toggle('hidden');
    }
}