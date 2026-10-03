import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function AdminGuestsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<typeof guests[0] | null>(null);
  const PER_PAGE = 10;

  const filtered = guests.filter(g => {
    const text = `${g.name} ${g.cpf} ${g.email} ${g.city} ${g.state}`.toLowerCase();
    return !search || text.includes(search.toLowerCase());
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Gestão de Hóspedes</h1>
          <Button variant="primary">+ Cadastrar hóspede</Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total de hóspedes" value={guests.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} color="#1B2B4B" />
          <StatCard label="Ativos" value={guests.filter(g => g.status === 'Ativo').length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="#10B981" />
          <StatCard label="Novos este mês" value={guests.filter(g => g.registeredAt >= '2025-08-01').length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>} color="#B8963E" />
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-5">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Buscar por nome, CPF, e-mail, cidade..." className="flex-1 max-w-sm" />
          </div>
          <Table
            columns={[
              { key: 'name', header: 'Nome', render: g => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B2B4B] text-white text-xs flex items-center justify-center font-bold">{g.name.charAt(0)}</div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{g.name}</p>
                    <p className="text-xs text-slate-400">{g.email}</p>
                  </div>
                </div>
              )},
              { key: 'cpf', header: 'CPF', render: g => <span className="font-mono-data text-xs text-slate-600">{g.cpf}</span> },
              { key: 'phone', header: 'Celular', render: g => <span className="text-sm">{g.mobile}</span> },
              { key: 'city', header: 'Cidade', render: g => <span className="text-sm text-slate-500">{g.city}/{g.state}</span> },
              { key: 'total', header: 'Reservas', render: g => <span className="text-sm font-semibold">{g.totalReservations}</span> },
              { key: 'last', header: 'Última hospedagem', render: g => <span className="text-sm text-slate-400">{g.lastStay ? formatDate(g.lastStay) : '—'}</span> },
              { key: 'status', header: 'Status', render: g => <Badge label={g.status} /> },
              { key: 'actions', header: '', render: g => (
                <Dropdown
                  trigger={<button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2z" /></svg></button>}
                  items={[
                    { label: 'Visualizar', icon: '👁', onClick: () => setSelected(g) },
                    { label: 'Editar', icon: '✏️', onClick: () => {} },
                    { label: g.status === 'Ativo' ? 'Desativar' : 'Ativar', icon: g.status === 'Ativo' ? '🔴' : '🟢', onClick: () => {} },
                  ]}
                />
              )},
            ]}
            data={paginated}
          />
          <Pagination total={filtered.length} page={page} perPage={PER_PAGE} onChange={setPage} />
        </Card>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Perfil do hóspede" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#1B2B4B] text-white text-lg font-bold flex items-center justify-center">
                {selected.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selected.name}</h3>
                <p className="text-sm text-slate-500">{selected.email} · {selected.mobile}</p>
                <Badge label={selected.status} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4">
              {[
                ['CPF', selected.cpf], ['Nascimento', formatDate(selected.birthDate)], ['Sexo', selected.gender],
                ['Estado', selected.state], ['Cidade', selected.city], ['Cadastro', formatDate(selected.registeredAt)],
                ['Total reservas', String(selected.totalReservations)], ['Última hospedagem', selected.lastStay ? formatDate(selected.lastStay) : '—'],
              ].map(([l, v]) => (
                <div key={l}>
                  <p className="text-xs text-slate-400">{l}</p>
                  <p className="text-sm font-medium">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-2">Histórico de reservas</p>
              {reservations.filter(r => r.guestId === selected.id).slice(0, 5).map(res => (
                <div key={res.id} className="flex justify-between py-1.5 border-b border-slate-50 text-sm last:border-0">
                  <span className="font-mono-data text-xs text-slate-400">{res.code}</span>
                  <span>{formatDate(res.checkIn)} → {formatDate(res.checkOut)}</span>
                  <Badge label={res.status} />
                  <span className="font-semibold text-[#B8963E]">{formatCurrency(res.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}



export default AdminGuestsPage;
