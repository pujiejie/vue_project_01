import request from '@/request';

export function login(data) {
    // application/x-www-form-urlencoded key=value&key=value
    // application/json "{"name": "Tom"}"
    // username password uuid text
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("uuid", data.uuid);
    formData.append("text", data.text);
    return request({
        method: "POST",
        url: "api/supersignin",
        data: formData
    })
}

export function userProfile(token) {
    return request({
        method: "GET",
        url: "api/superprofile",
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}
