import { useState } from 'react';
import { useApp } from '../store';
import { Button, Badge, Card, Input, Select } from '../ui';
import PublicLayout from '../layouts/PublicLayout';

function ServicesPage() {
  return (
    <PublicLayout>
      <div className="bg-[#0E1825] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#D4AF6A] text-sm font-medium tracking-widest uppercase mb-2">Infraestrutura</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Serviços e Comodidades</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {title: 'Wi-Fi Gratuito', desc: 'Internet de alta velocidade disponível em todas as áreas do hotel, incluindo quartos, áreas comuns e piscina.' },
            {title: 'Café da Manhã Incluso', desc: 'Buffet completo servido diariamente das 6h às 10h, com opções quentes, frias, sucos naturais e frutas frescas.' },
            {title: 'Estacionamento Privativo', desc: 'Estacionamento coberto e gratuito para todos os hóspedes, com capacidade para 50 veículos.' },
            {title: 'Piscina com Raia', desc: 'Piscina exterior com raia de 25m, aberta das 7h às 22h. Toalhas fornecidas pelo hotel.' },
            {title: 'Limpeza e Governança', desc: 'Serviço de limpeza diária dos quartos, troca de roupas de cama e toalhas a cada dois dias ou sob solicitação.' },
            {title: 'Recepção 24 horas', desc: 'Atendimento personalizado 24 horas por dia, 7 dias por semana. Solicitações de serviço a qualquer momento.' },
            {title: 'Acessibilidade', desc: 'Quartos e áreas comuns adaptados para pessoas com mobilidade reduzida, com elevadores e rampas de acesso.' },
            {title: 'Bar e Restaurante', desc: 'Serviço de bar e restaurante no lobby, com cardápio regional e internacional. Funcionamento de almoço ao jantar.' },
          ].map(s => (
            <div key={s.title} className="flex gap-5 bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}


export default ServicesPage;
