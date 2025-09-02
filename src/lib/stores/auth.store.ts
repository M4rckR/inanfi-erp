import { create } from 'zustand/react';
import { Credentials, NavModule, NavUser, Usuario, usuarioToNavUser } from '@/lib/types/auth.type';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login, logout } from '@/lib/actions/login.action';
import { toast } from 'sonner';
import { navigation } from '@/lib/navs';

type AuthState = {
  isAuth: boolean;
  user: Usuario | null;
  modulo: number | null;
  navUser: NavUser | null;
  navModule: NavModule | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: (cookie: RequestCookie) => Promise<boolean>;
  changeModule: (navModule: NavModule) => void;
  mapperNavUser: () => void;
  getNavModule: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuth = create<AuthState>()(persist((set, get) => ({
  isAuth: false,
  user: null,
  navUser: null,
  modulo: null,
  navModule: null,
  isLoading: true,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    const result = await login(credentials);
    if (result.status !== 200) {
      set({ isLoading: false, error: result.errors![0].msg });
      toast.error(result.errors![0].msg, {
        richColors: true,
      });
      return false;
    }

    const usuario = result.payload as Usuario;
    const modulo = usuario.modulos.find(mod => mod.modPri)!;

    set({ isLoading: false, isAuth: true, user: usuario, modulo: modulo.modId });
    return true;
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    await logout();
    set({ isLoading: false, isAuth: false, user: null, modulo: null });
  },

  checkAuth: async (cookie) => {
    console.log(cookie);
    return false;
  },

  changeModule: (navModule) => {
    set({ navModule, modulo: navModule.id });
  },

  mapperNavUser: () => {
    set({ isLoading: true, error: null });
    const navUser = usuarioToNavUser(get().user!);
    set({ isLoading: false, navUser });
  },

  getNavModule: () => {
    set({ isLoading: true, error: null });
    const navModule = navigation.modules.find(m => m.id === get().modulo)!;
    set({ isLoading: false, navModule });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
    return;
  },

  setError: (error) => {
    return console.log(error);
    ;
  }
}), {
  name: 'auth',
  storage: createJSONStorage(() => localStorage),
  partialize: (store) => ({ user: store.user, isAuthenticated: store.isAuth, modulo: store.modulo })
}));