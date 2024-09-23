import { RenderComponent } from "./CustomDecorator.js";
import { BaseComponent } from './Type.js';
import { LoginComponent } from "./LoginComponent.js";
import { changeCurrElement, confirmBoxComponent, createComponentFromMap, currElementPortal } from './app.js';
import { AutoBind } from './CustomDecorator.js';
import { currLoggedInUser, menuTextMap, roleMenuMap } from "./Data.js";


@RenderComponent("landing", "global-system-components")
export class LandingzoneComponent extends BaseComponent {
    logoutImg : HTMLImageElement | undefined;
    menuBarContainer: HTMLDivElement | undefined

    constructor() {
        super();
    }

    init(): void {
        this.logoutImg = document.querySelector('.logout-img') as HTMLImageElement;
        this.currentComponent = document.querySelector('.landing-zone') as HTMLDivElement;
        this.menuBarContainer = document.querySelector('.menu-holder') as HTMLDivElement;
        this.configure();
    }

    private configure() {
        this.logoutImg?.addEventListener('click', this.logoutHandler);
        this.drawMenu();
    }

    @AutoBind
    private logoutHandler(event: Event) {
        confirmBoxComponent.setup("Are you sure you want to logout?", this.doLogout);
    }

    @AutoBind
    private doLogout() {
        this.destroy();
        changeCurrElement(new LoginComponent());
    }

    private drawMenu() {
        const userRole = currLoggedInUser.role;
        const menuItems = roleMenuMap.get(userRole);

        let fullHtml = '';
    
        for (const menuItem of menuItems!) {
            const menuText = menuTextMap.get(menuItem);
            const menuItemCreateText = `<div class="menu-itme-container">
                 <button class="menu-item ${menuItem}" data-component-assoc="${menuItem}">${menuText}</button>
                </div>`;
            fullHtml += menuItemCreateText;
        }
    
        if (fullHtml) {
            this.menuBarContainer!.innerHTML = fullHtml;
        }

        for (const menuItem of menuItems!) {
            const menuButton : HTMLButtonElement = document.querySelector(`.${menuItem}`) as HTMLButtonElement;
            console.log(menuButton);
            menuButton.addEventListener('click', () => {
                currElementPortal?.destroy();
                createComponentFromMap(menuItem);
            });
        }
        
    };
}