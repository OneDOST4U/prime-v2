import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authApi, type AuthUser } from "../lib/api";

const ROLE_PRIORITY = [
  "ADMIN",
  "REGIONAL_DIRECTOR",
  "PROJECT_FOCAL",
  "RTEC_HEAD",
  "RTEC_MEMBER",
  "BUDGET_OFFICER",
  "ACCOUNTANT",
  "APPLICANT",
] as const;

export function getPrimaryRole(roles: string[]): string {
  for (const role of ROLE_PRIORITY) {
    if (roles.includes(role)) return role;
  }
  return roles[0] ?? "APPLICANT";
}

export interface AuthState {
  user: AuthUser | null;
  role: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginStaff: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const me = await authApi.me();
        if (active) setUser(me);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const loginStaff = useCallback(
    async (email: string, password: string) => {
      await authApi.staffLogin(email, password);
      await refreshUser();
    },
    [refreshUser],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      role: user ? getPrimaryRole(user.roles) : "APPLICANT",
      isLoading,
      isAuthenticated: Boolean(user),
      loginStaff,
      logout,
      refreshUser,
    }),
    [user, isLoading, loginStaff, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
