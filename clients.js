import { apiConfig } from "./src/services/api-config";

export async function getClients(clientId) {
  console.log('base url', apiConfig.baseUrl)
  console.log("id do cliente",clientId)
  // try {
  //   console.log("idCostumer", clientId);
  //   await fetch(`${apiConfig.baseUrl}/clients/${idClient}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   alert("Não foi possível encontrar o cliente");
  // }
}
