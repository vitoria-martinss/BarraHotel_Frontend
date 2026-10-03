import { useState } from 'react';
import { useApp } from '../store';
import { Button, Badge, Card, Input, Select } from '../ui';
import PublicLayout from '../layouts/PublicLayout';
import { rooms } from '../data';
import { QuartoCard } from '../components/QuartoCard';
import { formatarMoeda } from '../utils/formatters';

function RoomDetailPage({ roomId }: { roomId: string }) {
  const { navigate, currentUser } = useApp();
  const room = rooms.find(r => r.id === roomId);

  if (!room) return (
    <PublicLayout>
      <div className="text-center py-20">
        <p className="text-slate-500">Quarto não encontrado</p>
        <Button className="mt-4" onClick={() => navigate({ id: 'rooms' })}>Ver quartos</Button>
      </div>
    </PublicLayout>
  );

  const similar = rooms.filter(r => r.category === room.category && r.id !== room.id).slice(0, 3);

  return (
    <PublicLayout>
      {/* Hero image */}
      <div className="relative h-80 md:h-[28rem] bg-slate-200">
        <img src={room.photo} alt={`Quarto ${room.number}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="text-white">
            <p className="text-sm text-white/70 mb-1">{room.category} — {room.floor}º andar</p>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Quarto {room.number}
            </h1>
            <p className="text-white/80 mt-1">{room.subcategory.charAt(0).toUpperCase() + room.subcategory.slice(1)}</p>
          </div>
          <Badge label={room.status} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-sm text-slate-400 mb-8">
          <button onClick={() => navigate({ id: 'home' })} className="hover:text-[#1B2B4B]">Início</button>
          <span>/</span>
          <button onClick={() => navigate({ id: 'rooms' })} className="hover:text-[#1B2B4B]">Quartos</button>
          <span>/</span>
          <span className="text-slate-600">Quarto {room.number}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick specs */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '', label: 'Capacidade', value: `${room.capacity} pessoa${room.capacity > 1 ? 's' : ''}` },
                { icon: '', label: 'Camas', value: `${room.beds} ${room.bedType}${room.beds > 1 ? 's' : ''}` },
                { icon: '', label: 'Andar', value: `${room.floor}º andar` },
              ].map(spec => (
                <div key={spec.label} className="bg-white rounded-xl p-4 border border-slate-100 text-center">
                  <span className="text-2xl">{spec.icon}</span>
                  <p className="text-xs text-slate-400 mt-1">{spec.label}</p>
                  <p className="font-semibold text-slate-800 text-sm mt-0.5">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>Sobre o quarto</h2>
              <p className="text-slate-600 leading-relaxed">{room.description}</p>
              {room.observations && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-700">⚠️ {room.observations}</p>
                </div>
              )}
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Comodidades</h2>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 sticky top-20">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-3xl font-bold text-[#B8963E]">{formatarMoeda(room.dailyRate)}</span>
                <span className="text-sm text-slate-400">/diária</span>
              </div>
              <Badge label={room.status} className="mb-5" />

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">CHECK-IN</label>
                  <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">CHECK-OUT</label>
                  <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 block mb-1">HÓSPEDES</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none">
                    {Array.from({ length: room.capacity }, (_, i) => (
                      <option key={i + 1}>{i + 1} hóspede{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={room.status !== 'Disponível'}
                onClick={() => {
                  if (!currentUser) navigate({ id: 'login' });
                  else navigate({ id: 'booking', roomId: room.id });
                }}
              >
                {room.status === 'Disponível' ? 'Reservar este quarto' : 'Indisponível'}
              </Button>

              {room.status !== 'Disponível' && (
                <p className="text-xs text-center text-slate-400 mt-2">Este quarto não está disponível no momento</p>
              )}

              {!currentUser && room.status === 'Disponível' && (
                <p className="text-xs text-center text-slate-400 mt-3">
                  É necessário{' '}
                  <button onClick={() => navigate({ id: 'login' })} className="text-[#B8963E] underline">fazer login</button>
                  {' '}para reservar
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Similar rooms */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Quartos similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similar.map(r => (
                <QuartoCard key={r.id} room={r} onDetail={() => navigate({ id: 'room-detail', roomId: r.id })} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

// ─── Services Page ────────────────────────────────────────────────────────────

export default RoomDetailPage;
