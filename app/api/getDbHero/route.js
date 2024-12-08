const { prisma } = require('../../lib/db.js');
export async function GET() {
      const data = await prisma.Hero.findMany();
      return new Response(JSON.stringify(data, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }));
  }
  