import { useState } from 'react';
import { useApp } from '../store';
import { guests, employees } from '../data';
import { Button, Input, Alert } from '../ui';
import PublicLayout from '../layouts/PublicLayout';

function LoginPage() {
  const { navigate, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Demo credentials shown as hint
  const demoCredentials = [
    { label: 'Hóspede', email: 'ana.carolina@email.com', note: '(hóspede demo)' },
    { label: 'Recepcionista', email: 'carolina.neves@barrahotel.com', note: '(staff demo)' },
    { label: 'Admin', email: 'maria.andrade@barrahotel.com', note: '(admin demo)' },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    // Check employees (staff/admin)
    const emp = employees.find(e => e.email === email && e.status === 'Ativo');
    if (emp) {
      login({
        type: emp.role === 'Administrador' || emp.role === 'Gerente' ? 'admin' : 'staff',
        data: emp,
      });
      setLoading(false);
      return;
    }

    // Check guests
    const guest = guests.find(g => g.email === email && g.status === 'Ativo');
    if (guest) {
      login({ type: 'guest', data: guest });
      setLoading(false);
      return;
    }

    setError('E-mail não encontrado ou credenciais inválidas. Use os acessos demo abaixo.');
    setLoading(false);
  }

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-[#1B2B4B] px-8 py-6 text-center">
              <div className="w-12 h-12 bg-[#B8963E] rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Barra Hotel</h1>
              <p className="text-slate-400 text-sm mt-1">Acesse sua conta</p>
            </div>

            <form className="px-8 py-6 space-y-4" onSubmit={handleSubmit}>
              {error && <Alert type="error" message={error} onClose={() => setError('')} />}

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40 focus:border-[#B8963E]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Senha</label>
                  <button
                    type="button"
                    onClick={() => navigate({ id: 'forgot-password' })}
                    className="text-xs text-[#B8963E] hover:text-[#9A7A2E] transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40 focus:border-[#B8963E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                Entrar
              </Button>

              <p className="text-center text-sm text-slate-500">
                Não tem conta?{' '}
                <button
                  type="button"
                  onClick={() => navigate({ id: 'register' })}
                  className="text-[#B8963E] hover:text-[#9A7A2E] font-medium"
                >
                  Criar conta
                </button>
              </p>
            </form>
          </div>

          {/* Demo hints */}
          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-700 mb-2">🔑 Acessos para demonstração (qualquer senha):</p>
            <div className="space-y-1">
              {demoCredentials.map(d => (
                <button
                  key={d.email}
                  onClick={() => setEmail(d.email)}
                  className="w-full text-left text-xs text-blue-600 hover:text-blue-800 flex justify-between"
                >
                  <span className="font-medium">{d.label}</span>
                  <span className="text-blue-400">{d.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

// ─── Register Page ────────────────────────────────────────────────────────────

export default LoginPage;
