import apiClient from "./axios";

export const logIn = async (formData) => {
  const response = await apiClient.post('/login', formData);
  return response.data
}
export const register = async (data) => {
  const response = await apiClient.post('/register/step-1',data,);
  return response.data
}

export const logOut = async () => {
  const response = await apiClient.post("/logout", {})
  return response.data
}

export const getUser = async (profileId) => {
  const response = await apiClient.get(`/profile/${profileId}`)
  return response.data.profile
}
export const completeProfile = async (id,data) => {
  const response = await apiClient.post(`/register/step-3/${id}`, data)
  return response.data
}
export const VerificationEmail = async (id ,data) => {
  const response = await apiClient.post(`/register/step-2/${id}`, data)
  return response.data
}
export const reSendCode = async (id) => {
  const response = await apiClient.post(`/register/resend-code/${id}`, {})
  return response.data
}