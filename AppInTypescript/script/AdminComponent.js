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
import { BaseComponent } from './Type.js';
//import { currLoggedInUser, menuTextMap, roleMenuMap } from "./Data.js";
let AdminComponent = class AdminComponent extends BaseComponent {
    constructor() {
        super();
    }
    init() {
        this.currentComponent = document.querySelector('.admin-component');
        this.headerBtn = document.querySelector('.admin-header');
        this.tableCmpt = document.querySelector('.user-table-component');
        this.config();
    }
    config() {
        var _a;
        (_a = this.headerBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.headerBtnClickHandler);
    }
    headerBtnClickHandler(event) {
        var _a;
        (_a = this.tableCmpt) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden');
    }
};
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "headerBtnClickHandler", null);
AdminComponent = __decorate([
    RenderComponent("administration-component", "portal"),
    __metadata("design:paramtypes", [])
], AdminComponent);
export { AdminComponent };
