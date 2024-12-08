export default async function favoriteDb(cookieUserId, id) {
    const response = await fetch(`/api/getIsFavorite`,{
        method:"POST",
        headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userId: cookieUserId,
            heroId: id
          })
    });
    const data = await response.json();
    return data;
}