import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function StaffReservationsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ res: Reservation; action: string } | null>(null);
  const PER_PAGE = 10;

  const filtered = reservations.filter(r => {
    const guest = getGuestById(r.guestId);
    const room = getRoomById(r.roomId);
    const text = `${r.code} ${guest?.name} ${room?.number}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Gestão de Reservas</h1>
        </div>

        {/* Summary badges */}
        <div className="flex gap-3 flex-wrap">
          {['Pendente', 'Confirmada', 'Em hospedagem', 'Finalizada', 'Cancelada'].map(status => {
            const count = reservations.filter(r => r.status === status).length;
            return (
              <button
                key={status}
                onClick={() => { setStatusFilter(statusFilter === status ? '' : status); setPage(1); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all ${statusFilter === status ? 'border-[#1B2B4B] bg-[#1B2B4B] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                <span>{count}</span>
                <span>{status}</span>
              </button>
            );
          })}
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-5">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Buscar por código, hóspede, quarto..." className="flex-1 max-w-sm" />
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
            >
              <option value="">Todos os status</option>
              <option value="Pendente">Pendente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Em hospedagem">Em hospedagem</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <Table
            columns={[
              { key: 'code', header: 'Código', render: r => <span className="font-mono-data text-xs text-slate-600">{r.code}</span> },
              { key: 'guest', header: 'Hóspede', render: r => <span className="font-medium text-slate-800 text-sm">{getGuestById(r.guestId)?.name?.split(' ').slice(0, 2).join(' ')}</span> },
              { key: 'room', header: 'Quarto', render: r => <span className="text-sm">Quarto {getRoomById(r.roomId)?.number}</span> },
              { key: 'category', header: 'Categoria', render: r => <span className="text-sm text-slate-500">{getRoomById(r.roomId)?.category}</span> },
              { key: 'checkin', header: 'Check-in', render: r => <span className="text-sm font-mono-data">{formatDate(r.checkIn)}</span> },
              { key: 'checkout', header: 'Check-out', render: r => <span className="text-sm font-mono-data">{formatDate(r.checkOut)}</span> },
              { key: 'guests', header: 'Hósp.', render: r => <span className="text-sm">{r.guests}</span> },
              { key: 'total', header: 'Valor', render: r => <span className="text-sm font-semibold text-[#B8963E]">{formatCurrency(r.total)}</span> },
              { key: 'payment', header: 'Pagamento', render: r => <span className="text-xs text-slate-500">{r.paymentMethod}</span> },
              { key: 'status', header: 'Status', render: r => <Badge label={r.status} /> },
              {
                key: 'actions', header: 'Ações', render: r => (
                  <Dropdown
                    trigger={
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 5a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2z" />
                        </svg>
                      </button>
                    }
                    items={[
                      { label: 'Visualizar', icon: '👁', onClick: () => setSelected(r) },
                      ...(r.status === 'Pendente' ? [{ label: 'Confirmar', icon: '✓', onClick: () => setConfirmModal({ res: r, action: 'confirmar' }) }] : []),
                      ...(r.status === 'Confirmada' ? [{ label: 'Check-in', icon: '→', onClick: () => setConfirmModal({ res: r, action: 'checkin' }) }] : []),
                      ...(['Pendente', 'Confirmada'].includes(r.status) ? [{ label: 'Cancelar', icon: '✕', danger: true, onClick: () => setConfirmModal({ res: r, action: 'cancelar' }) }] : []),
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

      {/* View modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detalhes da reserva" size="lg">
        {selected && (() => {
          const guest = getGuestById(selected.guestId);
          const room = getRoomById(selected.roomId);
          return (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="font-mono-data text-sm text-slate-600">{selected.code}</span>
                <Badge label={selected.status} />
              </div>
              {[
                { label: 'Hóspede', value: guest?.name },
                { label: 'E-mail', value: guest?.email },
                { label: 'CPF', value: guest?.cpf },
                { label: 'Quarto', value: `${room?.number} — ${room?.category}` },
                { label: 'Check-in', value: formatDate(selected.checkIn) },
                { label: 'Check-out', value: formatDate(selected.checkOut) },
                { label: 'Hóspedes', value: String(selected.guests) },
                { label: 'Noites', value: String(selected.nights) },
                { label: 'Valor/diária', value: formatCurrency(selected.dailyRate) },
                { label: 'Total', value: formatCurrency(selected.total) },
                { label: 'Pagamento', value: selected.paymentMethod },
                { label: 'Criada em', value: formatDate(selected.createdAt) },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">{item.value ?? '—'}</p>
                </div>
              ))}
            </div>
          );
        })()}
      </Modal>

      {/* Action confirm modal */}
      <Modal open={!!confirmModal} onClose={() => setConfirmModal(null)} title="Confirmar ação" size="sm">
        {confirmModal && (
          <div className="space-y-4">
            <p className="text-slate-600">
              Deseja <strong>{confirmModal.action}</strong> a reserva <strong className="font-mono-data">{confirmModal.res.code}</strong>?
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setConfirmModal(null)} className="flex-1">Cancelar</Button>
              <Button variant={confirmModal.action === 'cancelar' ? 'danger' : 'primary'} onClick={() => setConfirmModal(null)} className="flex-1">
                Confirmar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

// ─── Staff Guests ─────────────────────────────────────────────────────────────

export default StaffReservationsPage;
