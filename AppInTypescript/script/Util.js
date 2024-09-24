import { currLoggedInUser, userInfos } from "./Data.js";
export let validationData = {};
export const validate = (obj) => {
    let isValid = false;
    let message = '';
    //Accessing __proto__ or [[prototype]] to get the name as I am using constructor replacement 
    // so directly getting constructor name won't work
    const validationConfig = validationData[Object.getPrototypeOf(obj.constructor).name];
    if (validationConfig) {
        outer: for (const fieldName in validationConfig) {
            if (!obj[`${fieldName}Dirty`]) {
                continue;
            }
            for (const validator of validationConfig[fieldName]) {
                const splitValid = validator.split('|');
                switch (splitValid[0]) {
                    case 'required':
                        isValid = !!obj[fieldName];
                        if (!isValid) {
                            message = `${fieldName} is required`;
                        }
                        break;
                    case 'minlength':
                        isValid = obj[fieldName].length > 3;
                        if (!isValid) {
                            message = `${fieldName} length should be greater than 3`;
                        }
                        break;
                    case 'uppercase':
                        isValid = !(obj[fieldName].toLowerCase() === obj[fieldName]);
                        if (!isValid) {
                            message = `${fieldName} should have atleast one uppercase`;
                        }
                        break;
                }
                if (!isValid) {
                    break outer;
                }
            }
        }
    }
    return [isValid, message];
};
export const loginFetch = (uname, pwd) => {
    let validLogin = false;
    for (const userInfo of userInfos) {
        if (uname.toLocaleLowerCase() === userInfo['userName'] &&
            pwd.trim() === userInfo['password']) {
            validLogin = true;
            currLoggedInUser.userName = userInfo['userName'];
            currLoggedInUser.role = userInfo['role'];
            currLoggedInUser.password = userInfo['password'];
            validLogin = true;
            break;
        }
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(validLogin), 5000);
    });
};
export const saveUserSignUp = (username, password, role) => {
    let returnVal = true;
    for (const userInfo of userInfos) {
        if (username === userInfo['userName']) {
            returnVal = false;
            break;
        }
    }
    if (returnVal) {
        userInfos.push({
            ['userName']: username,
            ['password']: password,
            ['role']: role
        });
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(returnVal), 3000);
    });
};
export const filterResult = (searchVal) => {
    const copyUser = userInfos.filter((userInfo, i, arr) => {
        if (currLoggedInUser.userName === userInfo.userName ||
            !userInfo.userName.includes(searchVal)) {
            return false;
        }
        return true;
    });
    return copyUser;
};
