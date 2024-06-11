const API_KEY = '2462d11a-a860-437d-92fc-d69337c09305';
const API_URL = 'https://api4.thetvdb.com/v4';

const getToken = async () => {
  let token = '';
  if (!token) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apikey: API_KEY }),
    });
    const { data } = await response.json();
    token = data.token;
  }
  return token;
};

const fetchFromTVDB = async (endpoint) => {
  const authToken = await getToken();
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.json();
};

export default fetchFromTVDB;
