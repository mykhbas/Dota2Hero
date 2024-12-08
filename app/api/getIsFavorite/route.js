// import { decryptCookie } from './../../lib/cookie';
const { prisma } = require('../../lib/db.js');

export async function POST(req) {
    
    var data = await req.json();
    const userId = data.userId
    const heroId = parseInt(data.heroId)    
    if(!userId||!heroId){
      return new Response(JSON.stringify({error:`data loss`}),{status:400});
    }
    const listHeroFavorite = await prisma.Favorite.findUnique({
      where: {
        userId_heroId: { 
          userId, 
          heroId 
        }, 
    },
    })
    if (listHeroFavorite){
      return new Response(JSON.stringify(true));
    }
    return new Response(JSON.stringify(false));

  }