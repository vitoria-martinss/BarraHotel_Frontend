import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function CheckInPage() {
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const incoming = reservations.filter(r => ['Confirmada', 'Pendente'].includes(r.status));

  async function handleCheckin(res: Reservation) {
    await new Promise(r => setTimeout(r, 600));
    setDone(prev => [...prev, res.id]);
    setSelected(null);
  }

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Check-in</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {incoming.map(res => {
            const guest = getGuestById(res.guestId);
            const room = getRoomById(res.roomId);
            const isDone = done.includes(res.id);
            return (
              <Card key={res.id} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-mono-data text-xs text-slate-400">{res.code}</p>
                    <h3 className="font-bold text-slate-800 text-lg mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                      {guest?.name?.split(' ').slice(0, 2).join(' ')}
                    </h3>
                    <p className="text-sm text-slate-500">{guest?.cpf} · {guest?.mobile}</p>
                  </div>
                  <Badge label={isDone ? 'Concluído' : res.status} />
                </div>

                <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-xl p-3 mb-4">
                  <div>
                    <p className="text-xs text-slate-400">QUARTO</p>
                    <p className="font-semibold text-slate-800">{room?.number}</p>
                    <p className="text-xs text-slate-500">{room?.floor}º andar</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">CHECK-IN</p>
                    <p className="font-semibold text-slate-800">{formatDate(res.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">CHECK-OUT</p>
                    <p className="font-semibold text-slate-800">{formatDate(res.checkOut)}</p>
                  </div>
                </div>

                <div className="flex gap-2 text-sm text-slate-500 mb-4">
                  <span>{res.guests} hósp.</span>
                  <span>·</span>
                  <span>{res.nights} noites</span>
                  <span>·</span>
                  <span>{res.paymentMethod}</span>
                </div>

                <Button
                  variant={isDone ? 'ghost' : 'primary'}
                  className="w-full"
                  disabled={isDone}
                  onClick={() => handleCheckin(res)}
                >
                  {isDone ? '✓ Check-in realizado' : 'Realizar Check-in'}
                </Button>
              </Card>
            );
          })}
        </div>

        {incoming.length === 0 && (
          <Card className="p-8">
            <EmptyState title="Nenhum check-in pendente" description="Não há reservas para check-in no momento" />
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

// ─── Check-out ────────────────────────────────────────────────────────────────

export default CheckInPage;
