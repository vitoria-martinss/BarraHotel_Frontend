import { createContext, useContext, useState, ReactNode } from 'react';
import { type Guest, type Employee } from './data';

export type Page =
  // Public
  | { id: 'home' }
  | { id: 'rooms' }
  | { id: 'room-detail'; roomId: string }
  | { id: 'services' }
  | { id: 'about' }
  | { id: 'contact' }
  // Auth
  | { id: 'login' }
  | { id: 'register' }
  | { id: 'forgot-password' }
  // Guest area
  | { id: 'guest-dashboard' }
  | { id: 'booking'; step?: number; roomId?: string }
  | { id: 'booking-success'; reservationCode?: string }
  | { id: 'my-reservations' }
  | { id: 'guest-profile' }
  | { id: 'guest-password' }
  // Staff area
  | { id: 'staff-dashboard' }
  | { id: 'staff-reservations' }
  | { id: 'staff-guests' }
  | { id: 'checkin' }
  | { id: 'checkout' }
  | { id: 'staff-rooms' }
  | { id: 'housekeeping' }
  | { id: 'maintenance' }
  // Admin area
  | { id: 'admin-dashboard' }
  | { id: 'admin-rooms' }
  | { id: 'admin-categories' }
  | { id: 'admin-guests' }
  | { id: 'admin-reservations' }
  | { id: 'employees' }
  | { id: 'financial' }
  | { id: 'reports' }
  | { id: 'settings' }
  | { id: 'permissions' };

export type AuthUser =
  | { type: 'guest'; data: Guest }
  | { type: 'staff'; data: Employee }
  | { type: 'admin'; data: Employee };

interface AppContextType {
  page: Page;
  navigate: (page: Page) => void;
  currentUser: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  notifications: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>({ id: 'home' });
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [unreadNotifications] = useState(3);

  function navigate(nextPage: Page) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function login(user: AuthUser) {
    setCurrentUser(user);
    if (user.type === 'guest') navigate({ id: 'guest-dashboard' });
    else if (user.type === 'admin') navigate({ id: 'admin-dashboard' });
    else navigate({ id: 'staff-dashboard' });
  }

  function logout() {
    setCurrentUser(null);
    navigate({ id: 'home' });
  }

  return (
    <AppContext.Provider value={{ page, navigate, currentUser, login, logout, notifications: unreadNotifications }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
