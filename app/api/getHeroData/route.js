export async function GET() {
    const response = await fetch('https://api.opendota.com/api/heroStats');
    const data = await response.json();
  
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  }