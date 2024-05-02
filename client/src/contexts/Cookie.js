export const getCookie = name => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');

        if (cookieName.trim() === name) {
            return JSON.parse(cookieValue);
        }
    }

    return null; // Cookie not found
};

export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const deleteCookie = name => {
    // To delete a cookie, we need to set its expiration date to a date in the past
    const deletionDate = new Date(0).toUTCString();

    // To delete a cookie, we set the same cookie with an expiration date in the past
    document.cookie = `${name}=; expires=${deletionDate}; path=/`;
};