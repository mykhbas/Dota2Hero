"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
// function ของการเข้าสู่ระบบแอดมิน
import {login} from './loginAdmin';
import { getUserRole } from './getUserRole';
// ฮีโร่ที่ user ชอบทั้งหมด
import {fetchMyGetFavorite} from './fetchMyGetFavorite';
// เรียงลำดับตามที่ตั้งค่า
import {sortBy} from './sortBy';
// filter ตามที่ ติ๊กไว้
import {filter} from './filter';
// กดปุ่มเพื่อไปหน้า ดูข้อมูล hero
import {seeDetail} from './seeDetail';
// function ติ๊ก role
import {RoleChange} from './RoleChange';
// ดึงข้อมูล hero จาก api
import {fetchGetData} from './fetchGetData';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import '../../styles/filterBox.css';
import '../../styles/favoriteBox.css';
import '../../styles/searchBox.css';
import '../../styles/HeroListPage.css';
import '../../styles/headBox.css';

export default function HeroesList(){
  const router = useRouter(); 
  // วิธีการ sort
  const [sort, setSort] = useState("A-Z");
  // ข้อมูลตั้งต้นที่ดึงจาก api ที่เพิ่มข้อมูลต่างๆแล้ว
  const [defultData, setDefultData] = useState([]);
  // ข้อมูลที่ผ่านกระบวนการคัดกรองหรือ sort มาแล้ว
  const [processData, setProcessData] = useState([]);
  // ข้อความในช่องค้นหา
  const [search, setSearch] = useState("");
  // ข้อมูลที่ให้ user ติ๊ก ในการ filter
  const [attackType, setAttackType] = useState("");
  const [role, setRole] = useState([]);
  const [primaryAttr, setPrimaryAttr] = useState("");

  // ข้อมูล Hero top10 ที่ผู้คนชอบมากที่สุด
  const [favoriteData,setFavoriteData] = useState([]);
  // id ของ hero ที่ user คนนี้ชอบ
  const [myFavoriteHeroId,setMyFavoriteHeroId] = useState([]);
  // ข้อมูลของ user ที่ว่าชอบตัวไหนบ้าง
  const [myFavoriteData,setMyFavoriteData] = useState({});
  // เปิดปิดที่ใส่user password admin
  const [optionLoginOpen,setOptionLoginOpen] = useState(false);
  // ข้อความในช่อง user,password login admin
  const [adminId,setAdminId]= useState("");
  const [adminPassword,setAdminPassword]= useState("");
  // role ของ user ปัจจุบัน
  const [currentUserRole,setCurrentUserRole] = useState("")

  const fetchDbHero = async (input) => {
    const response = await fetch("/api/getDbHero");
    const data = await response.json();
    const addFavoriteData = input.map((old_data) => ({...old_data,favoriteNum: data.find((favoriteHero) => favoriteHero.id === old_data.id)?.num_of_fav || 0 }));
    const addTimefavorite= addFavoriteData.map((old_data) => ({...old_data,timefavorite: data.find((time) => time.id === old_data.id)?.time_fav  }));
    setDefultData(addTimefavorite);
    setProcessData(addTimefavorite);
    const top10 = sortBy(addTimefavorite,"mostFavorite")
    setFavoriteData(top10.slice(0,10))
  };
  useEffect(() => {
    const loadFavoriteData = async () => {
      const response = await fetchMyGetFavorite();
      setMyFavoriteHeroId(response)
      
     };
    const waitFuction = async() =>{
      const response = await fetchGetData();
      fetchDbHero(response)
    } 
    loadFavoriteData();
    setCurrentUserRole(getUserRole());
    fetchMyGetFavorite();
    waitFuction();
    
    
  }, []);
  

  useEffect(() => {
    
    const data = defultData.filter((hero) => hero.localized_name.toLowerCase().includes( search.toLowerCase()));
    const filterData = filter(data,attackType,primaryAttr,role)
    const sortData = sortBy(filterData,sort)
    setProcessData(sortData);
  }, [search,sort,attackType, role, primaryAttr, defultData]);

  
  
    
  const RoleChangeFunction = (newRole) => {
    setRole(RoleChange(newRole,role));
  };

  
  const seeDetail = (id) => {
    router.push(`../pages/HeroDetailPage?id=${id}`);
  };

  const setPrimarryAttrData = (attr) => {
    if (primaryAttr == attr) {
      setPrimaryAttr("");
    }else{
      setPrimaryAttr(attr);

    }
  }
  const setAttackTypeData = (type) =>{
    if (attackType == type) {
      setAttackType("");
    }else{
      setAttackType(type);

    }
  }
  const openOptinAdmin = () => {
    setOptionLoginOpen(old => !old)
  }

  const loginAgmin = () =>{
    const  waitingResponse = async()=>{
      const isAdmin = await login(adminId,adminPassword)
      if (isAdmin){
        setCurrentUserRole("Admin")
        Cookies.set('role', "Admin");
        window.location.reload()
      }else{
        Swal.fire("user หรือ password ไม่ถูกต้อง", "", "failed");
      }
    }
    waitingResponse();
  }
  return (
    <div className="mainContainer">
    {/* กล่องด้านบน */}
    <div id="headBox">
          <h1>Heroes List</h1>
    </div>


    <div className="containerShow">
    {/* กล่องแสดง hero ที่กดติ๊กชอบไว้ */}
    <div id="filterBox">
      <div class="insideFilterBox">

        <p id="textFilter">Filter</p>
        <div className="attackType">
          <p>Attack Type</p>
          <div>
          <img 
            className="typeImg"
            src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/melee.svg"
          />
            <input checked={attackType == "Melee"} type="checkbox" id="attck_type_melee" name="attck_type" onChange={()=>setAttackTypeData("Melee")} />
            <label >Melee</label>
          </div>
          <div>
          <img 
            className="typeImg"
            src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/ranged.svg"
          />
            <input checked={attackType == "Ranged"} type="checkbox" id="attck_type_ranged" name="attck_type" onChange={()=>setAttackTypeData("Ranged")} />
            <label >Ranged</label>
          </div>

        </div>
        <div className="role">
          <p>Role</p>
          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Carry")} />
            <label>Carry</label>
          </div>
          
          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Escape")} />
            <label>Escape</label>
          </div>
          
          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Nuker")} />
            <label>Nuker</label>
          </div>
          
          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Initiator")} />
            <label>Initiator</label>
          </div>
          
          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Durable")} />
            <label>Durable</label>
          </div>
          
          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Disabler")} />
            <label>Disabler</label>
          </div>
          
          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Support")} />
            <label>Support</label>
          </div>

          <div>
            <input type="checkbox" id="role" name="role" onChange={() => RoleChangeFunction("Pusher")} />
            <label>Pusher</label>
          </div>
          {role}
        </div>
        <div className="primaryAttr">
          <p >Primary Attribute</p>
          
          <img 
            src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-uni-active.png"
            className={`tab${primaryAttr == "all" ? "dark":""}` }
            onClick={()=>setPrimarryAttrData("all")}
          />
          <img 
            src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-str-active.png"
            className={`tab${primaryAttr == "str" ? "dark":""}` }
            onClick={()=>setPrimarryAttrData("str")}
          />
        <img 
            src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-agi-active.png"
            className={`tab${primaryAttr == "agi" ? "dark":""}` }
            onClick={()=>setPrimarryAttrData("agi")}
          />
        <img 
          src="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-int-active.png"
          className={`tab${primaryAttr == "int" ? "dark":""}` }
          onClick={()=>setPrimarryAttrData("int")}
        />
        </div>
      </div>
    
    </div>
    {/* กล่องแสดง hero */}
    <div id="heroListBox">
      <div className="searchBox">
        <label>Search : </label>
        <input 
        type="text" 
        placeholder="Search Your Hero"
        onChange={eve => setSearch(eve.target.value)} 
        />
        <label>Sort By : </label>
        <select id="selectSort" onChange={(selectSort)=>setSort(selectSort.target.value)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="mostFavorite">Most Favorite</option>
          <option value="leastFavorite">Least Favorite</option>
        </select>
        <button id="myFavorite" onClick={()=>router.push(`../pages/MyFavoriteHeroesPage`)}>My Favorite Heroes</button>
      </div>
      <ul className="heroList">
        {processData.length === 0 && <p>No Found Hero</p>}
        {processData.map((hero) => (
          
          
          <li key={hero.id} className="heroCard" onClick={()=>seeDetail(hero.id)}>
            <img 
              onClick={()=>seeDetail(hero.id,router)}
              src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.codeName}.png`} 
              alt={hero.localized_name} 
            />
            <p>♥:{hero.favoriteNum}</p>
            <p>{hero.localized_name}</p>
            <p>อัปเดตล่าสุด : {hero.timefavorite==null?"ยังไม่มีข้อมูล":hero.timefavorite}</p>
            {myFavoriteHeroId.includes(hero.id) && <p id="iconFavorite">⭐</p>}
          </li>
        ))}
      </ul>
    </div>
    <div id="favoriteBox">
    <div className="adminOptionBox">
        {/* <p>Admin Option</p> */}
        <p>Status : {currentUserRole}</p>
        {currentUserRole == "User" && 
        <button id="adminButton" onClick={()=>openOptinAdmin()}>Login With Admin</button>
        }
        {currentUserRole == "Admin" && 
        <div className="option">
          <p>Option:</p>
          <button id="commingSoon ">Comming Soon</button>
        </div>
        }
        {optionLoginOpen && <div className="adminLogin">
          <input id="adminId" type="text" placeholder="Admin Id" onChange={(event) => setAdminId(event.target.value)}></input>
          <input id="adminPassword" type="password" placeholder="Password" onChange={(event) => setAdminPassword(event.target.value)}></input>
          <button id="loginButton" onClick={()=>loginAgmin()}>submit</button>
        </div>}
        
      </div>
      <div id="insideFavoriteBox">
      <p id="textFavorite">TOP 10 FAVORITE</p>
      
      {favoriteData.map((favoriteHero) => (
        
          favoriteHero.favoriteNum>0 && (
            <li key={favoriteHero.id} className="heroCardTop" onClick={()=>seeDetail(favoriteHero.id)}>
            <img 
              onClick={()=>seeDetail(hero.id,router)}
              src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${favoriteHero.codeName}.png`} 
              alt={favoriteHero.localized_name} 
            />
            <div className="top10DetailBox">
              <p>⭐:{favoriteHero.favoriteNum}</p>
              <p>{favoriteHero.localized_name}</p>
            </div>
          </li>
          )
          
        ))}
        </div>
      </div>
    </div>
    </div>
    
  );
}
