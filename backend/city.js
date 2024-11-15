const getCityData = async (cityName) => {
  k = "pxeoHT343Cw83bteq58yhw==m7rfBKXAPLmouMwU"; // I know this seems insecure, but this is a public key that is used to access the API.
  const apiUrl = `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(cityName)}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': k
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
      
    } else {
      const errorMsg = await response.json();
      console.error("Error:", response.status, errorMsg);
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

module.exports = { getCityData };