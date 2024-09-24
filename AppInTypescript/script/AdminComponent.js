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
import { AutoBind, RenderComponent } from "./CustomDecorator.js";
import { BaseComponent } from './Type.js';
import { cloakCompenet } from './app.js';
import { currLoggedInUser, fetchUserData } from "./Data.js";
import { filterResult } from "./Util.js";
let AdminComponent = class AdminComponent extends BaseComponent {
    constructor() {
        super();
        this.recordsPerPageVal = 0;
        this.pagesToDraw = 0;
        this.searchText = '';
        this.drawOptions = (pagesToDraw) => {
            const element = document.createElement('select');
            let rcdsPageNumComponent = document.querySelector('.page-number');
            this.pageNumber.innerHTML = '';
            element.className = 'page-number';
            for (let i = 1; i <= pagesToDraw; i++) {
                const opt = document.createElement('option');
                opt.value = "" + i;
                opt.text = "" + i;
                this.pageNumber.appendChild(opt);
            }
        };
        this.checkboxOperation = (event) => {
            const id = event.target.dataset.id;
            const rowId = `#row_${id}`;
            const pwdTextId = `#pwd_text_${id}`;
            const roleTextId = `#role_text_${id}`;
            const roleSelectId = `#role_select_${id}`;
            const rowElem = document.querySelector(rowId);
            const pwdElem = document.querySelector(pwdTextId);
            const roleElem = document.querySelector(roleTextId);
            const selectElem = document.querySelector(roleSelectId);
            const uname = rowElem.dataset.userId;
            const pwd = pwdElem.value;
            const role = roleElem.value;
            if (event.target.checked) {
                this.selectedUsers.set(uname, {
                    userName: uname,
                    password: pwd,
                    role: role,
                    selectedIndex: "" + selectElem.selectedIndex
                });
                roleElem.classList.toggle('hidden');
                selectElem.classList.toggle('hidden');
                selectElem.disabled = false;
                pwdElem.disabled = false;
            }
            else {
                const obj = this.selectedUsers.get(uname);
                this.selectedUsers.delete(uname);
                pwdElem.value = obj.password;
                selectElem.selectedIndex = +obj.selectedIndex;
                roleElem.value = obj.role;
                roleElem.classList.toggle('hidden');
                selectElem.classList.toggle('hidden');
                selectElem.disabled = true;
                pwdElem.disabled = true;
            }
        };
        this.selectOperation = (event) => {
            let id = event.target.id;
            let userId = event.target.dataset.userId;
            let index = event.target.dataset.index;
            const lastIndex = id.lastIndexOf('_');
            id = id.slice(lastIndex + 1);
            const roleTextId = `#role_text_${id}`;
            const roleElem = document.querySelector(roleTextId);
            roleElem.value = event.target.value;
        };
        this.textOperation = (event) => {
            let userId = event.target.dataset.userId;
            const atUser = this.selectedUsers.get(userId);
            atUser.password = event.target.value;
        };
        this.selectedUsers = new Map();
    }
    init() {
        this.currentComponent = document.querySelector('.admin-component');
        this.headerBtn = document.querySelector('.admin-header');
        this.userTable = document.querySelector('.user-table');
        this.tableCmpt = document.querySelector('.user-table-component');
        this.recordsPerPage = document.querySelector('.records-per-page');
        this.pageNumber = document.querySelector('.page-number');
        this.searchInput = document.querySelector('.search-text');
        this.trashImg = document.querySelector('#user-trash-img');
        this.saveImg = document.querySelector('#user-save-img');
        this.recordContainer = document.querySelector(".user-record-container");
        this.pageNumberContainer = document.querySelector(".page-num-lbl-container");
        cloakCompenet.init();
        const promise = this.fetchData();
        promise.then((res) => {
            this.userData = res;
            this.userDataBkp = [...this.userData];
            cloakCompenet.destroy();
            this.config();
        });
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetchUserData();
        });
    }
    config() {
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = this.headerBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.headerBtnClickHandler);
        (_b = this.recordsPerPage) === null || _b === void 0 ? void 0 : _b.addEventListener('change', this.recordsPerPageHandler);
        (_c = this.searchInput) === null || _c === void 0 ? void 0 : _c.addEventListener('change', this.searchChangeHandler);
        (_d = this.trashImg) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.trashHandler);
        (_e = this.saveImg) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.saveHandler);
        (_f = this.userTable) === null || _f === void 0 ? void 0 : _f.addEventListener('change', this.rowCheckHandler);
        (_g = this.pageNumber) === null || _g === void 0 ? void 0 : _g.addEventListener('change', this.pageChangeHnadler);
        this.recordsPerPageVal = +this.recordsPerPage.value;
        const recSize = this.userData.length;
        this.pagesToDraw = recSize / this.recordsPerPageVal +
            (recSize % this.recordsPerPageVal != 0 ? 1 : 0);
    }
    headerBtnClickHandler(event) {
        var _a;
        (_a = this.tableCmpt) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden');
        this.drawOptions(this.pagesToDraw);
        this.drawUserTable(0, 1, this.userData);
    }
    recordsPerPageHandler(event) {
        this.recordsPerPageVal = +this.recordsPerPage.value;
        const recSize = this.userData.length;
        this.pagesToDraw = recSize / this.recordsPerPageVal +
            (recSize % this.recordsPerPageVal != 0 ? 1 : 0);
        this.drawOptions(this.pagesToDraw);
        this.drawUserTable(0, 1, this.userData);
    }
    searchChangeHandler(event) {
        this.searchText = this.searchInput.value;
        this.userData = filterResult(this.searchText);
        const recSize = this.userData.length;
        this.pagesToDraw = recSize / this.recordsPerPageVal +
            (recSize % this.recordsPerPageVal != 0 ? 1 : 0);
        this.drawOptions(this.pagesToDraw);
        this.drawUserTable(0, 1, this.userData);
    }
    pageChangeHnadler(event) {
        const pageVal = +this.pageNumber.value;
        const startIndex = (pageVal - 1) * this.recordsPerPageVal;
        const searchVal = this.searchInput.value;
        const copyUserInfo = filterResult(searchVal);
        this.drawUserTable(startIndex, pageVal, copyUserInfo);
    }
    trashHandler(event) {
    }
    saveHandler(event) {
    }
    rowCheckHandler(event) {
        if (event.target.type === "checkbox") {
            this.checkboxOperation(event);
        }
        if (event.target.type === "select-one") {
            this.selectOperation(event);
        }
        if (event.target.type === "text") {
            this.textOperation(event);
        }
    }
    drawUserTable(initialIndex, pageNumber, userData) {
        let htmlText = '';
        let endIndexCalc = this.recordsPerPageVal * pageNumber;
        let endIndex = Math.min(endIndexCalc, userData.length);
        let counter = 0;
        const currUser = currLoggedInUser.userName;
        for (let i = initialIndex; i < endIndex; i++) {
            let disabledSelect = 'disabled';
            let checked = '';
            let userInfo = null;
            let rolesTxtHidden = "";
            let rolesSltHidden = "hidden";
            if (!this.selectedUsers.has(userData[i].userName)) {
                userInfo = userData[i];
            }
            else {
                let obj = this.selectedUsers.get(userData[i].userName);
                rolesTxtHidden = "hidden";
                rolesSltHidden = "";
                disabledSelect = "";
                checked = "checked";
                userInfo = {
                    userName: obj.userName,
                    password: obj.password,
                    role: obj.role
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
            let color = counter % 2 == 0 ? "green" : "white";
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
        this.recordContainer.innerHTML = htmlText;
    }
    ;
};
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "headerBtnClickHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "recordsPerPageHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "searchChangeHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "pageChangeHnadler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "trashHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "saveHandler", null);
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], AdminComponent.prototype, "rowCheckHandler", null);
AdminComponent = __decorate([
    RenderComponent("administration-component", "portal"),
    __metadata("design:paramtypes", [])
], AdminComponent);
export { AdminComponent };
