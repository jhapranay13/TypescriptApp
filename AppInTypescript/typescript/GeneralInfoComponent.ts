import { AutoBind, RenderComponent } from "./CustomDecorator.js";
import { BaseComponent } from "./Type.js";

@RenderComponent("general-info", "info-box-portal")
export class GeneralInfoComponent extends BaseComponent{
    
    ginfo : HTMLDivElement | undefined;
    ginfoText : HTMLParagraphElement | undefined;
    okBtn: HTMLButtonElement | undefined;
    closeBtn: HTMLDivElement | undefined;

    message : string = '';

    constructor() {
        super();
    }

    init(): void {
        this.ginfo = document.querySelector('.ginfo') as HTMLDivElement;
        this.ginfoText = document.querySelector('.info-text') as HTMLParagraphElement;
        this.okBtn = document.querySelector('.info-ok-btn') as HTMLButtonElement;
        this.closeBtn = document.querySelector('.text-x') as HTMLDivElement;
        this.config();
    }

    private config() : void {
        this.okBtn!.addEventListener('click', this.okHandler);
        this.closeBtn?.addEventListener('click', this.okHandler)
    }

    @AutoBind
    private okHandler(event : Event) {
        this.ginfo?.classList.add('hidden');
    }
   
    set setMessage(message: string) {
        this.message = message;
        this.ginfoText!.innerText = message;
        this.ginfo?.classList.remove('hidden');
    }
}