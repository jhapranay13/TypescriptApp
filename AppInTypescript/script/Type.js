export class BaseComponent {
    destroy() {
        var _a;
        (_a = this.currentComponent) === null || _a === void 0 ? void 0 : _a.remove();
    }
    ;
}
