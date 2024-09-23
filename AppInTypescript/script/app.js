import { LoginComponent } from "./LoginComponent.js";
import { CloakComponent } from "./CloakComponent.js";
import { GeneralInfoComponent } from "./GeneralInfoComponent.js";
import { ConfirmBoxComponent } from "./ConfirmBoxComponent.js";
import { AdminComponent } from "./AdminComponent.js";
export let currElement = undefined;
export const changeCurrElement = (obj) => {
    currElement = obj;
    currElement.init();
};
export let currElementPortal = undefined;
export const changeCurrElementPotal = (obj) => {
    currElementPortal = obj;
    currElementPortal.init();
};
changeCurrElement(new LoginComponent());
export const cloakCompenet = new CloakComponent();
export const generalInfoComponent = new GeneralInfoComponent();
generalInfoComponent.init();
export const confirmBoxComponent = new ConfirmBoxComponent();
confirmBoxComponent.init();
export const menuComponentMap = new Map();
menuComponentMap.set('person-admin', AdminComponent);
/*menuComponentMap.set('video-library', 'videoLibComponent');
menuComponentMap.set('quiz-app', 'quizComponent');
menuComponentMap.set('manage-profile', 'profileMgmtComponent');
menuComponentMap.set('project-mgmt', 'projectManagementComponent');*/
export const createComponentFromMap = (classKey) => {
    const classConstructor = menuComponentMap.get(classKey);
    if (classConstructor) {
        changeCurrElementPotal(new classConstructor());
    }
};
