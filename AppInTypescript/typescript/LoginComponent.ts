import { changeCurrElement, cloakCompenet, currElement } from "./app.js";
import { BaseComponent } from "./Type.js";
import { AutoBind, RenderComponent, Required } from "./CustomDecorator.js";
import { SignupComponent } from "./SignupComponent.js";
import { loginFetch, validate } from "./Util.js";
import { LandingzoneComponent } from './LandingzoneComponent.js';

@RenderComponent('login', 'global-system-components')
export class LoginComponent extends BaseComponent {
    userName: HTMLInputElement | undefined;
    password: HTMLInputElement | undefined;
    loginBtn: HTMLInputElement | undefined;
    signUp: HTMLAnchorElement | undefined;
    showPassword : HTMLInputElement | undefined;
    loginError : HTMLParagraphElement | undefined;
    @Required
    userNameStr: string;
    userNameStrDirty : boolean = false;
    userNameValid : boolean = false;
    @Required
    passwordStr: string;
    passwordStrDirty: boolean = false;
    passwordValid : boolean = false;

    constructor() {
       // can create render logic here as well. In case of that we
       // can use templateLement clone to query other elements and
       // attatch events and classes to it.
       super();
       this.userNameStr='';
       this.passwordStr='';
    }

    public init(): void {
        this.currentComponent = document.querySelector('.login')! as HTMLInputElement;
        this.userName = document.querySelector('.login-userid')! as HTMLInputElement;
        this.password = document.querySelector('.login-password')! as HTMLInputElement;
        this.loginBtn = document.querySelector('.login-button')! as HTMLInputElement;
        this.showPassword = document.querySelector('.show-pwd-checkbox')! as HTMLInputElement;
        this.signUp = document.querySelector('.signup-link')! as HTMLAnchorElement;
        this.loginError = document.querySelector('.login-uname-error') as HTMLParagraphElement;
        this.configure();
    }

    private configure() : void {
        this.userName!.addEventListener('change', this.userNameChangeHandler);
        this.password!.addEventListener('change', this.passwordChangeHandler);
        this.loginBtn!.addEventListener('click', this.loginBtnClickHandler);
        this.signUp!.addEventListener('click', this.signupClickHandler);
        this.showPassword?.addEventListener('click', this.showPwdHandler)
    }

    @AutoBind
    private userNameChangeHandler(event: Event) {
        this.userNameStr = (event!.target as HTMLInputElement).value;
        this.userNameStrDirty = true;
        const validity : [boolean, string] = validate(currElement);
        this.userNameValid = validity[0]

        if (this.userNameValid && this.passwordValid) {
            this.loginBtn!.disabled = false;
        } else {
            this.loginBtn!.setAttribute("disabled", "disabled");
        }
    }

    @AutoBind
    private passwordChangeHandler(event: Event) {
        this.passwordStr = (event!.target as HTMLInputElement).value;
        this.passwordStrDirty = true;
        const validity : [boolean, string] = validate(currElement);
        this.passwordValid = validity[0];

        if (this.userNameValid && this.passwordValid) {
            this.loginBtn!.removeAttribute("disabled");
        } else {
            this.loginBtn!.setAttribute("disabled", "disabled");
        }
    }

    @AutoBind
    private async loginBtnClickHandler(event : Event) {
        cloakCompenet.init();
        const loginSuccess = await loginFetch(this.userNameStr, this.passwordStr)
        cloakCompenet.destroy();

        if (!loginSuccess) {
            this.loginError!.classList.remove('hidden');
        } else {
            this.destroy();
            changeCurrElement(new LandingzoneComponent());
        }
        
    }

    @AutoBind
    private signupClickHandler(event : Event) {
        this.destroy();
        changeCurrElement(new SignupComponent());
    }

    @AutoBind
    private showPwdHandler(event : Event) {
        const target = event.target as HTMLInputElement;
        
        if (target.checked) {
            this.password?.setAttribute('type', 'text');
        } else {
            this.password!.type = 'password';
        }
    }
}
