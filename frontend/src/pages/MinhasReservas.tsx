import { useState } from 'react';
import { useApp } from '../store';
import { rooms, reservations, getReservationsByGuestId, getGuestById, getRoomById, formatCurrency, formatDate, type Room } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Breadcrumb, Input } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { GUEST_NAV } from '../config/navigation';

function MyReservationsPage() {
  const { currentUser } = useApp();
  const guest = currentUser?.data as any;
  const myReservations = reservations.filter(r => r.guestId === guest?.id);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRes, setSelectedRes] = useState<typeof reservations[0] | null>(null);

  const filtered = activeTab === 'all' ? myReservations
    : activeTab === 'active' ? myReservations.filter(r => ['Em hospedagem', 'Confirmada', 'Pendente'].includes(r.status))
    : activeTab === 'past' ? myReservations.filter(r => r.status === 'Finalizada')
    : myReservations.filter(r => r.status === 'Cancelada');

  return (
    <DashboardLayout title="Área do Hóspede" navItems={GUEST_NAV} area="guest">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Minhas Reservas</h1>
        </div>

        <Tabs
          tabs={[
            { id: 'all', label: 'Todas', count: myReservations.length },
            { id: 'active', label: 'Ativas', count: myReservations.filter(r => ['Em hospedagem', 'Confirmada', 'Pendente'].includes(r.status)).length },
            { id: 'past', label: 'Histórico', count: myReservations.filter(r => r.status === 'Finalizada').length },
            { id: 'cancelled', label: 'Canceladas', count: myReservations.filter(r => r.status === 'Cancelada').length },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {filtered.length === 0 ? (
          <Card className="p-8">
            <EmptyState title="Nenhuma reserva encontrada" description="Não há reservas nesta categoria" />
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map(res => {
              const room = getRoomById(res.roomId);
              return (
                <Card key={res.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      {room && <img src={room.photo} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-mono-data text-slate-400">{res.code}</p>
                          <h3 className="font-semibold text-slate-800">{room?.category} — Quarto {room?.number}</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatDate(res.checkIn)} → {formatDate(res.checkOut)} · {res.nights} noite{res.nights > 1 ? 's' : ''}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{res.guests} hóspede{res.guests > 1 ? 's' : ''} · {res.paymentMethod}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <Badge label={res.status} />
                          <p className="text-sm font-bold text-slate-800 mt-2">{formatCurrency(res.total)}</p>
                          <button
                            onClick={() => setSelectedRes(res)}
                            className="text-xs text-[#B8963E] hover:underline mt-1 block"
                          >
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Reservation detail modal */}
      <Modal open={!!selectedRes} onClose={() => setSelectedRes(null)} title="Detalhes da reserva" size="md">
        {selectedRes && (() => {
          const room = getRoomById(selectedRes.roomId);
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-mono-data text-sm text-slate-500">{selectedRes.code}</p>
                <Badge label={selectedRes.status} />
              </div>
              {room && (
                <div className="flex gap-3">
                  <img src={room.photo} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold">{room.category} — {room.subcategory}</p>
                    <p className="text-sm text-slate-400">Quarto {room.number} · {room.floor}º andar</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4">
                {[
                  { label: 'Check-in', value: formatDate(selectedRes.checkIn) },
                  { label: 'Check-out', value: formatDate(selectedRes.checkOut) },
                  { label: 'Noites', value: String(selectedRes.nights) },
                  { label: 'Hóspedes', value: String(selectedRes.guests) },
                  { label: 'Pagamento', value: selectedRes.paymentMethod },
                  { label: 'Total', value: formatCurrency(selectedRes.total) },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
              {selectedRes.notes && (
                <Alert type="info" message={selectedRes.notes} />
              )}
              {['Confirmada', 'Pendente'].includes(selectedRes.status) && (
                <Button variant="danger" size="sm" className="w-full">Cancelar reserva</Button>
              )}
            </div>
          );
        })()}
      </Modal>
    </DashboardLayout>
  );
}

// ─── Guest Profile ────────────────────────────────────────────────────────────

export default MyReservationsPage;
