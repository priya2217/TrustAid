// src/api.ts - API utils for MongoDB backend
import type { AppUser } from "./types/auth";

const API_BASE = "/api";

const normalizeRequest = (request: any) => ({
  ...request,
  id: request.id || request._id,
  submittedAt: request.submittedAt || request.createdAt,
  funded: typeof request.funded === "boolean" ? request.funded : (request.fundedAmount || 0) >= (request.amount || 0),
});

const normalizeDonation = (donation: any) => ({
  ...donation,
  id: donation.id || donation._id,
});

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const url = `${API_BASE}${endpoint}`;
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const getRequests = (params?: {
  category?: string;
  urgency?: string;
  ownerId?: string;
}) => {
  const query = new URLSearchParams(params as any).toString();
  return apiRequest(`/requests${query ? `?${query}` : ""}`).then((requests) =>
    requests.map(normalizeRequest)
  );
};

export const createRequest = (data: any) =>
  apiRequest("/requests", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(normalizeRequest);

export const getUsers = () => apiRequest("/users");

export const createUser = (data: any) =>
  apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const registerUser = (data: {
  email: string;
  password: string;
  fullName: string;
  role: AppUser["role"];
}) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  }) as Promise<{ user: AppUser }>;

export const loginUser = (data: { email: string; password: string }) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  }) as Promise<{ user: AppUser }>;

export const getDonations = (params?: { donorId?: string }) => {
  const query = new URLSearchParams(params as any).toString();
  return apiRequest(`/donations${query ? `?${query}` : ""}`).then((donations) =>
    donations.map(normalizeDonation)
  );
};

export const createDonation = (data: any) =>
  apiRequest("/donations", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(normalizeDonation);
