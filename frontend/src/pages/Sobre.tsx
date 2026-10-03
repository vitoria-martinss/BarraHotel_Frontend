import { useState } from 'react';
import { useApp } from '../store';
import { Button, Badge, Card, Input, Select } from '../ui';
import PublicLayout from '../layouts/PublicLayout';

function AboutPage() {
  return (
    <PublicLayout>
      <div className="bg-[#0E1825] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#D4AF6A] text-sm font-medium tracking-widest uppercase mb-2">Nossa história</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Sobre o Barra Hotel</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1B2B4B] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Tradição e elegância desde 2008</h2>
            <p className="text-slate-600 leading-relaxed mb-4">O Barra Hotel nasceu do sonho de oferecer uma hospitalidade única em Vargem Grande do Sul, em Vargem Grande do Sul, São Paulo. Com mais de 15 anos de tradição, somos referência em conforto, segurança e qualidade no atendimento.</p>
            <p className="text-slate-600 leading-relaxed">Nossa equipe é treinada para garantir que cada hóspede se sinta em casa, com atendimento personalizado e atenção a cada detalhe.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?w=600&h=400&fit=crop&auto=format" alt="Hotel" className="rounded-2xl w-full h-64 object-cover" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[{ n: '15+', l: 'Anos de história' }, { n: '36', l: 'Quartos' }, { n: '500+', l: 'Hóspedes/ano' }, { n: '4.8★', l: 'Satisfação' }].map(s => (
            <div key={s.l} className="bg-[#1B2B4B] text-white rounded-2xl p-5 text-center">
              <p className="text-2xl font-bold text-[#D4AF6A]" style={{ fontFamily: 'var(--font-display)' }}>{s.n}</p>
              <p className="text-xs text-slate-400 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}


export default AboutPage;
