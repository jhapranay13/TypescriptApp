var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RenderComponent } from "./CustomDecorator.js";
import { BaseComponent } from "./Type.js";
let CloakComponent = class CloakComponent extends BaseComponent {
    constructor() {
        super();
    }
    init() {
        this.currentComponent = document.querySelector('.cloak');
        this.cloak = this.currentComponent;
        this.loader = document.querySelector('.loader');
        this.configure();
    }
    configure() {
        var _a, _b;
        (_a = this.cloak) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        (_b = this.loader) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    }
    destroy() {
        var _a, _b;
        (_a = this.cloak) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = this.loader) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
    }
};
CloakComponent = __decorate([
    RenderComponent("cloak-loader", "cloak-portal"),
    __metadata("design:paramtypes", [])
], CloakComponent);
export { CloakComponent };
