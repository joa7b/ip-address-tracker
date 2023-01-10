const getIP = async (add = "8.8.8.8") => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_WZtENzaByGhy6ocJ9ver9LRG5WBUR&ipAddress=${add}`
  );
  const data = await response.json();
  return data;
};

const buttonSearch = document.querySelector("#buttonSearch");

buttonSearch.addEventListener("click", async function () {
  const input = document.querySelector("#inputIP");
  const data = await getIP(input.value);
  document.querySelector("#spanIpAddress").innerText = data.ip;
  document.querySelector(
    "#spanLocation"
  ).innerText = `${data.location.city}, ${data.location.region} - ${data.location.country}`;
  document.querySelector(
    "#spanTimezone"
  ).innerText = `UTC ${data.location.timezone}`;
  document.querySelector("#spanISP").innerText = data.isp;

  const lat = data.location.lat;
  const lng = data.location.lng;

  document.getElementById("containerMap").innerHTML = `
    <iframe
    src="https://maps.google.com/maps?q=${lat},${lng}&hl=pt-BR&z=16&amp;output=embed"
    width="800"
    height="600"
    style="border: 0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    id="map"
    ></iframe>
    `;

  // map.setAttribute('src',`https://maps.google.com/maps?q=${data.location.lat},${data.location.lng}&hl=pt-BR&z=14&amp;output=embed`)
  // map.src = `https://maps.google.com/maps?q=${data.location.lat},${data.location.lng}&hl=pt-BR&z=14&amp;output=embed`
});
