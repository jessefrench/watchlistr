const apiKey = process.env.NEXT_PUBLIC_TVDB_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TVDB_API_URL;

const getToken = async () => {
  let token = '';
  if (!token) {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apikey: apiKey }),
    });
    const { data } = await response.json();
    token = data.token;
  }
  return token;
};

const fetchFromTVDB = async (endpoint) => {
  const authToken = await getToken();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.json();
};

export default fetchFromTVDB;
