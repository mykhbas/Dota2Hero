export const favoriteButton = async(userId,id)=>{
    const response = await fetch(`/api/editFavoriteData`,{
        method:"POST",
        headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            heroId: id
          })
    });
    const data = await response.json()
    return data;
}