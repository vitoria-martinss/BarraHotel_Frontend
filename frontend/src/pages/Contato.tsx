import { useState } from 'react';
import { useApp } from '../store';
import { Button, Badge, Card, Input, Select } from '../ui';
import PublicLayout from '../layouts/PublicLayout';

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PublicLayout>
      <div className="bg-[#0E1825] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#D4AF6A] text-sm font-medium tracking-widest uppercase mb-2">Fale conosco</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Contato</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1B2B4B]" style={{ fontFamily: 'var(--font-display)' }}>Informações de contato</h2>
            {[
              {label: 'Endereço', value: 'Av. Manoel Gomes Casaca, Nº 111 — Vila Santana, Vargem Grande do Sul/SP, CEP 13880-000' },
              {label: 'Telefone', value: '(19) 98448-7235' },
              {label: 'WhatsApp', value: '(19) 98448-7235' },
              {label: 'E-mail', value: 'reservasbarrahotel@gmail.com' },
              {label: 'Atendimento', value: '24 horas - 7 dias por semana' },
            ].map(item => (
              <div key={item.label} className="flex gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{item.label}</p>
                  <p className="text-slate-700 mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Mensagem enviada!</h3>
                <p className="text-slate-500 text-sm">Retornaremos em até 24 horas.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                <h3 className="font-bold text-slate-800 text-lg" style={{ fontFamily: 'var(--font-display)' }}>Envie uma mensagem</h3>
                <Input label="Nome" placeholder="Seu nome completo" required />
                <Input label="E-mail" type="email" placeholder="seu@email.com" required />
                <Input label="Assunto" placeholder="Como podemos ajudar?" required />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">Mensagem</label>
                  <textarea
                    rows={4}
                    placeholder="Escreva sua mensagem..."
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#B8963E]/30"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full">Enviar mensagem</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default ContactPage;
