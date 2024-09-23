import { validationData } from './Util.js';
export const RenderComponent = (template, portal) => {
    // {} can also contains type which is the type that a class hsould have as memeber
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                super();
                const templateEl = document.querySelector(`#${template}`);
                const innerTemplateEl = document.importNode(templateEl.content, true);
                const portalEl = document.querySelector(`#${portal}`);
                const element = innerTemplateEl.firstElementChild;
                portalEl.insertAdjacentElement('afterbegin', element);
            }
        };
    };
};
export const AutoBind = (target, methodName, descriptor) => {
    const originalMethod = descriptor.value;
    const newDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return newDescriptor;
};
export const Required = (target, propertyName) => {
    var _a, _b;
    validationData[target.constructor.name] = Object.assign(Object.assign({}, validationData[target.constructor.name]), { [propertyName]: [
            ...((_b = (_a = validationData[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []),
            'required'
        ] });
};
export const MinLength = (val) => {
    return (target, propertyName) => {
        var _a, _b;
        validationData[target.constructor.name] = Object.assign(Object.assign({}, validationData[target.constructor.name]), { [propertyName]: [
                ...((_b = (_a = validationData[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []),
                `minlength|${val}`
            ] });
    };
};
export const ContainsUpperCase = (target, propertyName) => {
    var _a, _b;
    validationData[target.constructor.name] = Object.assign(Object.assign({}, validationData[target.constructor.name]), { [propertyName]: [
            ...((_b = (_a = validationData[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []),
            `uppercase`
        ] });
};
