import { apiConfig } from "./api-config.js";

export async function getClient(clientId) {
 
  try {
    const response = await fetch(`${apiConfig.baseUrl}/clients/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
    // alert("Não foi possível encontrar o cliente");
  }
}
