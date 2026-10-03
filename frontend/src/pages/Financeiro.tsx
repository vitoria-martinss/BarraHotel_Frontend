import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function FinancialPage() {
  const [period, setPeriod] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const paidReservations = reservations.filter(r => ['Finalizada', 'Em hospedagem'].includes(r.status));
  const totalRevenue = paidReservations.reduce((sum, r) => sum + r.total, 0);
  const pendingRevenue = reservations.filter(r => r.status === 'Pendente').reduce((sum, r) => sum + r.total, 0);
  const cancelledRevenue = reservations.filter(r => r.status === 'Cancelada').reduce((sum, r) => sum + r.total, 0);

  const filtered = reservations.filter(r => {
    const guest = getGuestById(r.guestId);
    const text = `${r.code} ${guest?.name}`.toLowerCase();
    return !search || text.includes(search.toLowerCase());
  });

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Financeiro</h1>
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {[{ l: 'Todos', v: 'all' }, { l: '30 dias', v: '30d' }, { l: 'Este mês', v: 'month' }].map(p => (
              <button key={p.v} onClick={() => setPeriod(p.v)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${period === p.v ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>{p.l}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Receita total" value={formatCurrency(totalRevenue)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="#10B981" />
          <StatCard label="Pendente" value={formatCurrency(pendingRevenue)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="#F59E0B" />
          <StatCard label="Reservas pagas" value={paidReservations.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="#3B82F6" />
          <StatCard label="Cancelamentos" value={formatCurrency(cancelledRevenue)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="#EF4444" />
        </div>

        {/* Revenue chart */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Receita Mensal</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => formatCurrency(v as number)} contentStyle={{ borderRadius: '12px', fontSize: 12 }} />
              <Bar dataKey="receita" name="Receita" fill="#B8963E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Transactions table */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800">Registro de pagamentos</h3>
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} className="max-w-xs" placeholder="Buscar reserva ou hóspede..." />
          </div>

          <Table
            columns={[
              { key: 'date', header: 'Data', render: r => <span className="font-mono-data text-xs">{formatDate(r.createdAt)}</span> },
              { key: 'code', header: 'Reserva', render: r => <span className="font-mono-data text-xs text-slate-600">{r.code}</span> },
              { key: 'guest', header: 'Hóspede', render: r => <span className="font-medium text-sm">{getGuestById(r.guestId)?.name?.split(' ').slice(0, 2).join(' ')}</span> },
              { key: 'nights', header: 'Noites', render: r => <span className="text-sm">{r.nights}</span> },
              { key: 'payment', header: 'Forma de pagamento', render: r => (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.paymentMethod === 'PIX' ? 'bg-emerald-100 text-emerald-700' : r.paymentMethod === 'Dinheiro' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {r.paymentMethod}
                </span>
              )},
              { key: 'value', header: 'Valor', render: r => <span className="font-bold text-[#B8963E] text-sm">{formatCurrency(r.total)}</span> },
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


export default FinancialPage;
