import Cookies from 'js-cookie';

export const fetchMyGetFavorite = async () => {
    const cookieUserId = Cookies.get('user_id');
    if (!cookieUserId) {
      throw new Error('User ID not found in cookies');
    }

    const response = await fetch(`/api/getFavoriteData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: cookieUserId }),
    });

    const data = await response.json();
    
    const idHero = data.map((hero) => hero.heroId);

    return idHero; 
};
