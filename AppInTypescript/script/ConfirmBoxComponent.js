var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AutoBind, RenderComponent } from "./CustomDecorator.js";
let ConfirmBoxComponent = class ConfirmBoxComponent {
    constructor() {
        this.message = '';
    }
    init() {
        this.confirmComponent = document.querySelector('.confirm-component');
        this.confirmText = document.querySelector('.confirmation-text');
        this.okBtn = document.querySelector('.confirmation-ok');
        this.cancelBtn = document.querySelector('.confirmation-cancel');
        this.configure();
    }
    setup(message, fnToExecute) {
        var _a;
        this.confirmText.innerText = message;
        (_a = this.confirmComponent) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        this.message = message;
        this.fnToExecute = fnToExecute;
    }
    configure() {
        var _a, _b;
        (_a = this.okBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.okHandler);
        (_b = this.cancelBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.cancelHandler);
    }
    okHandler() {
        var _a;
        if (this.fnToExecute) {
            this.fnToExecute();
        }
        (_a = this.confirmComponent) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    }
    cancelHandler() {
        var _a;
        (_a = this.confirmComponent) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    }
};
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConfirmBoxComponent.prototype, "okHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConfirmBoxComponent.prototype, "cancelHandler", null);
ConfirmBoxComponent = __decorate([
    RenderComponent("confirm-box", "confirm-box-portal")
], ConfirmBoxComponent);
export { ConfirmBoxComponent };
