import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function StaffDashboardPage() {
  const { navigate } = useApp();
  const available = rooms.filter(r => r.status === 'Disponível').length;
  const occupied = rooms.filter(r => r.status === 'Ocupado').length;
  const cleaning = rooms.filter(r => r.status === 'Limpeza').length;
  const maintenance = rooms.filter(r => r.status === 'Manutenção').length;
  const reserved = rooms.filter(r => r.status === 'Reservado').length;
  const todayCheckins = reservations.filter(r => r.checkIn === '2025-08-20' && ['Confirmada', 'Pendente'].includes(r.status)).length;
  const todayCheckouts = reservations.filter(r => r.checkOut === '2025-08-20' && r.status === 'Em hospedagem').length;
  const pendingReservations = reservations.filter(r => r.status === 'Pendente').length;
  const occupancyRate = Math.round((occupied / rooms.length) * 100);

  const recentActivity = [
    { type: 'success', text: 'Check-in realizado — Carlos Eduardo Martins (Quarto 201)', time: '10 min' },
    { type: 'info', text: 'Nova reserva BH-2025-030 — Gabriela Pinto Lemos', time: '25 min' },
    { type: 'warning', text: 'Quarto 108 em manutenção — ar-condicionado', time: '1h' },
    { type: 'success', text: 'Pagamento confirmado — Reserva BH-2025-007 (R$ 900,00)', time: '2h' },
    { type: 'info', text: 'Limpeza concluída — Quarto 104', time: '3h' },
  ];

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-6">
        {/* Date / alerts bar */}
        <div className="flex items-center justify-between bg-[#1B2B4B] text-white rounded-xl px-5 py-3">
          <div>
            <p className="text-white/60 text-xs">Hoje</p>
            <p className="font-semibold">Quarta-feira, 20 de agosto de 2025</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#D4AF6A]">{todayCheckins}</p>
              <p className="text-white/60 text-xs">Check-ins</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#D4AF6A]">{todayCheckouts}</p>
              <p className="text-white/60 text-xs">Check-outs</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#D4AF6A]">{pendingReservations}</p>
              <p className="text-white/60 text-xs">Pendentes</p>
            </div>
          </div>
        </div>

        {/* Room status grid */}
        <div>
          <h2 className="text-base font-semibold text-slate-700 mb-3">Status dos quartos</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { label: 'Disponíveis', value: available, color: '#10B981', bg: '#ECFDF5' },
              { label: 'Ocupados', value: occupied, color: '#F59E0B', bg: '#FFFBEB' },
              { label: 'Reservados', value: reserved, color: '#3B82F6', bg: '#EFF6FF' },
              { label: 'Em limpeza', value: cleaning, color: '#8B5CF6', bg: '#F5F3FF' },
              { label: 'Manutenção', value: maintenance, color: '#EF4444', bg: '#FEF2F2' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center border" style={{ background: s.bg, borderColor: `${s.color}20` }}>
                <p className="text-3xl font-bold" style={{ color: s.color, fontFamily: 'var(--font-display)' }}>{s.value}</p>
                <p className="text-xs font-medium mt-1" style={{ color: s.color }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Taxa de ocupação" value={`${occupancyRate}%`} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} color="#B8963E" />
          <StatCard label="Total de quartos" value={rooms.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} color="#1B2B4B" />
          <StatCard label="Reservas hoje" value={reservations.filter(r => r.createdAt === '2025-08-15').length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} color="#3B82F6" />
          <StatCard label="Tarefas pendentes" value={tasks.filter(t => t.status !== 'Concluído').length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7l2 2 4-4" /></svg>} color="#F59E0B" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's check-ins */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center justify-between">
              <span>Check-ins de hoje</span>
              <button onClick={() => navigate({ id: 'checkin' })} className="text-xs text-[#B8963E] hover:underline">Ver todos</button>
            </h3>
            <div className="space-y-2">
              {reservations.filter(r => ['Confirmada', 'Pendente'].includes(r.status)).slice(0, 4).map(res => {
                const guest = getGuestById(res.guestId);
                const room = getRoomById(res.roomId);
                return (
                  <div key={res.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1B2B4B] rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {guest?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 truncate max-w-32">{guest?.name?.split(' ').slice(0, 2).join(' ')}</p>
                        <p className="text-xs text-slate-400">Quarto {room?.number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge label={res.status} />
                      <p className="text-xs text-slate-400 mt-1">{formatDate(res.checkIn)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent activity */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Atividades recentes</h3>
            <div className="space-y-3">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${act.type === 'success' ? 'bg-emerald-400' : act.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{act.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{act.time} atrás</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tasks overview */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center justify-between">
            <span>Tarefas do dia</span>
            <button onClick={() => navigate({ id: 'housekeeping' })} className="text-xs text-[#B8963E] hover:underline">Ver todas</button>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Quarto</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Tipo</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Responsável</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Prioridade</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 5).map(task => {
                  const room = getRoomById(task.roomId);
                  const emp = getEmployeeById(task.employeeId);
                  const prioColors: Record<string, string> = { Alta: 'bg-red-100 text-red-700', Média: 'bg-amber-100 text-amber-700', Baixa: 'bg-slate-100 text-slate-600' };
                  return (
                    <tr key={task.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-medium text-slate-800">Quarto {room?.number}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${task.type === 'Limpeza' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                          {task.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{emp?.name?.split(' ').slice(0, 2).join(' ')}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${prioColors[task.priority]}`}>{task.priority}</span>
                      </td>
                      <td className="py-2.5 px-3"><Badge label={task.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}


export default StaffDashboardPage;
