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
import { BaseComponent } from './Type.js';
import { LoginComponent } from "./LoginComponent.js";
import { changeCurrElement, confirmBoxComponent, createComponentFromMap, currElementPortal } from './app.js';
import { AutoBind } from './CustomDecorator.js';
import { currLoggedInUser, menuTextMap, roleMenuMap } from "./Data.js";
let LandingzoneComponent = class LandingzoneComponent extends BaseComponent {
    constructor() {
        super();
    }
    init() {
        this.logoutImg = document.querySelector('.logout-img');
        this.currentComponent = document.querySelector('.landing-zone');
        this.menuBarContainer = document.querySelector('.menu-holder');
        this.configure();
    }
    configure() {
        var _a;
        (_a = this.logoutImg) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.logoutHandler);
        this.drawMenu();
    }
    logoutHandler(event) {
        confirmBoxComponent.setup("Are you sure you want to logout?", this.doLogout);
    }
    doLogout() {
        this.destroy();
        changeCurrElement(new LoginComponent());
    }
    drawMenu() {
        const userRole = currLoggedInUser.role;
        const menuItems = roleMenuMap.get(userRole);
        let fullHtml = '';
        for (const menuItem of menuItems) {
            const menuText = menuTextMap.get(menuItem);
            const menuItemCreateText = `<div class="menu-itme-container">
                 <button class="menu-item ${menuItem}" data-component-assoc="${menuItem}">${menuText}</button>
                </div>`;
            fullHtml += menuItemCreateText;
        }
        if (fullHtml) {
            this.menuBarContainer.innerHTML = fullHtml;
        }
        for (const menuItem of menuItems) {
            const menuButton = document.querySelector(`.${menuItem}`);
            menuButton.addEventListener('click', () => {
                currElementPortal === null || currElementPortal === void 0 ? void 0 : currElementPortal.destroy();
                createComponentFromMap(menuItem);
            });
        }
    }
    ;
};
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], LandingzoneComponent.prototype, "logoutHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandingzoneComponent.prototype, "doLogout", null);
LandingzoneComponent = __decorate([
    RenderComponent("landing", "global-system-components"),
    __metadata("design:paramtypes", [])
], LandingzoneComponent);
export { LandingzoneComponent };
