import axios from "axios";
const API_URL = "http://localhost:5000";
export const fetchPackages = async () => {
  const response = await axios.get(`${API_URL}/packages`);

  return response.data;
};
export const fetchPackageById = async (id) => {
  const response = await axios.get(
    `${API_URL}/packages/${id}`
  );
  return response.data;
};
export const fetchAvailability = async (packageId) => {
  const response = await axios.get(
    `${API_URL}/availability/${packageId}`
  );
  return response.data;
};