export const calStat = (heroData) => {
    let bonusPrimary = 1
    if (heroData.primary_attr == "all") {
        bonusPrimary = 0.7
    }
    const dataCal = {
        "Per_Level": Math.round(heroData.base_str*2.2),
        "Min_Attack": Math.round(((heroData.base_str + heroData.base_agi + heroData.base_int)*bonusPrimary)+heroData.base_attack_min),
        "Max_Attack": Math.round(((heroData.base_str + heroData.base_agi + heroData.base_int)*bonusPrimary)+heroData.base_attack_max),
        "Attack_Range": Math.round(heroData.attack_range),
        "Attack_Speed": Math.round(heroData.base_attack_time+heroData.base_agi),
        "HP": Math.round(heroData.base_health+(heroData.base_str* 20)),
        "HP_Regen":( heroData.base_health_regen+(heroData.base_str*0.1)).toFixed(2),
        "Mana": Math.round(heroData.base_mana+(heroData.base_int*12)),
        "Mana_Regen": (heroData.base_mana_regen+(heroData.base_int* 0.05)).toFixed(2),
        "Armor": (heroData.base_armor+( heroData.base_agi*0.167)).toFixed(2),
        "Magic_Resistance": Math.round((heroData.base_int/10)+heroData.base_mr),
        "Movement_Speed": Math.round(heroData.move_speed),
    }
    return dataCal;
}