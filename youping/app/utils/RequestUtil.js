import getUrl from './UrlUtil';
import DeviceStorage from './deviceStorage';
export const request = (url, method) => {
    let isOk;
    return new Promise((resolve, reject) => {
        DeviceStorage.get('tarjeta').then((tarjeta)=> {
            fetch(getUrl(url), {
                method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: tarjeta != null ? "tarjeta=" + tarjeta : null
            })
                .then((response) => {
                    if (response.ok) {
                        isOk = true;
                    } else {
                        isOk = false;
                    }
                    return response.json();
                })
                .then((responseData) => {
                    if (isOk) {
                        resolve(responseData);
                    } else {
                        reject(responseData);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        })
    });
};

export const upLoadImage = (url, method, data) => {
    let formData = new FormData();
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            let file = {uri: data[i].uri, type: 'multipart/form-data', name: 'a.jpg'};   //这里的key(uri和type和name)不能改变,
            formData.append("images", file);   //这里的files就是后台需要的key
        }
    }
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(getUrl(url), {
            method,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    isOk = true;
                } else {
                    isOk = false;
                }
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
};
