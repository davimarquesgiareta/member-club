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

  if (client != undefined && searchInput.value != "") {
    clientContainerDiv.style.display = "contents";
    noClientFoundedDiv.style.display = "none";
  } else {
    clientContainerDiv.style.display = "none";
    noClientFoundedDiv.style.display = "flex";
  }
  setClientInfo();

  if (client.loyaltyCard.cutsRemaining == 0) {
    modal.style.display = "block";
  }
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
  img.src = client.photo;
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

  const remainingCuts = client.loyaltyCard.cutsRemaining;

  const newSpan = document.createElement("span");
  newSpan.className = "number-cuts-reamaining";
  newSpan.textContent = remainingCuts;

  const textCutsRemaining = document.querySelector(".text-cuts-remaining");

  if (textCutsRemaining && textCutsRemaining.parentNode) {
    textCutsRemaining.parentNode.insertBefore(newSpan, textCutsRemaining);
  }
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

  const spanToRemove = document.querySelector(".number-cuts-reamaining");

  if (spanToRemove) {
    spanToRemove.remove();
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

searchInput.addEventListener("input", (e) => {

  let input = e.target.value.replace(/\D/g, "");

  if (input.length > 12) {
      input = input.slice(0, 12);
  }

  if (input.length > 3 && input.length <= 6) {
      input = input.slice(0, 3) + '-' + input.slice(3);
  } else if (input.length > 6 && input.length <= 9) {
      input = input.slice(0, 3) + '-' + input.slice(3, 6) + '-' + input.slice(6);
  } else if (input.length > 9) {
      input = input.slice(0, 3) + '-' + input.slice(3, 6) + '-' + input.slice(6, 9) + '-' + input.slice(9, 12);
  }

  e.target.value = input;
});


// Obtém o modal
const modal = document.getElementById("modal");

// Obtém o botão que abre o modal
const btn = document.getElementById("openModal");

// Obtém o elemento <span> que fecha o modal
const span = document.getElementById("closeModal");

// Quando o usuário clica no botão, abre o modal

// Quando o usuário clica na <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
