const { prisma } = require('../../lib/db.js');

export async function POST(req) {
    
    var data = await req.json();
    const userId = data.userId
    const heroId = parseInt(data.heroId)

    if(!userId||!heroId){
      return new Response(JSON.stringify({error:`data loss`}),{status:400});
    }
    const haveFavorite = await prisma.Favorite.findUnique({
      where: {
        userId_heroId:{
            userId:userId,
            heroId:heroId
        }
        
      }
    })
    const incerseFavorite = async () =>{
        const dataHero = await prisma.Hero.findUnique({
            where:{
                id:heroId
            }
        });
        const time = new Date().toLocaleString('th-TH', {timeZone: 'Asia/Bangkok',day: '2-digit',month: '2-digit',year: 'numeric',hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: false});
        const updateHero = await prisma.Hero.update(
            {
                where:{
                    id:heroId
                },
                data:{
                    num_of_fav: dataHero.num_of_fav+1,
                    time_fav: time
                }
            }
        )
    }
    const decerseFavorite = async () =>{
        const dataHero = await prisma.Hero.findUnique({
            where:{
                id:heroId
            }
        });
        console.log("55555555",userId,heroId)

        const time = new Date().toLocaleString('th-TH', {timeZone: 'Asia/Bangkok',day: '2-digit',month: '2-digit',year: 'numeric',hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: false});
        const updateHero = await prisma.Hero.update(
            {
                where:{
                    id:heroId
                },
                data:{
                    num_of_fav: dataHero.num_of_fav-1,
                    time_fav: time
                }
            }
        )
    }
    if (haveFavorite){
        const updateFavorite = await prisma.Favorite.delete({
            where: {
                userId_heroId:{
                    userId:userId,
                    heroId:heroId
                }
            },
        })
        decerseFavorite();
        return new Response(JSON.stringify(false));

    }
    const createFavorite = await prisma.Favorite.create({
        data: {
          userId:userId,
          heroId:heroId
        }
      })
      incerseFavorite();
    return new Response(JSON.stringify(true));


  }