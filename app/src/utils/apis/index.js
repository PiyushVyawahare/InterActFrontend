const baseUrl = 'http://localhost:4000';

module.exports = {
    USER_LOGIN_URL: `${baseUrl}/users/signin`,
    USER_SIGNIN_URL: `${baseUrl}/users`,
    OTP_VERIFY: `${baseUrl}/users/verify`,
    SEARCH_USER: `${baseUrl}/users/search`,
    CREATE_ROOM: `${baseUrl}/rooms`,
    GET_INVITES: `${baseUrl}/invites`,
    ACCEPT_INVITE: (invite_id) => `${baseUrl}/invites/accept/${invite_id}`,
    REJECT_INVITE: (invite_id) => `${baseUrl}/invites/reject/${invite_id}`,
    GET_ROOMS: `${baseUrl}/rooms`,
    GET_ROOM_DETAILS: (id) => `${baseUrl}/rooms/${id}`,
    GET_ROOM_MESSAGES: (id) => `${baseUrl}/rooms/${id}/messages`
}