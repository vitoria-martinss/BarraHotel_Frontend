import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function MaintenancePage() {
  const maintenanceTasks = tasks.filter(t => t.type === 'Manutenção');
  const prioColors: Record<string, string> = { Alta: 'bg-red-100 text-red-700', Média: 'bg-amber-100 text-amber-700', Baixa: 'bg-slate-100 text-slate-600' };

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Controle de Manutenção</h1>
          <Button variant="primary" size="sm">+ Nova ordem</Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-2">
          {[
            { label: 'Pendentes', value: maintenanceTasks.filter(t => t.status === 'Pendente').length, color: '#F59E0B' },
            { label: 'Em andamento', value: maintenanceTasks.filter(t => t.status === 'Em andamento').length, color: '#3B82F6' },
            { label: 'Concluídas', value: maintenanceTasks.filter(t => t.status === 'Concluído').length, color: '#10B981' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <Card className="p-5">
          <Table
            columns={[
              { key: 'room', header: 'Quarto', render: t => <span className="font-medium">Quarto {getRoomById(t.roomId)?.number}</span> },
              { key: 'notes', header: 'Descrição', render: t => <span className="text-sm text-slate-600">{t.notes || '—'}</span> },
              { key: 'emp', header: 'Responsável', render: t => <span className="text-sm">{getEmployeeById(t.employeeId)?.name?.split(' ').slice(0, 2).join(' ')}</span> },
              { key: 'date', header: 'Data', render: t => <span className="text-sm font-mono-data">{formatDate(t.date)} {t.time}</span> },
              { key: 'priority', header: 'Prioridade', render: t => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prioColors[t.priority]}`}>{t.priority}</span> },
              { key: 'status', header: 'Status', render: t => <Badge label={t.status} /> },
              { key: 'actions', header: '', render: t => (
                <div className="flex gap-1">
                  {t.status !== 'Concluído' && <Button variant="primary" size="sm">Concluir</Button>}
                </div>
              )},
            ]}
            data={maintenanceTasks}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default MaintenancePage;
