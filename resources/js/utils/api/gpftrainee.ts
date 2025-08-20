import axios from 'axios';

const currentDomain = window.location.origin
const API_BASE_URL = `${currentDomain}/api`;

export const getGpfTrainees = async (strictnessLevel: number, perPage: number, pageNumber: number): Promise<any> => {
  const response = await axios.get<{ data: any }>(
    `${API_BASE_URL}/get-gpf-trainees`,
    { params: { 
      strictness_level: strictnessLevel,
      per_page: perPage,
      page_number: strictnessLevel,
     } }
  );
  
  return response.data;
};
