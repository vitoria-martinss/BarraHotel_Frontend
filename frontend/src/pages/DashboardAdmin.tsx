import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function AdminDashboardPage() {
  const [period, setPeriod] = useState('30d');

  const totalRevenue = reservations.filter(r => ['Finalizada', 'Em hospedagem'].includes(r.status)).reduce((sum, r) => sum + r.total, 0);
  const totalReservations = reservations.length;
  const activeReservations = reservations.filter(r => r.status === 'Em hospedagem').length;
  const occupancyRate = Math.round((rooms.filter(r => r.status === 'Ocupado').length / rooms.length) * 100);
  const cancellations = reservations.filter(r => r.status === 'Cancelada').length;
  const newGuests = guests.filter(g => g.registeredAt >= '2025-08-01').length;

  const PIE_COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'];

  const paymentMethods = [
    { name: 'PIX', value: reservations.filter(r => r.paymentMethod === 'PIX').length },
    { name: 'Cartão de crédito', value: reservations.filter(r => r.paymentMethod === 'Cartão de crédito').length },
    { name: 'Cartão de débito', value: reservations.filter(r => r.paymentMethod === 'Cartão de débito').length },
    { name: 'Dinheiro', value: reservations.filter(r => r.paymentMethod === 'Dinheiro').length },
  ];

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-6">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Dashboard Administrativo</h1>
            <p className="text-sm text-slate-500">Visão geral do sistema — 20 de agosto de 2025</p>
          </div>
          {/* Period filter */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {[
              { label: 'Hoje', value: '1d' },
              { label: '7 dias', value: '7d' },
              { label: '30 dias', value: '30d' },
              { label: 'Este mês', value: 'month' },
              { label: 'Este ano', value: 'year' },
            ].map(p => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${period === p.value ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Receita total"
            value={formatCurrency(totalRevenue)}
            sub="Reservas finalizadas"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            color="#B8963E"
            trend={{ value: '+12% vs. mês anterior', up: true }}
          />
          <StatCard
            label="Total de reservas"
            value={totalReservations}
            sub={`${activeReservations} ativas agora`}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            color="#1B2B4B"
            trend={{ value: '+8 este mês', up: true }}
          />
          <StatCard
            label="Taxa de ocupação"
            value={`${occupancyRate}%`}
            sub={`${rooms.filter(r => r.status === 'Ocupado').length} de ${rooms.length} quartos`}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            color="#10B981"
          />
          <StatCard
            label="Cancelamentos"
            value={cancellations}
            sub={`${newGuests} novos hóspedes`}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            color="#EF4444"
            trend={{ value: '-2 vs. mês anterior', up: false }}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue + reservations bar */}
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Receita e Reservas por Mês</h3>
              <span className="text-xs text-slate-400">Mar–Ago 2025</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyRevenue} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value, name) => [name === 'receita' ? formatCurrency(value as number) : value, name === 'receita' ? 'Receita' : 'Reservas']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="receita" name="Receita" fill="#B8963E" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="reservas" name="Reservas" fill="#1B2B4B" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Occupancy pie */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Ocupação por Categoria</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={occupancyData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false} style={{ fontSize: 11 }}>
                  {occupancyData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: '12px', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {occupancyData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-xs text-slate-600">{d.name}: {d.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Check-in/out line + payment pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="p-5 lg:col-span-2">
            <h3 className="font-semibold text-slate-800 mb-4">Check-ins e Check-outs da Semana</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyCheckins}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="checkins" name="Check-ins" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="checkouts" name="Check-outs" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Formas de Pagamento</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={paymentMethods} cx="50%" cy="50%" innerRadius={40} outerRadius={68} dataKey="value">
                  {paymentMethods.map((_, i) => <Cell key={i} fill={['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'][i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {paymentMethods.map((m, i) => (
                <div key={m.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'][i] }} />
                    <span className="text-xs text-slate-600">{m.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{m.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent reservations */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Reservas recentes</h3>
            <Button variant="ghost" size="sm" className="text-[#B8963E]">Ver todas</Button>
          </div>
          <Table
            columns={[
              { key: 'code', header: 'Código', render: r => <span className="font-mono-data text-xs">{r.code}</span> },
              { key: 'guest', header: 'Hóspede', render: r => <span className="font-medium text-sm">{getGuestById(r.guestId)?.name?.split(' ').slice(0, 2).join(' ')}</span> },
              { key: 'room', header: 'Quarto', render: r => <span className="text-sm">Quarto {getRoomById(r.roomId)?.number}</span> },
              { key: 'checkin', header: 'Check-in', render: r => <span className="text-sm font-mono-data">{formatDate(r.checkIn)}</span> },
              { key: 'total', header: 'Valor', render: r => <span className="font-semibold text-[#B8963E] text-sm">{formatCurrency(r.total)}</span> },
              { key: 'payment', header: 'Pagamento', render: r => <span className="text-xs text-slate-500">{r.paymentMethod}</span> },
              { key: 'status', header: 'Status', render: r => <Badge label={r.status} /> },
            ]}
            data={reservations.slice(0, 7)}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}


export default AdminDashboardPage;
