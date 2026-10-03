import { useState } from 'react';
import { useApp } from '../store';
import { guests, employees } from '../data';
import { Button, Input, Alert } from '../ui';
import PublicLayout from '../layouts/PublicLayout';

function ForgotPasswordPage() {
  const { navigate } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  return (
    <PublicLayout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#1B2B4B]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#1B2B4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Recuperar senha</h1>
              <p className="text-sm text-slate-500 mt-1">Enviaremos um link para seu e-mail</p>
            </div>

            {sent ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">E-mail enviado!</h3>
                <p className="text-sm text-slate-500 mb-4">Verifique sua caixa de entrada em <strong>{email}</strong></p>
                <Button variant="outline" onClick={() => navigate({ id: 'login' })} className="w-full">Voltar ao login</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">E-mail cadastrado</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                  Enviar link de recuperação
                </Button>
                <Button type="button" variant="ghost" onClick={() => navigate({ id: 'login' })} className="w-full">
                  ← Voltar ao login
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default ForgotPasswordPage;
