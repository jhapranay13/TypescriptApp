import { AutoBind, RenderComponent } from "./CustomDecorator.js";
import { BaseComponent, SelectedUser, UserRole } from './Type.js';
import { cloakCompenet } from './app.js';
import { currLoggedInUser, fetchUserData } from "./Data.js";
import { filterResult } from "./Util.js";

@RenderComponent("administration-component", "portal")
export class AdminComponent extends BaseComponent {
    headerBtn: HTMLButtonElement | undefined;
    tableCmpt : HTMLDivElement | undefined;
    recordsPerPage : HTMLInputElement | undefined;
    pageNumber : HTMLInputElement | undefined;
    searchInput : HTMLInputElement | undefined;
    trashImg : HTMLImageElement | undefined;
    saveImg : HTMLImageElement | undefined;
    recordsPerPageVal : number = 0;
    pagesToDraw : number = 0;
    searchText : string = '';
    userData : UserRole[] | undefined;
    userDataBkp : UserRole[] | undefined;
    recordContainer : HTMLTableSectionElement | undefined;
    selectedUsers: Map<string, SelectedUser>;
    pageNumberContainer: HTMLDivElement | undefined;
    userTable : HTMLTableElement | undefined;

    constructor() {
        super();
        this.selectedUsers = new Map<string, SelectedUser>();
    }

    init(): void {
        this.currentComponent = document.querySelector('.admin-component') as HTMLDivElement;
        this.headerBtn = document.querySelector('.admin-header') as HTMLButtonElement;
        this.userTable = document.querySelector('.user-table') as HTMLTableElement
        this.tableCmpt = document.querySelector('.user-table-component') as HTMLDivElement;
        this.recordsPerPage = document.querySelector('.records-per-page') as HTMLInputElement;
        this.pageNumber = document.querySelector('.page-number') as HTMLInputElement;
        this.searchInput = document.querySelector('.search-text') as HTMLInputElement;
        this.trashImg = document.querySelector('#user-trash-img') as HTMLImageElement;
        this.saveImg = document.querySelector('#user-save-img') as HTMLImageElement;
        this.recordContainer = document.querySelector(".user-record-container") as HTMLTableSectionElement;
        this.pageNumberContainer = document.querySelector(".page-num-lbl-container") as HTMLDivElement;
        cloakCompenet.init();
        const promise = this.fetchData();
        promise.then((res) => {
            this.userData = res as UserRole[];
            this.userDataBkp = [...this.userData]
            cloakCompenet.destroy();
            this.config();
        });
    }

    private async fetchData() {
        return await fetchUserData();
    }
   
    private config() {
        this.headerBtn?.addEventListener('click', this.headerBtnClickHandler);
        this.recordsPerPage?.addEventListener('change', this.recordsPerPageHandler);
        this.searchInput?.addEventListener('change', this.searchChangeHandler);
        this.trashImg?.addEventListener('click', this.trashHandler);
        this.saveImg?.addEventListener('click', this.saveHandler);
        this.userTable?.addEventListener('change', this.rowCheckHandler);
        this.pageNumber?.addEventListener('change', this.pageChangeHnadler);
        this.recordsPerPageVal = +this.recordsPerPage!.value;
        const recSize = this.userData!.length;
        this.pagesToDraw = recSize / this.recordsPerPageVal + 
            (recSize % this.recordsPerPageVal != 0 ? 1 : 0);
    }

    @AutoBind
    private headerBtnClickHandler(event : Event) {
        this.tableCmpt?.classList.toggle('hidden');
        this.drawOptions(this.pagesToDraw);
        this.drawUserTable(0, 1, this.userData!);
    }

    @AutoBind
    private recordsPerPageHandler(event : Event) {
        this.recordsPerPageVal = +this.recordsPerPage!.value;
        const recSize = this.userData!.length;
        this.pagesToDraw = recSize / this.recordsPerPageVal + 
            (recSize % this.recordsPerPageVal != 0 ? 1 : 0);
        this.drawOptions(this.pagesToDraw);
        this.drawUserTable(0, 1, this.userData!);
    }

    @AutoBind
    private searchChangeHandler(event : Event) {
        this.searchText = this.searchInput!.value;
        this.userData = filterResult(this.searchText);
        const recSize = this.userData!.length;
        this.pagesToDraw = recSize / this.recordsPerPageVal + 
            (recSize % this.recordsPerPageVal != 0 ? 1 : 0);
        this.drawOptions(this.pagesToDraw);
        this.drawUserTable(0, 1, this.userData!);
    }

    @AutoBind
    private pageChangeHnadler(event: Event) {
        const pageVal = +this.pageNumber!.value;
        const startIndex = (pageVal - 1) * this.recordsPerPageVal;
        const searchVal = this.searchInput!.value;
        const copyUserInfo = filterResult(searchVal);
        this.drawUserTable(startIndex, pageVal, copyUserInfo);
    }

    @AutoBind
    private trashHandler(event : Event) {

    }

    @AutoBind
    private saveHandler(event : Event) {

    }

    @AutoBind
    private rowCheckHandler(event : Event) {
        if ((event.target! as HTMLInputElement).type === "checkbox") {
            this.checkboxOperation(event);
        }
    
        if ((event.target! as HTMLInputElement).type === "select-one") {
            this.selectOperation(event);
        }
    
        if ((event.target! as HTMLInputElement).type === "text") {
            this.textOperation(event);
        }
    }

    private drawUserTable(initialIndex : number, pageNumber : number, userData : UserRole[]) {
        let htmlText = '';
        let endIndexCalc = this.recordsPerPageVal * pageNumber;
        let endIndex = Math.min(endIndexCalc, userData.length);
        let counter = 0;
        const currUser = currLoggedInUser.userName;
        
        for(let i = initialIndex; i < endIndex; i++) {
            let disabledSelect = 'disabled';
            let checked = '';
            let userInfo = null;
            let rolesTxtHidden = "";
            let rolesSltHidden = "hidden";
            
            if(!this.selectedUsers.has(userData[i].userName)) {
                userInfo = userData[i];
            } else {
                let obj = this.selectedUsers.get(userData[i].userName);
                rolesTxtHidden = "hidden";
                rolesSltHidden = "";
                disabledSelect = "";
                checked = "checked";
    
              
                userInfo = {
                    userName: obj!.userName,
                    password: obj!.password,
                    role: obj!.role
                };
            }
    
            if (!userInfo) {
                break;
            }
            let userName = userInfo.userName;
            let password = userInfo.password;
            let role = userInfo.role;
            let premium = role === "premium" ? "selected" : "";
            let normal = role === "normal" ? "selected" : "";
            let color = counter % 2 == 0 ? "green" : "white"
            htmlText += 
            `<tr id="row_${counter}" data-user-id="${userName}">
                <td>
                    <input class="password-input-text-${color}" disabled type="text" value="${userName}" data-user-id="${userName}"/>
                </td>
                <td>
                    <input class="password-input-text-${color}" id="pwd_text_${counter}" ${disabledSelect} type="text" value="${password}" data-user-id="${userName}"/>
                </td>
                <td>
                    <input class="password-input-text-${color} ${rolesTxtHidden}" id="role_text_${counter}" disabled type="text" value="${role}" data-user-id="${userName}"/>
                    <select class="password-input-text-${color} ${rolesSltHidden}" id="role_select_${counter}" ${disabledSelect} data-user-id="${userName}">
                        <option value="premium" ${premium} data-index="${counter}">premium</option>
                        <option value="normal" ${normal} data-index="${counter}">normal</option>
                    </select>
                </td>
                <td>
                    <input type="checkbox" class="edit-chk" data-id="${counter}" data-user-id="${userName}" ${checked}/>
                </td>
            </tr>`;
            counter++;
        }
        this.recordContainer!.innerHTML = htmlText;
    };

    private drawOptions = (pagesToDraw : number) => {
        const element = document.createElement('select');
        let rcdsPageNumComponent =  document.querySelector('.page-number') as HTMLSelectElement;
        this.pageNumber!.innerHTML = '';
        element.className = 'page-number';
    
        for (let i = 1; i <= pagesToDraw; i++) {
            const opt = document.createElement('option');
            opt.value = ""+ i;
            opt.text = ""+ i;
            this.pageNumber!.appendChild(opt);
        }
    };

    private checkboxOperation = (event : Event) => {
        const id = (event.target! as HTMLElement).dataset.id;
        const rowId = `#row_${id}`;
        const pwdTextId = `#pwd_text_${id}`;
        const roleTextId = `#role_text_${id}`;
        const roleSelectId = `#role_select_${id}`;
    
        const rowElem = document.querySelector(rowId) as HTMLElement;
        const pwdElem = document.querySelector(pwdTextId) as HTMLInputElement;
        const roleElem = document.querySelector(roleTextId) as HTMLInputElement;
        const selectElem = document.querySelector(roleSelectId) as HTMLSelectElement;
        const uname = rowElem!.dataset.userId as string;
        const pwd = pwdElem!.value;
        const role = roleElem!.value;
    
        if ((event.target! as HTMLInputElement).checked) {
            this.selectedUsers.set(uname, {
                userName: uname,
                password: pwd,
                role: role,
                selectedIndex: "" + selectElem.selectedIndex
            });
            roleElem!.classList.toggle('hidden');
            selectElem!.classList.toggle('hidden');
            selectElem!.disabled = false;
            pwdElem!.disabled = false;
        } else {
            const obj = this.selectedUsers.get(uname);
            this.selectedUsers.delete(uname)
            pwdElem!.value = obj!.password;
            selectElem!.selectedIndex = +obj!.selectedIndex;
            roleElem.value = obj!.role;
            roleElem.classList.toggle('hidden');
            selectElem.classList.toggle('hidden');
            selectElem.disabled = true;
            pwdElem.disabled = true;
        }
    };

    private selectOperation = (event : Event) => {
        let id = (event.target! as HTMLInputElement).id;
        let userId = (event.target! as HTMLInputElement).dataset.userId;
        let index = (event.target! as HTMLInputElement).dataset.index;
        const lastIndex = id.lastIndexOf('_');
        id = id.slice(lastIndex + 1);
        const roleTextId = `#role_text_${id}`;
        const roleElem = document.querySelector(roleTextId) as HTMLInputElement;
        roleElem!.value = (event.target! as HTMLInputElement).value;
    };

    private textOperation = (event : Event) => {
        let userId = (event.target! as HTMLInputElement).dataset.userId;
        const atUser = this.selectedUsers.get(userId!);
        atUser!.password = (event.target! as HTMLInputElement).value;
    };
}