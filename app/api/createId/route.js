import {v4 as uuidv4} from 'uuid';
import { encryptCookie } from './../../lib/cookie';
const { prisma } = require('../../lib/db.js');

export async function GET() {
    
    try {
        const id = uuidv4();
        const encryptCookieId = encryptCookie(id);
        await prisma.user.create({
            data: {
                id: encryptCookieId
            }});
        console.log("checkId",encryptCookieId)
        return new Response(JSON.stringify({user_id:encryptCookieId}));
    } catch (error) {
        return new Response(JSON.stringify({error}), {status: 500});
    }
  }
//   model User {
//     id        String   @id
//     createdAt DateTime @default(now())
  
//     favorites Favorite[]
//   }