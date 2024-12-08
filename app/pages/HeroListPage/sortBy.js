export const sortBy = (data,sort) => {
    let response = [];
    if (sort == "A-Z"){
      response = data.sort((a,b) => a.localized_name.localeCompare(b.localized_name));
    }else if(sort == "Z-A"){
      response = data.sort((a,b) => b.localized_name.localeCompare(a.localized_name));
    }else if(sort == "mostFavorite"){
      response = data.sort((a,b) => b.favoriteNum - a.favoriteNum);
    }else if (sort === "leastFavorite"){
      response = data.sort((a,b) => a.favoriteNum - b.favoriteNum);
    }
    return response
  }