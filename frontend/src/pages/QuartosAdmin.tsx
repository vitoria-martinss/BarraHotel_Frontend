import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function AdminRoomsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editRoom, setEditRoom] = useState<typeof rooms[0] | null>(null);
  const PER_PAGE = 10;

  const filtered = rooms.filter(r => {
    const text = `${r.number} ${r.category} ${r.subcategory}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    if (categoryFilter && r.category !== categoryFilter) return false;
    return true;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Summary
  const summaryStats = [
    { label: 'Total', value: rooms.length, color: '#1B2B4B' },
    { label: 'Disponíveis', value: rooms.filter(r => r.status === 'Disponível').length, color: '#10B981' },
    { label: 'Ocupados', value: rooms.filter(r => r.status === 'Ocupado').length, color: '#F59E0B' },
    { label: 'Reservados', value: rooms.filter(r => r.status === 'Reservado').length, color: '#3B82F6' },
    { label: 'Limpeza', value: rooms.filter(r => r.status === 'Limpeza').length, color: '#8B5CF6' },
    { label: 'Manutenção', value: rooms.filter(r => r.status === 'Manutenção').length, color: '#EF4444' },
  ];

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Gestão de Quartos</h1>
          <Button variant="primary" onClick={() => setAddModal(true)}>+ Cadastrar quarto</Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {summaryStats.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-100 text-center">
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} className="flex-1 min-w-48 max-w-xs" />
            <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none">
              <option value="">Todas as categorias</option>
              {['Single', 'Casal', 'Triplo', 'Quádruplo'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none">
              <option value="">Todos os status</option>
              {['Disponível', 'Reservado', 'Ocupado', 'Limpeza', 'Manutenção'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <Table
            columns={[
              { key: 'number', header: 'Número', render: r => <span className="font-bold text-slate-800">Quarto {r.number}</span> },
              { key: 'category', header: 'Categoria', render: r => <span className="font-medium text-sm">{r.category}</span> },
              { key: 'subcategory', header: 'Subcategoria', render: r => <span className="text-sm text-slate-500">{r.subcategory}</span> },
              { key: 'floor', header: 'Andar', render: r => <span className="text-sm">{r.floor}º</span> },
              { key: 'capacity', header: 'Capac.', render: r => <span className="text-sm">{r.capacity} pess.</span> },
              { key: 'rate', header: 'Diária', render: r => <span className="text-sm font-semibold text-[#B8963E]">{formatCurrency(r.dailyRate)}</span> },
              { key: 'status', header: 'Status', render: r => <Badge label={r.status} /> },
              {
                key: 'actions', header: '', render: r => (
                  <Dropdown
                    trigger={<button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2z" /></svg></button>}
                    items={[
                      { label: 'Editar', icon: '✏️', onClick: () => setEditRoom(r) },
                      { label: 'Alterar status', icon: '🔄', onClick: () => {} },
                      { label: 'Alterar preço', icon: '💰', onClick: () => {} },
                      { label: 'Ver detalhes', icon: '👁', onClick: () => {} },
                    ]}
                  />
                )
              },
            ]}
            data={paginated}
          />
          <Pagination total={filtered.length} page={page} perPage={PER_PAGE} onChange={setPage} />
        </Card>
      </div>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Cadastrar quarto" size="lg">
        <form className="grid grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); setAddModal(false); }}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Número do quarto *</label>
            <input className="px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="ex: 101" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Andar *</label>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}º andar</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Categoria *</label>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              {['Single', 'Casal', 'Triplo', 'Quádruplo'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Subcategoria *</label>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              {['com ar-condicionado', 'com ventilador', 'com ar-condicionado + frigobar'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Capacidade</label>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} pessoa{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Valor da diária (R$)</label>
            <input type="number" className="px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="120.00" />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Descrição</label>
            <textarea rows={2} className="px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
          </div>
          <div className="col-span-2 flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setAddModal(false)}>Cancelar</Button>
            <Button type="submit" variant="primary">Cadastrar quarto</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

// ─── Room Categories ──────────────────────────────────────────────────────────

export default AdminRoomsPage;
