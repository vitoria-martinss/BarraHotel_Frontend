import { useState } from 'react';
import { useApp } from '../store';
import { rooms, reservations, getReservationsByGuestId, getGuestById, getRoomById, formatCurrency, formatDate, type Room } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Breadcrumb, Input } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { GUEST_NAV } from '../config/navigation';

function GuestDashboardPage() {
  const { currentUser, navigate } = useApp();
  const guest = currentUser?.data as typeof import('../data').guests[0];
  const myReservations = reservations.filter(r => r.guestId === guest?.id);

  const upcoming = myReservations.filter(r => ['Confirmada', 'Pendente'].includes(r.status));
  const active = myReservations.filter(r => r.status === 'Em hospedagem');
  const past = myReservations.filter(r => r.status === 'Finalizada');
  const cancelled = myReservations.filter(r => r.status === 'Cancelada');

  const nextReservation = active[0] ?? upcoming[0];

  return (
    <DashboardLayout title="Área do Hóspede" navItems={GUEST_NAV} area="guest">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-[#1B2B4B] to-[#2D4270] rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Bem-vindo de volta,</p>
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                {guest?.name?.split(' ').slice(0, 2).join(' ') ?? 'Hóspede'}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                {myReservations.length} reserva{myReservations.length !== 1 ? 's' : ''} no total
              </p>
            </div>
            <Button variant="secondary" onClick={() => navigate({ id: 'booking' })}>
              + Nova reserva
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Em hospedagem" value={active.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} color="#10B981" />
          <StatCard label="Confirmadas" value={upcoming.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="#3B82F6" />
          <StatCard label="Finalizadas" value={past.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>} color="#6B7280" />
          <StatCard label="Canceladas" value={cancelled.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="#EF4444" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Next reservation */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#B8963E] rounded-full" />
              {active.length > 0 ? 'Hospedagem atual' : 'Próxima reserva'}
            </h3>
            {nextReservation ? (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-mono-data font-medium text-slate-500">{nextReservation.code}</p>
                    <p className="font-bold text-slate-800 mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {getRoomById(nextReservation.roomId)?.category} — Quarto {getRoomById(nextReservation.roomId)?.number}
                    </p>
                  </div>
                  <Badge label={nextReservation.status} />
                </div>
                <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-xl p-4">
                  <div>
                    <p className="text-xs text-slate-400">CHECK-IN</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{formatDate(nextReservation.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">CHECK-OUT</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{formatDate(nextReservation.checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">TOTAL</p>
                    <p className="text-sm font-semibold text-[#B8963E] mt-0.5">{formatCurrency(nextReservation.total)}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => navigate({ id: 'my-reservations' })}>
                  Ver reserva
                </Button>
              </div>
            ) : (
              <EmptyState
                title="Nenhuma reserva ativa"
                description="Faça uma reserva para sua próxima viagem"
                action={<Button variant="primary" size="sm" onClick={() => navigate({ id: 'booking' })}>Fazer reserva</Button>}
              />
            )}
          </Card>

          {/* Recent reservations */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-300 rounded-full" />
              Reservas recentes
            </h3>
            {myReservations.length === 0 ? (
              <EmptyState title="Sem reservas" description="Você ainda não fez nenhuma reserva" />
            ) : (
              <div className="space-y-2">
                {myReservations.slice(0, 4).map(res => (
                  <div key={res.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{res.code}</p>
                      <p className="text-xs text-slate-400">Quarto {getRoomById(res.roomId)?.number} · {formatDate(res.checkIn)}</p>
                    </div>
                    <div className="text-right">
                      <Badge label={res.status} />
                      <p className="text-xs text-slate-500 mt-1">{formatCurrency(res.total)}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-1 text-[#B8963E]" onClick={() => navigate({ id: 'my-reservations' })}>
                  Ver todas →
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}


export default GuestDashboardPage;
