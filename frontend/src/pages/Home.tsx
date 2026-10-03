import { useState } from 'react';
import { useApp } from '../store';
import { Button, Badge, Card, Input, Select } from '../ui';
import { rooms, guests as guestData } from '../data';
import { formatarMoeda } from '../utils/formatters';
import PublicLayout from '../layouts/PublicLayout';
import { QuartoCard } from '../components/QuartoCard';

function HomePage() {
  const { navigate } = useApp();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const featuredRooms = rooms.filter(r => r.status === 'Disponível').slice(0, 3);

  const services = [
    { icon: '', label: 'Wi-Fi Gratuito', desc: 'Conexão rápida em todo hotel' },
    { icon: '', label: 'Café da Manhã', desc: 'Buffet completo diariamente' },
    { icon: '', label: 'Estacionamento', desc: 'Gratuito para hóspedes' },
    { icon: '', label: 'Piscina', desc: 'Aberta das 7h às 22h' },
    { icon: '', label: 'Limpeza Diária', desc: 'Serviço de governança' },
    { icon: '', label: 'Segurança 24h', desc: 'Recepção e monitoramento' },
    { icon: '', label: 'Ar-condicionado', desc: 'Nos quartos selecionados' },
    { icon: '', label: 'Frigobar', desc: 'Nas suítes selecionadas' },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#070E14]">
          <img
            src="https://images.unsplash.com/photo-1646991761123-d83ce47c30c9?w=1920&h=1080&fit=crop&auto=format"
            alt="Barra Hotel lobby"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-[#D4AF6A] text-sm font-medium tracking-[0.25em] uppercase mb-4">Vargem Grande do Sul, São Paulo</p>
          <h1 className="font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Barra Hotel
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Conforto, elegância e qualidade em cada detalhe da sua estadia.
          </p>

          {/* Availability Search */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-medium text-slate-300 uppercase tracking-wide">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/50"
                />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-medium text-slate-300 uppercase tracking-wide">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/50"
                />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-medium text-slate-300 uppercase tracking-wide">Hóspedes</label>
                <select
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none appearance-none"
                >
                  <option value="1" className="text-slate-900">1 hóspede</option>
                  <option value="2" className="text-slate-900">2 hóspedes</option>
                  <option value="3" className="text-slate-900">3 hóspedes</option>
                  <option value="4" className="text-slate-900">4 hóspedes</option>
                </select>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="self-end"
                onClick={() => navigate({ id: 'rooms' })}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1B2B4B] text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '36', label: 'Quartos' },
              { value: '4', label: 'Categorias' },
              { value: '500+', label: 'Hóspedes/ano' },
              { value: '4.8★', label: 'Avaliação' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-[#D4AF6A]" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
                <p className="text-sm text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#B8963E] text-sm font-medium tracking-widest uppercase mb-2">Acomodações</p>
            <h2 className="text-3xl font-bold text-[#0E1825]" style={{ fontFamily: 'var(--font-display)' }}>Nossos Quartos</h2>
          </div>
          <Button variant="outline" onClick={() => navigate({ id: 'rooms' })}>Ver todos os quartos →</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRooms.map(room => (
            <QuartoCard key={room.id} room={room} onDetail={() => navigate({ id: 'room-detail', roomId: room.id })} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#FAF9F6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[#B8963E] text-sm font-medium tracking-widest uppercase mb-2">O que oferecemos</p>
            <h2 className="text-3xl font-bold text-[#0E1825]" style={{ fontFamily: 'var(--font-display)' }}>Serviços e Comodidades</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {services.map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 text-center border border-slate-100 hover:border-[#D4AF6A]/40 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">{s.label}</h4>
                <p className="text-xs text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel photo strip */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-64">
          <div className="col-span-2 rounded-2xl overflow-hidden">
            <img src="" alt="Hotel pool" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src="" alt="Hotel breakfast" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src="" alt="Hotel interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B4B] py-16 text-center text-white">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Pronto para sua estadia?</h2>
          <p className="text-slate-300 mb-8">Reserve agora e garanta o melhor preço diretamente com o hotel.</p>
          <Button variant="secondary" size="lg" onClick={() => navigate({ id: 'booking' })}>
            Reservar agora
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}


export default HomePage;
