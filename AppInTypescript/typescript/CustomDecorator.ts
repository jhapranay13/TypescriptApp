import { validationData } from './Util.js';

export const RenderComponent = 
    (template : string, portal : String) => {
        // {} can also contains type which is the type that a class hsould have as memeber
        return function <T extends {new(...args : any[]) : {}}>(originalConstructor : T) {
            return class extends originalConstructor {
                constructor(...args: any[]) {
                    super();
                    const templateEl = document.querySelector(`#${template}`)! as HTMLTemplateElement;
                    const innerTemplateEl = document.importNode(templateEl.content, true);
                    const portalEl = document.querySelector(`#${portal}`)! as HTMLDivElement;
                    const element = innerTemplateEl.firstElementChild as HTMLElement
                    portalEl.insertAdjacentElement('afterbegin', element);
                }
            };
        };
};

export const AutoBind = (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const newDescriptor : PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return newDescriptor;
};

export const Required = (target: any, propertyName: string) => {
    validationData[target.constructor.name] = {
        ...validationData[target.constructor.name],
        [propertyName] : [
            ...(validationData[target.constructor.name]?.[propertyName] ?? []),
            'required'
        ]
    }   
};

export const MinLength = (val: number) => {
    return (target: any, propertyName: string) => {
        validationData[target.constructor.name] = {
            ...validationData[target.constructor.name],
            [propertyName] : [
                ...(validationData[target.constructor.name]?.[propertyName] ?? []),
                `minlength|${val}`
            ]
        }  
    };
};

export const ContainsUpperCase = (target: any, propertyName: string) => {
    validationData[target.constructor.name] = {
        ...validationData[target.constructor.name],
        [propertyName] : [
            ...(validationData[target.constructor.name]?.[propertyName] ?? []),
            `uppercase`
        ]
    }  
};