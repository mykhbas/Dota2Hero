import Cookies from 'js-cookie';
export const getUserRole = ()=>{
    const have_id = Cookies.get('role');
    if(have_id){
        return have_id;
    }
    console.log(have_id)
}