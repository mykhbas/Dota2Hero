"use client"; 

import { useRouter } from 'next/navigation';  
import '../../styles/HomePage.css';
import {clickStart} from './clickStart';

export default function HomePage(){
    const router = useRouter(); 
    return (
    <>
    <button className="button" onClick={() => clickStart(router)}>Start With Guess</button>
    {/* <button className="button" onClick={() => clickRemove()}>Reset Account</button> */}

    </>
    
  );
}
