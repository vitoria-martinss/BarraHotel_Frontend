import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function StaffRoomsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<typeof rooms[0] | null>(null);

  const filtered = rooms.filter(r => {
    const text = `${r.number} ${r.category} ${r.subcategory}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  const statusOptions = ['Disponível', 'Reservado', 'Ocupado', 'Limpeza', 'Manutenção'];

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Quartos</h1>

        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setStatusFilter('')} className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${!statusFilter ? 'bg-[#1B2B4B] text-white border-[#1B2B4B]' : 'bg-white text-slate-600 border-slate-200'}`}>
            Todos ({rooms.length})
          </button>
          {statusOptions.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${statusFilter === s ? 'bg-[#1B2B4B] text-white border-[#1B2B4B]' : 'bg-white text-slate-600 border-slate-200'}`}>
              {s} ({rooms.filter(r => r.status === s).length})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} className="max-w-xs" />
          <span className="text-sm text-slate-400">{filtered.length} quartos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(room => (
            <div key={room.id} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(room)}>
              <div className="relative h-36 overflow-hidden rounded-t-xl bg-slate-100">
                <img src={room.photo} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2"><Badge label={room.status} /></div>
                <div className="absolute bottom-2 left-2 bg-[#1B2B4B]/80 text-white text-xs px-2 py-1 rounded-lg font-medium">
                  Quarto {room.number}
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-slate-800 text-sm">{room.category}</p>
                <p className="text-xs text-slate-400">{room.subcategory} · {room.floor}º andar</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-500">👤 {room.capacity} · 🛏 {room.beds}</span>
                  <span className="text-sm font-bold text-[#B8963E]">{formatCurrency(room.dailyRate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Quarto ${selected?.number}`} size="md">
        {selected && (
          <div className="space-y-4">
            <img src={selected.photo} alt="" className="w-full h-40 rounded-xl object-cover" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800">{selected.category} — {selected.subcategory}</h3>
                <p className="text-sm text-slate-500">{selected.floor}º andar · Quarto {selected.number}</p>
              </div>
              <Badge label={selected.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-xl p-3">
              <div><p className="text-xs text-slate-400">Capacidade</p><p className="font-semibold">{selected.capacity} pess.</p></div>
              <div><p className="text-xs text-slate-400">Camas</p><p className="font-semibold">{selected.beds} {selected.bedType}</p></div>
              <div><p className="text-xs text-slate-400">Diária</p><p className="font-semibold text-[#B8963E]">{formatCurrency(selected.dailyRate)}</p></div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Comodidades</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.amenities.map(a => <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{a}</span>)}
              </div>
            </div>
            <p className="text-sm text-slate-600">{selected.description}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Editar quarto</Button>
              <Button variant="primary" size="sm" className="flex-1">Alterar status</Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

// ─── Housekeeping ─────────────────────────────────────────────────────────────

export default StaffRoomsPage;
