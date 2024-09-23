var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { changeCurrElement, cloakCompenet, currElement } from "./app.js";
import { BaseComponent } from "./Type.js";
import { AutoBind, RenderComponent, Required } from "./CustomDecorator.js";
import { SignupComponent } from "./SignupComponent.js";
import { loginFetch, validate } from "./Util.js";
import { LandingzoneComponent } from './LandingzoneComponent.js';
let LoginComponent = class LoginComponent extends BaseComponent {
    constructor() {
        // can create render logic here as well. In case of that we
        // can use templateLement clone to query other elements and
        // attatch events and classes to it.
        super();
        this.userNameStrDirty = false;
        this.userNameValid = false;
        this.passwordStrDirty = false;
        this.passwordValid = false;
        this.userNameStr = '';
        this.passwordStr = '';
    }
    init() {
        this.currentComponent = document.querySelector('.login');
        this.userName = document.querySelector('.login-userid');
        this.password = document.querySelector('.login-password');
        this.loginBtn = document.querySelector('.login-button');
        this.showPassword = document.querySelector('.show-pwd-checkbox');
        this.signUp = document.querySelector('.signup-link');
        this.loginError = document.querySelector('.login-uname-error');
        this.configure();
    }
    configure() {
        var _a;
        this.userName.addEventListener('change', this.userNameChangeHandler);
        this.password.addEventListener('change', this.passwordChangeHandler);
        this.loginBtn.addEventListener('click', this.loginBtnClickHandler);
        this.signUp.addEventListener('click', this.signupClickHandler);
        (_a = this.showPassword) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.showPwdHandler);
    }
    userNameChangeHandler(event) {
        this.userNameStr = event.target.value;
        this.userNameStrDirty = true;
        const validity = validate(currElement);
        this.userNameValid = validity[0];
        if (this.userNameValid && this.passwordValid) {
            this.loginBtn.disabled = false;
        }
        else {
            this.loginBtn.setAttribute("disabled", "disabled");
        }
    }
    passwordChangeHandler(event) {
        this.passwordStr = event.target.value;
        this.passwordStrDirty = true;
        const validity = validate(currElement);
        this.passwordValid = validity[0];
        if (this.userNameValid && this.passwordValid) {
            this.loginBtn.removeAttribute("disabled");
        }
        else {
            this.loginBtn.setAttribute("disabled", "disabled");
        }
    }
    loginBtnClickHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            cloakCompenet.init();
            const loginSuccess = yield loginFetch(this.userNameStr, this.passwordStr);
            cloakCompenet.destroy();
            if (!loginSuccess) {
                this.loginError.classList.remove('hidden');
            }
            else {
                this.destroy();
                changeCurrElement(new LandingzoneComponent());
            }
        });
    }
    signupClickHandler(event) {
        this.destroy();
        changeCurrElement(new SignupComponent());
    }
    showPwdHandler(event) {
        var _a;
        const target = event.target;
        if (target.checked) {
            (_a = this.password) === null || _a === void 0 ? void 0 : _a.setAttribute('type', 'text');
        }
        else {
            this.password.type = 'password';
        }
    }
};
__decorate([
    Required,
    __metadata("design:type", String)
], LoginComponent.prototype, "userNameStr", void 0);
__decorate([
    Required,
    __metadata("design:type", String)
], LoginComponent.prototype, "passwordStr", void 0);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], LoginComponent.prototype, "userNameChangeHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], LoginComponent.prototype, "passwordChangeHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", Promise)
], LoginComponent.prototype, "loginBtnClickHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], LoginComponent.prototype, "signupClickHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], LoginComponent.prototype, "showPwdHandler", null);
LoginComponent = __decorate([
    RenderComponent('login', 'global-system-components'),
    __metadata("design:paramtypes", [])
], LoginComponent);
export { LoginComponent };
