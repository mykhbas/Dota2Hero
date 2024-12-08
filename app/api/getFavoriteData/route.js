const { prisma } = require('../../lib/db.js');

export async function POST(req) {
    
    var data = await req.json();
    const userId = data.userId
    if(!userId){
      return new Response(JSON.stringify({error:`data loss`}),{status:400});
    }
    const listHeroFavorite = await prisma.Favorite.findMany({
      where: {
        userId:userId,
      }
    })
    // console.log("555555555",userId)

    if (listHeroFavorite&&listHeroFavorite.length>0){
      return new Response(JSON.stringify(listHeroFavorite), {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    }
    return new Response(JSON.stringify([]), {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });

  }