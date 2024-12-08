import Cookies from 'js-cookie';
import {createId} from './createId';

export const clickStart = async (router) => {
    const have_id = Cookies.get('user_id');
    if(!have_id){
        createId();
    }
    Cookies.set('role', "User");
    router.push('../pages/HeroListPage');
  };