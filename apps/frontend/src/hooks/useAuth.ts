export interface AuthState {
  user: null;
  role: string;
  isLoading: boolean;
}

export function useAuth(): AuthState {
  return {
    user: null,
    role: "APPLICANT",
    isLoading: false,
  };
}
