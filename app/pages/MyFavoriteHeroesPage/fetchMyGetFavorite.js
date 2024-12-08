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
    const favoriteData = data.reduce((old, current) => {
      old[current.heroId] = new Date(current.createdAt).toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      return old;
    }, {});

    return [favoriteData, idHero]; 
};
