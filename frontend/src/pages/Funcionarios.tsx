import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [editEmp, setEditEmp] = useState<typeof employees[0] | null>(null);

  const filtered = employees.filter(e => {
    const text = `${e.name} ${e.cpf} ${e.email} ${e.role}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (roleFilter && e.role !== roleFilter) return false;
    return true;
  });

  const roleColors: Record<string, string> = {
    Administrador: 'bg-red-100 text-red-700',
    Gerente: 'bg-purple-100 text-purple-700',
    Recepcionista: 'bg-blue-100 text-blue-700',
    Funcionário: 'bg-slate-100 text-slate-600',
  };

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Gestão de Funcionários</h1>
          <Button variant="primary" onClick={() => setAddModal(true)}>+ Cadastrar funcionário</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {['Administrador', 'Gerente', 'Recepcionista', 'Funcionário'].map(role => (
            <button key={role} onClick={() => setRoleFilter(roleFilter === role ? '' : role)} className={`rounded-xl p-4 text-left border transition-all ${roleFilter === role ? 'border-[#1B2B4B] bg-[#1B2B4B] text-white' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
              <p className={`text-2xl font-bold ${roleFilter === role ? 'text-white' : 'text-slate-800'}`}>{employees.filter(e => e.role === role).length}</p>
              <p className={`text-xs mt-0.5 ${roleFilter === role ? 'text-white/70' : 'text-slate-400'}`}>{role}{employees.filter(e => e.role === role).length !== 1 ? 's' : ''}</p>
            </button>
          ))}
        </div>

        <Card className="p-5">
          <div className="flex gap-3 mb-5">
            <SearchBar value={search} onChange={setSearch} className="flex-1 max-w-sm" />
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              <option value="">Todos os cargos</option>
              {['Administrador', 'Gerente', 'Recepcionista', 'Funcionário'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <Table
            columns={[
              { key: 'name', header: 'Funcionário', render: e => (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0E1825] text-white text-sm font-bold flex items-center justify-center">{e.name.charAt(0)}</div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{e.name}</p>
                    <p className="text-xs text-slate-400">{e.email}</p>
                  </div>
                </div>
              )},
              { key: 'cpf', header: 'CPF', render: e => <span className="font-mono-data text-xs text-slate-600">{e.cpf}</span> },
              { key: 'role', header: 'Cargo', render: e => <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[e.role]}`}>{e.role}</span> },
              { key: 'dept', header: 'Departamento', render: e => <span className="text-sm text-slate-500">{e.department}</span> },
              { key: 'hired', header: 'Contratado em', render: e => <span className="text-sm text-slate-400 font-mono-data">{formatDate(e.hiredAt)}</span> },
              { key: 'username', header: 'Usuário', render: e => <span className="font-mono-data text-xs text-slate-600">{e.username}</span> },
              { key: 'status', header: 'Status', render: e => <Badge label={e.status} /> },
              { key: 'actions', header: '', render: e => (
                <Dropdown
                  trigger={<button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2z" /></svg></button>}
                  items={[
                    { label: 'Editar', icon: '✏️', onClick: () => setEditEmp(e) },
                    { label: 'Permissões', icon: '🔑', onClick: () => {} },
                    { label: e.status === 'Ativo' ? 'Desativar' : 'Ativar', icon: e.status === 'Ativo' ? '🔴' : '🟢', onClick: () => {} },
                  ]}
                />
              )},
            ]}
            data={filtered}
          />
        </Card>
      </div>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Cadastrar funcionário" size="lg">
        <form className="grid grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); setAddModal(false); }}>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Nome completo *</label>
            <input className="px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">CPF *</label>
            <input className="px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="000.000.000-00" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Data de nascimento</label>
            <input type="date" className="px-3 py-2 border border-slate-200 rounded-lg text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">E-mail *</label>
            <input type="email" className="px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Telefone</label>
            <input className="px-3 py-2 border border-slate-200 rounded-lg text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Cargo *</label>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              {['Recepcionista', 'Funcionário', 'Gerente', 'Administrador'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Departamento</label>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
              {['Recepção', 'Governança', 'Manutenção', 'Administração', 'Financeiro'].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Data de contratação</label>
            <input type="date" className="px-3 py-2 border border-slate-200 rounded-lg text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Usuário (login)</label>
            <input className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono-data" placeholder="nome.sobrenome" />
          </div>
          <div className="col-span-2 flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setAddModal(false)}>Cancelar</Button>
            <Button type="submit" variant="primary">Cadastrar funcionário</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}



export default EmployeesPage;
