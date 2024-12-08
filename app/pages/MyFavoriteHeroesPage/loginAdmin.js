export const login = async (adminId,passwordId) =>{
    const IsAdmin = await fetch(`/api/IsAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user:adminId,password:passwordId }),
      });
      return IsAdmin.json()
}