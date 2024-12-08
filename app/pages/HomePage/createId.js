import Cookies from 'js-cookie';

export const createId = async () => {
    const response = await fetch("/api/createId");
    const data = await response.json();
    Cookies.set('user_id', data.user_id);
    Cookies.set('role', "User");
};
  