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
import { BaseComponent } from "./Type.js";
let GeneralInfoComponent = class GeneralInfoComponent extends BaseComponent {
    constructor() {
        super();
        this.message = '';
    }
    init() {
        this.ginfo = document.querySelector('.ginfo');
        this.ginfoText = document.querySelector('.info-text');
        this.okBtn = document.querySelector('.info-ok-btn');
        this.closeBtn = document.querySelector('.text-x');
        this.config();
    }
    config() {
        var _a;
        this.okBtn.addEventListener('click', this.okHandler);
        (_a = this.closeBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.okHandler);
    }
    okHandler(event) {
        var _a;
        (_a = this.ginfo) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    }
    set setMessage(message) {
        var _a;
        this.message = message;
        this.ginfoText.innerText = message;
        (_a = this.ginfo) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    }
};
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], GeneralInfoComponent.prototype, "okHandler", null);
GeneralInfoComponent = __decorate([
    RenderComponent("general-info", "info-box-portal"),
    __metadata("design:paramtypes", [])
], GeneralInfoComponent);
export { GeneralInfoComponent };
