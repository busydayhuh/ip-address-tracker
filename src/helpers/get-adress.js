export async function getUserAdress() {
  const userAdress = await fetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_o70Y8zUiKCw5cKlPEPKSb9FwP05m2"
  );
  return await userAdress.json();
}

export async function getRequestedAdress(ip) {
  const adress = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_o70Y8zUiKCw5cKlPEPKSb9FwP05m2&ipAddress=${ip}`
  );
  return await adress.json();
}
