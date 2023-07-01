export const getAccessToken = () => {
    const authDetails = sessionStorage.getItem('authDetails') ? JSON.parse(sessionStorage.getItem('authDetails')) : null;

    if (authDetails) {
        return authDetails?.token;
    }
    return false;
};

export const getUserDetailsFromStorage = () => {
    const authDetails = sessionStorage.getItem('authDetails') ? JSON.parse(sessionStorage.getItem('authDetails')) : null;

    if (authDetails) {
        return authDetails?.data;
    }
    return false;
}

export const removeAuthDetails = () => {
    sessionStorage.removeItem('authDetails');
    window.location = '/'
};