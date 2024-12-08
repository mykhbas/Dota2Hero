export const fetchHeroStats = async (id ) => {
    const response = await fetch(`/api/getHeroData`);
    const data = await response.json();
    const heroDetail = data.find((thisHero) => thisHero.id == id);
    return heroDetail;
    
}