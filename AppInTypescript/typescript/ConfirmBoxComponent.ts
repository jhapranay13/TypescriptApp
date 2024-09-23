import { AutoBind, RenderComponent } from "./CustomDecorator.js";

@RenderComponent("confirm-box", "confirm-box-portal")
export class ConfirmBoxComponent {
    confirmComponent : HTMLDivElement | undefined;
    confirmText : HTMLParagraphElement | undefined;
    okBtn : HTMLButtonElement | undefined;
    cancelBtn : HTMLButtonElement | undefined;
    message : string = '';
    fnToExecute : Function | undefined;

    init() {
        this.confirmComponent = document.querySelector('.confirm-component') as HTMLDivElement;
        this.confirmText = document.querySelector('.confirmation-text') as HTMLParagraphElement;
        this.okBtn = document.querySelector('.confirmation-ok') as HTMLButtonElement;
        this.cancelBtn = document.querySelector('.confirmation-cancel') as HTMLButtonElement;
        this.configure();
    }

    setup(message: string, fnToExecute: Function) {
        this.confirmText!.innerText = message;
        this.confirmComponent?.classList.remove('hidden');
        this.message = message;
        this.fnToExecute = fnToExecute;
    }

    private configure() {
        this.okBtn?.addEventListener('click', this.okHandler);
        this.cancelBtn?.addEventListener('click', this.cancelHandler)
    }

    @AutoBind
    private okHandler() {

        if (this.fnToExecute) {
            this.fnToExecute();
        }
        this.confirmComponent?.classList.add('hidden');
    }

    @AutoBind
    private cancelHandler() {
        this.confirmComponent?.classList.add('hidden');
    }
}