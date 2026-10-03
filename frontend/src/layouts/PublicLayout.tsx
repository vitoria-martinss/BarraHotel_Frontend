import { ReactNode } from 'react';
import { useApp } from '../store';
import logozinha from './images/logozinha.png';

interface PublicLayoutProps { children: ReactNode }

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { page, navigate, currentUser } = useApp();
  const pid = page.id;

  const navLinks = [
    { label: 'Início', id: 'home' },
    { label: 'Quartos', id: 'rooms' },
    { label: 'Serviços', id: 'services' },
    { label: 'Sobre', id: 'about' },
    { label: 'Contato', id: 'contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header className="bg-[#0E1825] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate({ id: 'home' })}
            className="flex items-center gap-2.5 group"
          >
            <img src={logozinha} alt="Barra Hotel" className="w-10 h-10 object-contain rounded-lg bg-white/5" />            
            <div>
              <span className="font-bold text-lg tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>Barra Hotel</span>
              <div className="h-0.5 w-0 group-hover:w-full bg-[#B8963E] transition-all duration-300" />
            </div>
          </button>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => navigate({ id: link.id as 'home' })}
                className={`text-sm font-medium transition-colors ${pid === link.id ? 'text-[#D4AF6A]' : 'text-slate-300 hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => navigate({ id: currentUser.type === 'guest' ? 'guest-dashboard' : currentUser.type === 'admin' ? 'admin-dashboard' : 'staff-dashboard' })}
                className="flex items-center gap-2 bg-[#B8963E] hover:bg-[#9A7A2E] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <span>Minha área</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate({ id: 'login' })}
                  className="text-sm text-slate-300 hover:text-white transition-colors font-medium px-3 py-1.5"
                >
                  Entrar
                </button>
                <button
                  onClick={() => navigate({ id: 'booking' })}
                  className="bg-[#B8963E] hover:bg-[#9A7A2E] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Fazer reserva
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#070E14] text-slate-300 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#B8963E] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Barra Hotel</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Navegação</h4>
              <ul className="space-y-2">
                {navLinks.map(l => (
                  <li key={l.id}>
                    <button onClick={() => navigate({ id: l.id as 'home' })} className="text-sm text-slate-400 hover:text-[#D4AF6A] transition-colors">{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Contato</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Av. Manoel Gomes Casaca, Nº 111 - Vila Santana, Vargem Grande do Sul/SP</li>
                <li>(19) 98448-7235</li>
                <li>(19) 98448-7235</li>
                <li>reservasbarrahotel@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Institucional</h4>
              <ul className="space-y-2">
                {['Política de Privacidade', 'Termos de Uso', 'Trabalhe Conosco', 'Acessibilidade'].map(item => (
                  <li key={item}><span className="text-sm text-slate-400 hover:text-[#D4AF6A] cursor-pointer transition-colors">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-slate-500">© 2026 Barra Hotel. Todos os direitos reservados.</p>
            <p className="text-xs text-slate-600">CEP 13880-000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
