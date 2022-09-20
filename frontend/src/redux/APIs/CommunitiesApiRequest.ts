import axios from "axios";

export const controlCommunityApi = async (data: { username: string, community: string }) => {
  const res = await axios.patch("/api/community/control", data);
  return res.data;
}

export const communitiesTypeApi = async () => {
  const res = await axios.get("/api/community/gettype");
  return res.data;
}

export const getCommunityTypeApi = async (data: { type: string }) => {
  const res = await axios.get(`/api/community/${data.type}`, { params: data });
  return res.data;
}