import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function StaffGuestsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<typeof guests[0] | null>(null);
  const PER_PAGE = 10;

  const filtered = guests.filter(g => {
    const text = `${g.name} ${g.cpf} ${g.email} ${g.city}`.toLowerCase();
    return !search || text.includes(search.toLowerCase());
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Gestão de Hóspedes</h1>
          <Button variant="primary">+ Cadastrar hóspede</Button>
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-5">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Buscar por nome, CPF, e-mail..." className="flex-1 max-w-sm" />
            <span className="text-sm text-slate-400">{filtered.length} hóspede{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <Table
            columns={[
              { key: 'name', header: 'Nome', render: g => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B2B4B] text-white text-xs flex items-center justify-center font-bold">{g.name.charAt(0)}</div>
                  <span className="font-medium text-slate-800 text-sm">{g.name}</span>
                </div>
              )},
              { key: 'cpf', header: 'CPF', render: g => <span className="font-mono-data text-xs text-slate-600">{g.cpf}</span> },
              { key: 'email', header: 'E-mail', render: g => <span className="text-sm text-slate-600">{g.email}</span> },
              { key: 'phone', header: 'Telefone', render: g => <span className="text-sm text-slate-600">{g.mobile}</span> },
              { key: 'city', header: 'Cidade', render: g => <span className="text-sm text-slate-500">{g.city}/{g.state}</span> },
              { key: 'total', header: 'Reservas', render: g => <span className="text-sm font-medium text-slate-800">{g.totalReservations}</span> },
              { key: 'lastStay', header: 'Última hospedagem', render: g => <span className="text-sm text-slate-500">{g.lastStay ? formatDate(g.lastStay) : '—'}</span> },
              { key: 'status', header: 'Status', render: g => <Badge label={g.status} /> },
              { key: 'actions', header: '', render: g => (
                <div className="flex gap-1">
                  <button onClick={() => setSelected(g)} className="px-2 py-1 text-xs text-[#B8963E] hover:bg-[#B8963E]/10 rounded transition-colors">Ver</button>
                </div>
              )},
            ]}
            data={paginated}
          />

          <Pagination total={filtered.length} page={page} perPage={PER_PAGE} onChange={setPage} />
        </Card>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detalhes do hóspede" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#1B2B4B] text-white text-lg font-bold flex items-center justify-center" style={{ fontFamily: 'var(--font-display)' }}>
                {selected.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{selected.name}</h3>
                <p className="text-sm text-slate-500">{selected.email}</p>
                <Badge label={selected.status} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4">
              {[
                { label: 'CPF', value: selected.cpf },
                { label: 'Data de nasc.', value: formatDate(selected.birthDate) },
                { label: 'Sexo', value: selected.gender },
                { label: 'Celular', value: selected.mobile },
                { label: 'Telefone', value: selected.phone || '—' },
                { label: 'CEP', value: selected.zipCode },
                { label: 'Estado', value: selected.state },
                { label: 'Cidade', value: selected.city },
                { label: 'Bairro', value: selected.neighborhood },
                { label: 'Endereço', value: `${selected.street}, ${selected.addressNumber}` },
                { label: 'Total reservas', value: String(selected.totalReservations) },
                { label: 'Última hospedagem', value: selected.lastStay ? formatDate(selected.lastStay) : '—' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-2">Reservas deste hóspede</p>
              {reservations.filter(r => r.guestId === selected.id).map(res => (
                <div key={res.id} className="flex justify-between py-1.5 border-b border-slate-100 text-sm">
                  <span className="font-mono-data text-xs text-slate-500">{res.code}</span>
                  <span className="text-slate-600">{formatDate(res.checkIn)} → {formatDate(res.checkOut)}</span>
                  <Badge label={res.status} />
                  <span className="font-medium text-slate-800">{formatCurrency(res.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}



export default StaffGuestsPage;
