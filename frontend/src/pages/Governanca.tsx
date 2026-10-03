import { useState } from 'react';
import { useApp } from '../store';
import { rooms, guests, reservations, tasks, employees, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, STATUS_COLORS, type Reservation } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { STAFF_NAV } from '../config/navigation';

function HousekeepingPage() {
  const [activeTab, setActiveTab] = useState('limpeza');

  const limpeza = tasks.filter(t => t.type === 'Limpeza');
  const manutencao = tasks.filter(t => t.type === 'Manutenção');
  const current = activeTab === 'limpeza' ? limpeza : manutencao;

  const prioColors: Record<string, string> = { Alta: 'bg-red-100 text-red-700', Média: 'bg-amber-100 text-amber-700', Baixa: 'bg-slate-100 text-slate-600' };

  return (
    <DashboardLayout title="Área de Funcionários" navItems={STAFF_NAV} area="staff">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
            {activeTab === 'limpeza' ? 'Controle de Limpeza' : 'Controle de Manutenção'}
          </h1>
          <Button variant="primary" size="sm">+ Nova tarefa</Button>
        </div>

        <Tabs
          tabs={[
            { id: 'limpeza', label: 'Limpeza', count: limpeza.filter(t => t.status !== 'Concluído').length },
            { id: 'manutencao', label: 'Manutenção', count: manutencao.filter(t => t.status !== 'Concluído').length },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {current.map(task => {
            const room = getRoomById(task.roomId);
            const emp = getEmployeeById(task.employeeId);
            return (
              <Card key={task.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-800">Quarto {room?.number}</p>
                    <p className="text-xs text-slate-400">{room?.category} · {room?.floor}º andar</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge label={task.status} />
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prioColors[task.priority]}`}>{task.priority}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm text-slate-600 mb-3">
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-20 text-xs">Responsável</span>
                    <span className="text-xs font-medium">{emp?.name?.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-20 text-xs">Data/Hora</span>
                    <span className="text-xs">{formatDate(task.date)} às {task.time}</span>
                  </div>
                  {task.notes && (
                    <div className="flex gap-2">
                      <span className="text-slate-400 w-20 text-xs">Obs.</span>
                      <span className="text-xs text-slate-500">{task.notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {task.status === 'Pendente' && (
                    <Button variant="outline" size="sm" className="flex-1 text-xs">Iniciar</Button>
                  )}
                  {task.status === 'Em andamento' && (
                    <Button variant="primary" size="sm" className="flex-1 text-xs">Concluir</Button>
                  )}
                  {task.status === 'Concluído' && (
                    <div className="flex-1 text-center text-xs text-emerald-600 font-medium py-1">✓ Concluído</div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}



export default HousekeepingPage;
