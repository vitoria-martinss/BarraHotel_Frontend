import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function AdminReservationsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = reservations.filter(r => {
    const guest = getGuestById(r.guestId);
    const text = `${r.code} ${guest?.name} ${getRoomById(r.roomId)?.number}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Reservas</h1>

        <div className="grid grid-cols-5 gap-3">
          {['Pendente', 'Confirmada', 'Em hospedagem', 'Finalizada', 'Cancelada'].map(s => (
            <button key={s} onClick={() => setStatusFilter(statusFilter === s ? '' : s)} className={`rounded-xl p-3 text-center border transition-all ${statusFilter === s ? 'border-[#1B2B4B] bg-[#1B2B4B] text-white' : 'bg-white border-slate-100'}`}>
              <p className={`text-lg font-bold ${statusFilter === s ? 'text-white' : 'text-slate-800'}`}>{reservations.filter(r => r.status === s).length}</p>
              <p className={`text-xs ${statusFilter === s ? 'text-white/70' : 'text-slate-400'}`}>{s}</p>
            </button>
          ))}
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-5">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} className="flex-1 max-w-sm" />
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              <option value="">Todos</option>
              {['Pendente', 'Confirmada', 'Em hospedagem', 'Finalizada', 'Cancelada'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <Table
            columns={[
              { key: 'code', header: 'Código', render: r => <span className="font-mono-data text-xs">{r.code}</span> },
              { key: 'guest', header: 'Hóspede', render: r => <span className="font-medium text-sm">{getGuestById(r.guestId)?.name?.split(' ').slice(0, 2).join(' ')}</span> },
              { key: 'room', header: 'Quarto', render: r => <span>{getRoomById(r.roomId)?.number} — {getRoomById(r.roomId)?.category}</span> },
              { key: 'checkin', header: 'Check-in', render: r => <span className="font-mono-data text-xs">{formatDate(r.checkIn)}</span> },
              { key: 'checkout', header: 'Check-out', render: r => <span className="font-mono-data text-xs">{formatDate(r.checkOut)}</span> },
              { key: 'guests', header: 'Hósp.', render: r => <span>{r.guests}</span> },
              { key: 'total', header: 'Valor', render: r => <span className="font-semibold text-[#B8963E]">{formatCurrency(r.total)}</span> },
              { key: 'payment', header: 'Pagamento', render: r => <span className="text-xs text-slate-400">{r.paymentMethod}</span> },
              { key: 'status', header: 'Status', render: r => <Badge label={r.status} /> },
            ]}
            data={filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)}
          />
          <Pagination total={filtered.length} page={page} perPage={PER_PAGE} onChange={setPage} />
        </Card>
      </div>
    </DashboardLayout>
  );
}

// ─── Employees ────────────────────────────────────────────────────────────────

export default AdminReservationsPage;
