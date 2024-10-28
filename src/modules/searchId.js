import { getClient } from "../services/clients.js";

const clientContainerDiv = document.querySelector(".client-container");
const noClientFoundedDiv = document.querySelector(".no-client-founded");

clientContainerDiv.style.display = "none";

const searchInput = document.getElementById("search");

let client = {};

async function getClientInfo() {
  const clientId = searchInput.value;
  client = await getClient(clientId);
  cleanClientInfo();

  if (client != undefined) {
    clientContainerDiv.style.display = "contents";
    noClientFoundedDiv.style.display = "none";
  } else {
    clientContainerDiv.style.display = "none";
    noClientFoundedDiv.style.display = "contents";
  }
  console.log("cliente:", client);
  setClientInfo();
}

function setClientInfo() {
  setUserInfo();
  setHistoryInfo();
  setLoyaltyInfo();
  setCutsRemainingInfo();
}

function cleanClientInfo() {
  cleanUserInfo();
  cleanHistoryInfo();
  cleanLoyaltyInfo();
  cleanCutsRemainingInfo();
}

function setUserInfo() {
  const profilePictureContainer = document.querySelector(".profile-picture");
  const infoProfileContainer = document.querySelector(".info-profile > div");

  const img = document.createElement("img");
  img.src = "../src/assets/diego.png";
  img.alt = "Foto de perfil";
  profilePictureContainer.appendChild(img);

  const h2 = document.createElement("h2");
  h2.textContent = client.name;
  infoProfileContainer.appendChild(h2);

  const p = document.createElement("p");
  p.textContent = `Cliente desde ${client.clientSince}`;
  infoProfileContainer.appendChild(p);
}

function setHistoryInfo() {
  const headerInfoHistory = document.querySelector(".header-info-history");
  const p = document.createElement("p");
  p.textContent = `${client.appointmentHistory.length} cortes`;
  headerInfoHistory.appendChild(p);

  const parentContainer = document.querySelector(".history");

  client.appointmentHistory.forEach((data) => {
    const containerInfoHistory = document.createElement("div");
    containerInfoHistory.className = "container-info-history";

    const dateContainer = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = data.date;

    const span = document.createElement("span");
    span.textContent = data.time;

    dateContainer.appendChild(h3);
    dateContainer.appendChild(span);

    const sealContainer = document.createElement("div");
    sealContainer.className = "container-seal";

    const img = document.createElement("img");
    img.src = "../src/assets/green-check.png";

    sealContainer.appendChild(img);

    containerInfoHistory.appendChild(dateContainer);
    containerInfoHistory.appendChild(sealContainer);

    parentContainer.appendChild(containerInfoHistory);
  });
}

function setLoyaltyInfo() {
  const userId = document.querySelector(".user-id");
  const p = document.createElement("p");
  p.textContent = `ID: ${client.id}`;
  userId.appendChild(p);

  let cutsRemainingUp =
    client.loyaltyCard.totalCuts >= 5 ? 5 : client.loyaltyCard.totalCuts;
  let cutsRemainingDown =
    client.loyaltyCard.totalCuts > 5
      ? client.loyaltyCard.totalCuts - cutsRemainingUp
      : 0;

  setSealListTop(cutsRemainingUp);
  setSealListDown(cutsRemainingDown);
}

function setCutsRemainingInfo() {
  const countCutsRemaining = document.querySelector(".count-cuts-reamaining");
  const p = document.createElement("p");
  p.textContent = `${client.loyaltyCard.totalCuts} de 10`;
  countCutsRemaining.appendChild(p);

	const numberCutsReamaining = document.querySelector(".cointainer-cuts-remaining > div");

	const span = document.createElement("span");
	span.style.display = "number-cuts-reamaining";
	span.textContent = '2';
	numberCutsReamaining.appendChild(span);
}

function cleanUserInfo() {
  const imgToRemove = document.querySelector(".profile-picture img");
  if (imgToRemove) imgToRemove.remove();

  const h2ToRemove = document.querySelector(".info-profile > div h2");
  if (h2ToRemove) h2ToRemove.remove();

  const pToRemove = document.querySelector(".info-profile > div p");
  if (pToRemove) pToRemove.remove();
}

function cleanHistoryInfo() {
  const paragraph = document.querySelector(".header-info-history > p");
  console.log("paragrafo", paragraph);
  if (paragraph != null) {
    paragraph.remove();
  }

  const containers = document.querySelectorAll(".container-info-history");

  containers.forEach((container) => container.remove());
}

function cleanLoyaltyInfo() {
  const userId = document.querySelector(".user-id > p");

  if (userId != null) {
    userId.remove();
  }
}

function cleanCutsRemainingInfo() {
  const paragraph = document.querySelector(".count-cuts-reamaining > p");
  if (paragraph != null) {
    paragraph.remove();
  }

	const cutsRemaing = document.querySelector(".cointainer-cuts-remaining > div span");
	console.log("cutsRemaing cutsRemaing ", cutsRemaing)
	if (cutsRemaing  != null) {
    cutsRemaing.remove();
  }


}

function setSealListTop(cuts) {
  const container = document.querySelector(".container-seal-list-top");

  container.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const loyaltySeal = document.createElement("div");
    loyaltySeal.className = "loyalty-seal";

    const img = document.createElement("img");
    if (i < cuts) {
      img.src = "../src/assets/PinCheck.png";
      img.className = "pin-check";
      img.alt = "Selo";
    }

    loyaltySeal.appendChild(img);
    container.appendChild(loyaltySeal);
  }
}

function setSealListDown(cuts) {
  const container = document.querySelector(".container-seal-list-down");

  container.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const loyaltySeal = document.createElement("div");
    loyaltySeal.className = "loyalty-seal";

    const img = document.createElement("img");
    if (i < cuts) {
      img.src = "../src/assets/PinCheck.png";
      img.className = "pin-check";
      img.alt = "Selo";
    }

    if (i == 4) {
      img.src = "../src/icons/gift-fill.svg";
      img.className = "gift-fill";
    }

    loyaltySeal.appendChild(img);
    container.appendChild(loyaltySeal);
  }
}

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getClientInfo();
  }
});
