import { RenderComponent } from "./CustomDecorator.js";
import { BaseComponent } from "./Type.js";

@RenderComponent("cloak-loader", "cloak-portal")
export class CloakComponent extends BaseComponent{
    cloak : HTMLDivElement | undefined;
    loader : HTMLDivElement | undefined;

    constructor() {
        super();
    }

    init(): void {
        this.currentComponent = document.querySelector('.cloak') as HTMLDivElement;
        this.cloak =  this.currentComponent;
        this.loader = document.querySelector('.loader') as HTMLDivElement;
        this.configure();
    }

    configure(): void {
        this.cloak?.classList.remove('hidden');
        this.loader?.classList.remove('hidden');
    }

    destroy() {
        this.cloak?.classList.add('hidden');
        this.loader?.classList.add('hidden');
    }

}