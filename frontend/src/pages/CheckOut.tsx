import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function CheckOutPage() {
  const [done, setDone] = useState<string[]>([]);
  const active = reservations.filter(r => r.status === 'Em hospedagem');

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Check-out</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {active.map(res => {
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
                    <p className="text-sm text-slate-500">Quarto {room?.number} · {room?.category}</p>
                  </div>
                  <Badge label={isDone ? 'Finalizada' : 'Em hospedagem'} />
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-3 mb-4">
                  <div>
                    <p className="text-xs text-slate-400">CHECK-IN</p>
                    <p className="font-semibold text-slate-800">{formatDate(res.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">CHECK-OUT</p>
                    <p className="font-semibold text-slate-800">{formatDate(res.checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">DIÁRIAS</p>
                    <p className="font-semibold text-slate-800">{res.nights} noite{res.nights > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">PAGAMENTO</p>
                    <p className="font-semibold text-slate-800">{res.paymentMethod}</p>
                  </div>
                </div>

                <div className="bg-[#B8963E]/10 border border-[#B8963E]/30 rounded-xl p-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#9A7A2E]">Valor total</span>
                    <span className="text-xl font-bold text-[#B8963E]">{formatCurrency(res.total)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Consumo extra</Button>
                  <Button
                    variant={isDone ? 'ghost' : 'secondary'}
                    size="sm"
                    className="flex-1"
                    disabled={isDone}
                    onClick={() => setDone(prev => [...prev, res.id])}
                  >
                    {isDone ? '✓ Concluído' : 'Realizar Check-out'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {active.length === 0 && (
          <Card className="p-8">
            <EmptyState title="Nenhum check-out pendente" description="Não há hospedagens ativas no momento" />
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}


export default CheckOutPage;
