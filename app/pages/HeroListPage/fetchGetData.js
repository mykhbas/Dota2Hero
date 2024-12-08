export const fetchGetData = async () => {
    const response = await fetch("/api/getHeroData");
    const data = await response.json();
    const addCodeNameData = data.map((hero) => ({...hero, codeName: hero.name.slice(14)}));
    return addCodeNameData;
  }