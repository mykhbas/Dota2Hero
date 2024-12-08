export const filter = (data,attackType,primaryAttr,role)=>{
    const filteredHeroes = data.filter(
      (hero) =>
        (!attackType || hero.attack_type == attackType) &&
        (role.length == 0 || role.every((inList) => hero.roles.length<=inList.length&&hero.roles.includes(inList))) &&
        (!primaryAttr || hero.primary_attr == primaryAttr)
    );
    return filteredHeroes;
  }