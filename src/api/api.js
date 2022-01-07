import { notify } from "../notify.js";
import { setUserData, clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
            }

            try {
                return await response.json();
            } catch(err) {
                return response;
            }
               
    } catch (err) { 
        // alert(err.message);
        notify(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}//ako nqma lognat nqma danni
    };

    if(data != undefined) {//ima li podadeni danni ako ima 0 nqma da mine zatova undefined
        options.headers['Content-Type'] = 'applications/json'
        options.body = JSON.stringify(data);
    }
    const userData = getUserData();
    
    if(userData != null) { //ima li potrebitel
        options.headers['X-Authorization'] = userData.token;
        
    }

    return options;

}

export async function get(url) {
    return request(url, createOptions());

}


export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));


}

export async function del(url) {
    return request(url, createOptions('delete'));
}


export async function login(email, password) {
    const result = await post('/users/login', { email, password });
    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,//dali e avtor na konkretna publikaciq
        gender: result.gender,
        token: result.accessToken//za da pravim otorizirani zaqvki
    };

    setUserData(userData);

    return result;

}

export async function register(username, email, password, gender) {//kopiran login sashtoto e
    const result = await post('/users/register', { username, email, password, gender });
    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,//dali e avtor na konkretna publikaciq
        gender: result.gender,
        token: result.accessToken//
    };

    setUserData(userData);

    return result;

}

export async function logout() {
    get('/users/logout');
   clearUserData();

}

// export {
//     get,
//     post, 
//     put,
//     del,
//     logout,
//     login,
//     register
// }