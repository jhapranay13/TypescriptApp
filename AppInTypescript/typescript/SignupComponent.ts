import { BaseComponent } from "./Type.js";
import { AutoBind, ContainsUpperCase, MinLength, RenderComponent, Required } from "./CustomDecorator.js";
import { changeCurrElement, cloakCompenet, generalInfoComponent } from "./app.js";
import { LoginComponent } from "./LoginComponent.js";
import { saveUserSignUp, validate } from './Util.js';
import { currElement } from './app.js';

@RenderComponent('signup', 'global-system-components')
export class SignupComponent extends BaseComponent {
    signupCloseBtn: HTMLElement | undefined;
    signupCancelBtn: HTMLButtonElement | undefined;
    signupForm : HTMLFormElement | undefined;
    signupSaveBtn : HTMLButtonElement | undefined;
    signupComponentUserId : HTMLInputElement | undefined;
    signupComponentPassword : HTMLInputElement | undefined;
    signupComponentConfirmPassword : HTMLInputElement | undefined;
    signupRoleSelect: HTMLSelectElement | undefined;
    errorContianer: HTMLDivElement | undefined;
    showPwd: HTMLInputElement | undefined;
    showConfPwd: HTMLInputElement | undefined;
    
    @MinLength(3)
    @Required
    username: string;

    usernameDirty : boolean = false;

    userrole: string;

    @ContainsUpperCase
    @MinLength(6)
    @Required
    password: string;

    passwordDirty : boolean = false;

    @ContainsUpperCase
    @MinLength(6)
    @Required
    confpassword: string;
    confpasswordDirty: boolean = false;

    constructor() {
        super();
        this.username='';
        this.userrole='normal';
        this.password='';
        this.confpassword = '';
    }

    public init(): void {
        this.currentComponent = document.querySelector('.signup-contianer') as HTMLDivElement;
        this.signupCloseBtn = document.querySelector('#signup-close') as HTMLElement;
        this.signupCancelBtn = document.querySelector('.signup-cancel') as HTMLButtonElement;
        this.signupForm = document.querySelector('#signup-form') as HTMLFormElement;
        this.signupSaveBtn = document.querySelector('.signup-save') as HTMLButtonElement;
        this.signupComponentUserId = document.querySelector('.choosen-userid') as HTMLInputElement;
        this.signupComponentPassword = document.querySelector('.choosen-pwd') as HTMLInputElement;
        this.signupComponentConfirmPassword = document.querySelector('.choosen-pwd1') as HTMLInputElement;
        this.signupRoleSelect = document.querySelector('.signup-select') as HTMLSelectElement;
        this.errorContianer = document.querySelector('.error-container') as HTMLDivElement;
        this.showPwd = document.querySelector('.pwd') as HTMLInputElement;
        this.showConfPwd = document.querySelector('.confPwd') as HTMLInputElement;
        this.configure();
    }

    private configure() : void {
        this.signupComponentUserId?.addEventListener('change', this.userIdChangehandler);
        this.signupRoleSelect?.addEventListener('change', this.roleChangeHandler);
        this.signupComponentPassword?.addEventListener('change', this.passwordChangehandler)
        this.signupComponentConfirmPassword?.addEventListener('change', this.confpasswordChangehandler)
        this.signupCloseBtn!.addEventListener('click', this.closeEventHandler);
        this.signupCancelBtn!.addEventListener('click', this.closeEventHandler);
        this.showPwd?.addEventListener('click', this.showPwdEventHandler);
        this.showConfPwd!.addEventListener('click', this.showPwdConfEventHandler);
        this.signupSaveBtn?.addEventListener('click', this.saveEventhandler);
    }

    @AutoBind
    private closeEventHandler(event : Event) {
        this.destroy();
        changeCurrElement(new LoginComponent());
    }
   
    @AutoBind
    private userIdChangehandler(event : Event) {
        this.username = (<HTMLInputElement>this.signupComponentUserId!).value;
        this.usernameDirty = true;
        const validity : [boolean, string] = validate(currElement);
        
        if (!validity[0]) {
            this.errorContianer!.innerHTML =`<p class="error-message">* ${validity[1]}</p>`;
        } else {
            this.errorContianer!.innerHTML = '';
        }
    }

    @AutoBind
    private roleChangeHandler(event : Event) {
        this.userrole = (<HTMLSelectElement>this.signupRoleSelect)!.value
    }

    @AutoBind
    private passwordChangehandler(event: Event) {
        this.password = (this.signupComponentPassword as HTMLInputElement)!.value;
        this.passwordDirty = true;
        const validity : [boolean, string] = validate(currElement);
        this.signupComponentPassword!.classList.add('dirty');

        if (!validity[0]) {
            this.errorContianer!.innerHTML =`<p class="error-message">* ${validity[1]}</p>`;
        } else {
            this.errorContianer!.innerHTML = '';
           
            if(this.validatePwd()) {
                this.signupSaveBtn?.removeAttribute('disabled');   
            }
        }  
    }

    @AutoBind
    private confpasswordChangehandler(event: Event) {
        this.confpassword = (this.signupComponentConfirmPassword as HTMLInputElement)!.value;
        this.confpasswordDirty = true;
        const validity : [boolean, string] = validate(currElement);
        this.signupComponentConfirmPassword!.classList.add('dirty');

        if (!validity[0]) {
            this.errorContianer!.innerHTML =`<p class="error-message">* ${validity[1]}</p>`;
        } else {
            this.errorContianer!.innerHTML = '';

            if(this.validatePwd()) {
                this.signupSaveBtn?.removeAttribute('disabled');   
            } else {
                this.errorContianer!.innerHTML =`<p class="error-message">* Password and ConfirmPassword is not same</p>`;
            }
        }
    }

    @AutoBind
    private showPwdEventHandler(event : Event) {

        if ((event.target as HTMLInputElement)!.checked) {
            this.signupComponentPassword?.setAttribute('type', 'text');
        } else {
            this.signupComponentPassword?.setAttribute('type', 'password');
        }
    }

    @AutoBind
    private showPwdConfEventHandler(event : Event) {

        if ((event.target as HTMLInputElement)!.checked) {
            this.signupComponentConfirmPassword?.setAttribute('type', 'text');
        } else {
            this.signupComponentConfirmPassword?.setAttribute('type', 'password');
        }
    }

    @AutoBind
    private async saveEventhandler() {
        cloakCompenet.init();
        const returnVal = await saveUserSignUp(this.username, this.password, this.userrole)
        cloakCompenet.destroy();
        
        if (!returnVal) {
            this.errorContianer!.innerHTML =`<p class="error-message">* Same username exists</p>`;
        } else {
            generalInfoComponent!.setMessage = 'Record Saved';
            this.signupForm?.reset();
        }

    }

    private validatePwd() : boolean {

        if (this.signupComponentConfirmPassword!.classList.contains('dirty') && 
            this.signupComponentPassword!.classList.contains('dirty')) {
            return this.password === this.confpassword;
        }
        return false;
    }
};

