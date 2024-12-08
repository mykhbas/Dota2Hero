"use client"; 
import { useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import '../../styles/DetailHeroPage.css';
import {fetchHeroStats} from './fetchHeroStats';
import {favoriteButton} from './favoriteButton';
import {calStat} from './calStat';
import favoriteDb from './favoriteDb';


export default function DetailHero() {
    const data = useSearchParams();
    const  id  = data.get("id");
    const [heroData, setHeroData] = useState([]);
    const [codeName,setCodeName] = useState("");
    const [favorite,setFavorite] = useState(false)
    const [userId,setUserId] = useState("");
    const [processData,setProcessData] = useState({});
    useEffect (() => {
        const cookieUserId = Cookies.get('user_id');
        const waitingData=async()=>{
            const heroDetail = await fetchHeroStats(id);
            const code = heroDetail.name.slice(14);
            const isFavoriteDb = await favoriteDb(cookieUserId,id)
            setHeroData(heroDetail);
            setCodeName(code)
            setFavorite(isFavoriteDb)

        }
        setUserId(cookieUserId)
        waitingData();
    },[id]);
    const clickFavoriteButton = async()=>{
        const response = await favoriteButton(userId,id)
        setFavorite(response)
    }
    useEffect (() => {
        const dataCal = calStat(heroData);
        setProcessData(dataCal)
    },[heroData]);
    
    const buttonReturn =()=>{
        window.location.href = "../pages/HeroListPage";
    }

    return (
        <div className='mainBox'>
            <div className="header">
                <button id="buttonReturn" onClick={buttonReturn}>↩</button>
                <h1>Detail Hero Page</h1>
            </div>
            <div class="HeroBox">
            

                <img id='heroImage' 
                src={`https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${codeName}.png`} 
                alt={heroData.localized_name} 
                />
                <div className="baseStat">
                    <div className="type">
                        <img src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png" />
                        <label>{heroData.base_str}</label>
                    </div>
                    <div className="type">
                        <img src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png" />
                        <label>{heroData.base_agi}</label>
                    </div>
                    <div className="type">
                        <img src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png" />
                        <label>{heroData.base_int}</label>
                    </div>
                </div>
            </div>
            <button id={favorite ? "favoriteButton_Green":"favoriteButton"} onClick={()=>clickFavoriteButton()}>{favorite ? "❤" : "♡" } Favorite</button>
            <div className="detailBox">
                <div className="detailBox1">
                    <p>ID: {id}</p>
                    <p>Name: {heroData.localized_name}</p>
                    <p>Attack Type: {heroData.attack_type}</p>
                    <p>Primary Attribute: {heroData.primary_attr =="all"?"Universal" :heroData.primary_attr =="str"?"Strength"  :
                    heroData.primary_attr =="int"?"Intelligence" :heroData.primary_attr =="agi"?"Agility":"Null"  }</p>
                    
                </div>       
                <div className="detailBox2">
                    <p>Role</p>
                    {heroData.roles&&heroData.roles.map((role) => (
                        <p key={role}>- {role}</p>
                    ))}
                </div>
                
                <div className="detailBox3">
                    <p>Attack : {processData.Min_Attack}-{processData.Max_Attack}</p>
                    <p>Attack Range : {processData.Attack_Range}</p>
                    <p>Attack Speed : {processData.Attack_Speed}</p>
                    <p>Mana : {processData.Mana}</p>
                    <p>Mana Regen : {processData.Mana_Regen}</p>
                </div>
                <div className="detailBox4">
                    <p>HP : {processData.HP} + ({processData.Per_Level} Per Level)</p>
                    <p>HP Regen : {processData.HP_Regen}</p>
                    <p>Armor : {processData.Armor}</p>
                    <p>Magic Resistance : {processData.Magic_Resistance}</p>
                    <p>Movement Speed : {processData.Movement_Speed}</p>
                </div>
                
            </div>
        </div>
    );
}