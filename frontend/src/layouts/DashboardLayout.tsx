import { ReactNode, useState } from 'react';
import { useApp, type Page } from '../store';
import { notifications as notifData } from '../data';
import logozinha from './images/logozinha.png';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  page: Page;
  badge?: number;
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  navItems: NavItem[];
  area: 'guest' | 'staff' | 'admin';
}

export default function DashboardLayout({ children, title, navItems, area }: DashboardLayoutProps) {
  const { navigate, currentUser, logout, page, notifications } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const areaColors: Record<string, { bg: string; accent: string; light: string }> = {
    guest: { bg: '#1B2B4B', accent: '#B8963E', light: '#2D4270' },
    staff: { bg: '#0D1520', accent: '#B8963E', light: '#1B2B4B' },
    admin: { bg: '#070E14', accent: '#B8963E', light: '#0E1825' },
  };
  const colors = areaColors[area];

  const userName = currentUser?.data.name ?? 'Usuário';
  const userInitials = userName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="flex h-screen bg-[#F8F7F4] overflow-hidden" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <aside
        className="flex-shrink-0 flex flex-col transition-all duration-200"
        style={{ width: sidebarOpen ? 240 : 64, background: colors.bg }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <img src={logozinha} alt="Barra Hotel" className="w-10 h-10 object-contain rounded-lg bg-white/5" /> 
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate" style={{ fontFamily: 'var(--font-display)' }}>Barra Hotel</p>
                <p className="text-xs truncate" style={{ color: colors.accent }}>{title}</p>
              </div>
            </div>
          ) : (
            <img src="/images/logozinha.png" alt="Barra Hotel" className="w-8 h-8 mx-auto rounded-lg object-contain bg-white/5" />
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <div className="space-y-0.5 px-2">
            {navItems.map(item => {
              const isActive = page.id === item.page.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.page)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${isActive ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                  style={isActive ? { background: colors.accent } : {}}
                >
                  <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Collapse button */}
        <div className="px-2 py-3 border-t border-white/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-white/40 hover:text-white/70 transition-colors text-sm rounded-lg hover:bg-white/5"
          >
            {sidebarOpen ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                <span className="text-xs">Recolher</span>
              </>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 flex-shrink-0">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
              {navItems.find(n => n.page.id === page.id)?.label ?? 'Painel'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input placeholder="Buscar..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm bg-slate-50 w-48 focus:outline-none focus:ring-2 focus:ring-[#B8963E]/30 focus:border-[#B8963E] focus:bg-white" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800 text-sm">Notificações</h3>
                    <span className="text-xs text-slate-400">{notifications} novas</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifData.map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? 'bg-blue-50/40' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'success' ? 'bg-emerald-400' : n.type === 'error' ? 'bg-red-400' : n.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100">
                    <button className="text-xs text-[#B8963E] hover:text-[#9A7A2E] font-medium">Ver todas</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: colors.accent }}>
                {userInitials}
              </div>
              {sidebarOpen && (
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-800 leading-none">{userName.split(' ').slice(0, 2).join(' ')}</p>
                  <p className="text-xs text-slate-400 mt-0.5 capitalize">{currentUser?.type}</p>
                </div>
              )}
              <button
                onClick={() => { navigate({ id: 'home' }); logout(); }}
                title="Sair"
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
