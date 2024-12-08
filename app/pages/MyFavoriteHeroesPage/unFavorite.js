export const unFavorite = async(id,userId) => {
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
};