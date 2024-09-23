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
import { BaseComponent } from "./Type.js";
import { AutoBind, ContainsUpperCase, MinLength, RenderComponent, Required } from "./CustomDecorator.js";
import { changeCurrElement, cloakCompenet, generalInfoComponent } from "./app.js";
import { LoginComponent } from "./LoginComponent.js";
import { saveUserSignUp, validate } from './Util.js';
import { currElement } from './app.js';
let SignupComponent = class SignupComponent extends BaseComponent {
    constructor() {
        super();
        this.usernameDirty = false;
        this.passwordDirty = false;
        this.confpasswordDirty = false;
        this.username = '';
        this.userrole = 'normal';
        this.password = '';
        this.confpassword = '';
    }
    init() {
        this.currentComponent = document.querySelector('.signup-contianer');
        this.signupCloseBtn = document.querySelector('#signup-close');
        this.signupCancelBtn = document.querySelector('.signup-cancel');
        this.signupForm = document.querySelector('#signup-form');
        this.signupSaveBtn = document.querySelector('.signup-save');
        this.signupComponentUserId = document.querySelector('.choosen-userid');
        this.signupComponentPassword = document.querySelector('.choosen-pwd');
        this.signupComponentConfirmPassword = document.querySelector('.choosen-pwd1');
        this.signupRoleSelect = document.querySelector('.signup-select');
        this.errorContianer = document.querySelector('.error-container');
        this.showPwd = document.querySelector('.pwd');
        this.showConfPwd = document.querySelector('.confPwd');
        this.configure();
    }
    configure() {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.signupComponentUserId) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.userIdChangehandler);
        (_b = this.signupRoleSelect) === null || _b === void 0 ? void 0 : _b.addEventListener('change', this.roleChangeHandler);
        (_c = this.signupComponentPassword) === null || _c === void 0 ? void 0 : _c.addEventListener('change', this.passwordChangehandler);
        (_d = this.signupComponentConfirmPassword) === null || _d === void 0 ? void 0 : _d.addEventListener('change', this.confpasswordChangehandler);
        this.signupCloseBtn.addEventListener('click', this.closeEventHandler);
        this.signupCancelBtn.addEventListener('click', this.closeEventHandler);
        (_e = this.showPwd) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.showPwdEventHandler);
        this.showConfPwd.addEventListener('click', this.showPwdConfEventHandler);
        (_f = this.signupSaveBtn) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.saveEventhandler);
    }
    closeEventHandler(event) {
        this.destroy();
        changeCurrElement(new LoginComponent());
    }
    userIdChangehandler(event) {
        this.username = this.signupComponentUserId.value;
        this.usernameDirty = true;
        const validity = validate(currElement);
        if (!validity[0]) {
            this.errorContianer.innerHTML = `<p class="error-message">* ${validity[1]}</p>`;
        }
        else {
            this.errorContianer.innerHTML = '';
        }
    }
    roleChangeHandler(event) {
        this.userrole = this.signupRoleSelect.value;
    }
    passwordChangehandler(event) {
        var _a;
        this.password = this.signupComponentPassword.value;
        this.passwordDirty = true;
        const validity = validate(currElement);
        this.signupComponentPassword.classList.add('dirty');
        if (!validity[0]) {
            this.errorContianer.innerHTML = `<p class="error-message">* ${validity[1]}</p>`;
        }
        else {
            this.errorContianer.innerHTML = '';
            if (this.validatePwd()) {
                (_a = this.signupSaveBtn) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
            }
        }
    }
    confpasswordChangehandler(event) {
        var _a;
        this.confpassword = this.signupComponentConfirmPassword.value;
        this.confpasswordDirty = true;
        const validity = validate(currElement);
        this.signupComponentConfirmPassword.classList.add('dirty');
        if (!validity[0]) {
            this.errorContianer.innerHTML = `<p class="error-message">* ${validity[1]}</p>`;
        }
        else {
            this.errorContianer.innerHTML = '';
            if (this.validatePwd()) {
                (_a = this.signupSaveBtn) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
            }
            else {
                this.errorContianer.innerHTML = `<p class="error-message">* Password and ConfirmPassword is not same</p>`;
            }
        }
    }
    showPwdEventHandler(event) {
        var _a, _b;
        if (event.target.checked) {
            (_a = this.signupComponentPassword) === null || _a === void 0 ? void 0 : _a.setAttribute('type', 'text');
        }
        else {
            (_b = this.signupComponentPassword) === null || _b === void 0 ? void 0 : _b.setAttribute('type', 'password');
        }
    }
    showPwdConfEventHandler(event) {
        var _a, _b;
        if (event.target.checked) {
            (_a = this.signupComponentConfirmPassword) === null || _a === void 0 ? void 0 : _a.setAttribute('type', 'text');
        }
        else {
            (_b = this.signupComponentConfirmPassword) === null || _b === void 0 ? void 0 : _b.setAttribute('type', 'password');
        }
    }
    saveEventhandler() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            cloakCompenet.init();
            const returnVal = yield saveUserSignUp(this.username, this.password, this.userrole);
            cloakCompenet.destroy();
            if (!returnVal) {
                this.errorContianer.innerHTML = `<p class="error-message">* Same username exists</p>`;
            }
            else {
                generalInfoComponent.setMessage = 'Record Saved';
                (_a = this.signupForm) === null || _a === void 0 ? void 0 : _a.reset();
            }
        });
    }
    validatePwd() {
        if (this.signupComponentConfirmPassword.classList.contains('dirty') &&
            this.signupComponentPassword.classList.contains('dirty')) {
            return this.password === this.confpassword;
        }
        return false;
    }
};
__decorate([
    MinLength(3),
    Required,
    __metadata("design:type", String)
], SignupComponent.prototype, "username", void 0);
__decorate([
    ContainsUpperCase,
    MinLength(6),
    Required,
    __metadata("design:type", String)
], SignupComponent.prototype, "password", void 0);
__decorate([
    ContainsUpperCase,
    MinLength(6),
    Required,
    __metadata("design:type", String)
], SignupComponent.prototype, "confpassword", void 0);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], SignupComponent.prototype, "closeEventHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], SignupComponent.prototype, "userIdChangehandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], SignupComponent.prototype, "roleChangeHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], SignupComponent.prototype, "passwordChangehandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], SignupComponent.prototype, "confpasswordChangehandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], SignupComponent.prototype, "showPwdEventHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], SignupComponent.prototype, "showPwdConfEventHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SignupComponent.prototype, "saveEventhandler", null);
SignupComponent = __decorate([
    RenderComponent('signup', 'global-system-components'),
    __metadata("design:paramtypes", [])
], SignupComponent);
export { SignupComponent };
;
