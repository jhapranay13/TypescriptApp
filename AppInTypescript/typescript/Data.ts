import { UserRole } from "./Type.js";

export const userInfos : UserRole[] = [
    {
        userName: 'admin',
        password: 'admin',
        role:'admin'
    }, {
        userName: 'sam',
        password: 'Password$1',
        role:'normal'
    }, {
        userName: 'chris',
        password: 'Password$1',
        role:'premium'
    }, {
        userName: 'mark',
        password: 'Password$1',
        role:'normal'
    }, {
        userName: 'ram',
        password: 'Password$1',
        role:'premium'
    }, {
        userName: 'senju',
        password: 'Password$1',
        role:'normal'
    }, {
        userName: 'maddy',
        password: 'Password$1',
        role:'premium'
    }, {
        userName: 'raghu',
        password: 'Password$1',
        role:'normal'
    }, {
        userName: 'danny',
        password: 'Password$1',
        role:'normal'
    }, {
        userName: 'nancy',
        password: 'Password$1',
        role:'premium'
    }, {
        userName: 'kiara',
        password: 'Password$1',
        role:'premium'
    }, {
        userName: 'amy',
        password: 'Password$1',
        role:'premium'
    }, {
        userName: 'ganesh',
        password: 'Password$1',
        role:'normal'
    }, {
        userName: 'baha',
        password: 'Password$1',
        role:'premium'
    }
];

export let currLoggedInUser : UserRole = {
    userName: '',
    password: '',
    role:'', 
};

export const roleMenuMap = new Map<string, string[]>();
roleMenuMap.set('admin', ['person-admin', 'video-library', 'quiz-app', 'project-mgmt','manage-profile']);
roleMenuMap.set('premium', ['video-library', 'quiz-app', 'project-mgmt', 'manage-profile']);
roleMenuMap.set('normal', ['quiz-app', 'project-mgmt', 'manage-profile']);

export const menuTextMap = new Map<string, string>();
menuTextMap.set('person-admin', 'Administration');
menuTextMap.set('video-library', 'Video Library');
menuTextMap.set('quiz-app', 'Quiz App');
menuTextMap.set('manage-profile', 'Profile Management');
menuTextMap.set('project-mgmt', 'Project Management');

export const fetchUserData = () => {
    const returnVal = userInfos.filter((userRole) => !(userRole.userName === currLoggedInUser.userName));
    return new Promise((resolve, reject) => 
        setTimeout(() => resolve(returnVal), 2000)
    );
}
