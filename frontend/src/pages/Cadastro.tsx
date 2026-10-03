import { useState } from 'react';
import { useApp } from '../store';
import { guests, employees } from '../data';
import { Button, Input, Alert } from '../ui';
import PublicLayout from '../layouts/PublicLayout';

function RegisterPage() {
  const { navigate } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', cpf: '', birthDate: '', gender: '', email: '', phone: '', mobile: '',
    zipCode: '', state: '', city: '', neighborhood: '', street: '', number: '', complement: '',
    password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPw, setShowPw] = useState(false);

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function validateStep1() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Nome é obrigatório';
    if (!form.cpf.trim()) errs.cpf = 'CPF é obrigatório';
    if (!form.birthDate) errs.birthDate = 'Data de nascimento é obrigatória';
    if (!form.gender) errs.gender = 'Sexo é obrigatório';
    if (!form.email.includes('@')) errs.email = 'E-mail inválido';
    if (!form.mobile.trim()) errs.mobile = 'Celular é obrigatório';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2() {
    const errs: Record<string, string> = {};
    if (!form.zipCode.trim()) errs.zipCode = 'CEP é obrigatório';
    if (!form.state) errs.state = 'Estado é obrigatório';
    if (!form.city.trim()) errs.city = 'Cidade é obrigatória';
    if (!form.street.trim()) errs.street = 'Rua é obrigatória';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep3() {
    const errs: Record<string, string> = {};
    if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Senhas não coincidem';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep3()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate({ id: 'login' });
  }

  const brazilianStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#1B2B4B] px-8 py-5">
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Criar sua conta</h1>
              <p className="text-slate-400 text-sm mt-0.5">Preencha seus dados para se cadastrar</p>

              {/* Steps indicator */}
              <div className="flex items-center gap-2 mt-4">
                {['Dados pessoais', 'Endereço', 'Senha'].map((label, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i + 1 <= step ? 'bg-[#B8963E] text-white' : 'bg-white/20 text-white/50'}`}>
                      {i + 1 < step ? '✓' : i + 1}
                    </div>
                    <span className={`text-xs ${i + 1 === step ? 'text-white' : 'text-white/40'}`}>{label}</span>
                    {i < 2 && <div className={`flex-1 h-0.5 w-8 ${i + 1 < step ? 'bg-[#B8963E]' : 'bg-white/20'}`} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-semibold text-slate-800">Dados pessoais</h2>
                  <Input label="Nome completo *" value={form.name} onChange={e => update('name', e.target.value)} error={errors.name} placeholder="Seu nome completo" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="CPF *" value={form.cpf} onChange={e => update('cpf', e.target.value)} error={errors.cpf} placeholder="000.000.000-00" />
                    <Input label="Data de nascimento *" type="date" value={form.birthDate} onChange={e => update('birthDate', e.target.value)} error={errors.birthDate} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">Sexo *</label>
                    <select value={form.gender} onChange={e => update('gender', e.target.value)} className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40 ${errors.gender ? 'border-red-400' : 'border-slate-200'}`}>
                      <option value="">Selecione</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                    {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                  </div>
                  <Input label="E-mail *" type="email" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} placeholder="seu@email.com" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Telefone" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="(00) 0000-0000" />
                    <Input label="Celular *" value={form.mobile} onChange={e => update('mobile', e.target.value)} error={errors.mobile} placeholder="(00) 90000-0000" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => navigate({ id: 'login' })} className="flex-1">Cancelar</Button>
                    <Button type="button" variant="primary" onClick={() => validateStep1() && setStep(2)} className="flex-1">Próximo →</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-semibold text-slate-800">Endereço</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="CEP *" value={form.zipCode} onChange={e => update('zipCode', e.target.value)} error={errors.zipCode} placeholder="00000-000" />
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-slate-700">Estado *</label>
                      <select value={form.state} onChange={e => update('state', e.target.value)} className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40 ${errors.state ? 'border-red-400' : 'border-slate-200'}`}>
                        <option value="">UF</option>
                        {brazilianStates.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                    </div>
                  </div>
                  <Input label="Cidade *" value={form.city} onChange={e => update('city', e.target.value)} error={errors.city} />
                  <Input label="Bairro" value={form.neighborhood} onChange={e => update('neighborhood', e.target.value)} />
                  <Input label="Rua *" value={form.street} onChange={e => update('street', e.target.value)} error={errors.street} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Número" value={form.number} onChange={e => update('number', e.target.value)} />
                    <Input label="Complemento" value={form.complement} onChange={e => update('complement', e.target.value)} />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">← Voltar</Button>
                    <Button type="button" variant="primary" onClick={() => validateStep2() && setStep(3)} className="flex-1">Próximo →</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <h2 className="font-semibold text-slate-800">Criar senha</h2>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">Senha *</label>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40 ${errors.password ? 'border-red-400' : 'border-slate-200'}`}
                      />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">Confirmar senha *</label>
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={e => update('confirmPassword', e.target.value)}
                      placeholder="Repita a senha"
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40 ${errors.confirmPassword ? 'border-red-400' : 'border-slate-200'}`}
                    />
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  {/* Password strength hint */}
                  {form.password.length > 0 && (
                    <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1">
                      {[
                        { ok: form.password.length >= 6, label: 'Mínimo 6 caracteres' },
                        { ok: /[A-Z]/.test(form.password), label: 'Pelo menos uma maiúscula' },
                        { ok: /[0-9]/.test(form.password), label: 'Pelo menos um número' },
                      ].map(r => (
                        <div key={r.label} className={`flex items-center gap-2 ${r.ok ? 'text-emerald-600' : 'text-slate-400'}`}>
                          <span>{r.ok ? '✓' : '○'}</span>
                          <span>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">← Voltar</Button>
                    <Button type="submit" variant="primary" loading={loading} className="flex-1">Criar conta</Button>
                  </div>
                </form>
              )}

              <p className="text-center text-sm text-slate-500 mt-4">
                Já tem conta?{' '}
                <button onClick={() => navigate({ id: 'login' })} className="text-[#B8963E] hover:text-[#9A7A2E] font-medium">Entrar</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}


export default RegisterPage;
