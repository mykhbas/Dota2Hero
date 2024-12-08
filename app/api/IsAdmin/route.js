const { prisma } = require('../../lib/db.js');
import { comparePassword } from '../../lib/cookie';
export async function POST(req) {
    
    var data = await req.json();
    const user = data.user
    const password = data.password
    console.log(user,password)
    if(!user||!password){
      return new Response(JSON.stringify({error:`data loss`}),{status:400});
    }
    const haveId = await prisma.Admin.findFirst({
      where: {
            userId:user,
      }
    })

    if(haveId&& comparePassword(password,haveId.password)){
        return new Response(JSON.stringify(true));
    }
    return new Response(JSON.stringify(false));


  }