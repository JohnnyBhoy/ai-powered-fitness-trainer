import axios from 'axios';

const currentDomain = window.location.origin
const API_BASE_URL = `${currentDomain}/api`;

export const getSubscriptions = async (userId: number): Promise<string[]> => {
  const response = await axios.get<{ subscription: string }[]>(
    `${API_BASE_URL}/subscriptions`,
    { params: { userId } }
  );

  return response.data.map(item => item.subscription);
};
