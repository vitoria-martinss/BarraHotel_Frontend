import { useState } from 'react';
import { rooms } from '../data';
import { useApp } from '../store';
import { Button, Badge, Card, Input, Select } from '../ui';
import PublicLayout from '../layouts/PublicLayout';
import { QuartoCard } from '../components/QuartoCard';

function RoomsPage() {
  const { navigate, currentUser } = useApp();
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  const filtered = rooms.filter(r => {
    if (category && r.category !== category) return false;
    if (status && r.status !== status) return false;
    if (maxPrice && r.dailyRate > Number(maxPrice)) return false;
    if (search && !`${r.category} ${r.subcategory} ${r.number}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categories = ['Single', 'Casal', 'Triplo', 'Quádruplo'] as const;

  return (
    <PublicLayout>
      <div className="bg-[#0E1825] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#D4AF6A] text-sm font-medium tracking-widest uppercase mb-2">Acomodações</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Nossos Quartos</h1>
          <p className="text-slate-400 mt-2">Escolha a acomodação perfeita para você</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!category ? 'bg-[#1B2B4B] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B2B4B]'}`}
          >
            Todos ({rooms.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${category === cat ? 'bg-[#1B2B4B] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B2B4B]'}`}
            >
              {cat} ({rooms.filter(r => r.category === cat).length})
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-5">
              <h3 className="font-semibold text-slate-800">Filtros</h3>
              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">Buscar</label>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Tipo ou número..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                >
                  <option value="">Todos</option>
                  <option value="Disponível">Disponível</option>
                  <option value="Reservado">Reservado</option>
                  <option value="Ocupado">Ocupado</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">Preço máx. /diária</label>
                <select
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                >
                  <option value="">Sem limite</option>
                  <option value="100">Até R$ 100</option>
                  <option value="150">Até R$ 150</option>
                  <option value="200">Até R$ 200</option>
                  <option value="300">Até R$ 300</option>
                  <option value="400">Até R$ 400</option>
                </select>
              </div>
              <button
                onClick={() => { setCategory(''); setStatus(''); setMaxPrice(''); setSearch(''); }}
                className="w-full text-sm text-slate-500 hover:text-slate-700 underline"
              >
                Limpar filtros
              </button>
            </div>
          </aside>

          {/* Rooms grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500">{filtered.length} acomodações encontradas</p>
            </div>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                <p className="text-slate-500 font-medium">Nenhum quarto encontrado</p>
                <p className="text-slate-400 text-sm mt-1">Tente ajustar os filtros</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(room => (
                  <QuartoCard
                    key={room.id}
                    room={room}
                    onDetail={() => navigate({ id: 'room-detail', roomId: room.id })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

// ─── Room Detail Page ─────────────────────────────────────────────────────────

export default RoomsPage;
