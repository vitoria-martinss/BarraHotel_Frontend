import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function PermissionsPage() {
  const roles = ['Administrador', 'Gerente', 'Recepcionista', 'Funcionário'];
  const perms = [
    'Ver dashboard', 'Gerenciar reservas', 'Check-in/Check-out', 'Ver hóspedes', 'Editar hóspedes',
    'Gerenciar quartos', 'Ver financeiro', 'Gerar relatórios', 'Gerenciar funcionários', 'Configurações do sistema',
  ];
  const defaults: Record<string, Record<string, boolean>> = {
    Administrador: Object.fromEntries(perms.map(p => [p, true])),
    Gerente: Object.fromEntries(perms.map(p => [p, !['Configurações do sistema'].includes(p)])),
    Recepcionista: Object.fromEntries(perms.map(p => [p, ['Ver dashboard', 'Gerenciar reservas', 'Check-in/Check-out', 'Ver hóspedes'].includes(p)])),
    Funcionário: Object.fromEntries(perms.map(p => [p, ['Check-in/Check-out'].includes(p)])),
  };
  const [permissions, setPermissions] = useState(defaults);

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Controle de Permissões</h1>
        <Card className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wide w-48">Permissão</th>
                {roles.map(role => (
                  <th key={role} className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perms.map(perm => (
                <tr key={perm} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-2.5 px-4 text-slate-700 font-medium text-sm">{perm}</td>
                  {roles.map(role => (
                    <td key={role} className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => setPermissions(prev => ({
                          ...prev,
                          [role]: { ...prev[role], [perm]: !prev[role][perm] }
                        }))}
                        className={`w-5 h-5 rounded flex items-center justify-center mx-auto transition-colors ${permissions[role]?.[perm] ? 'bg-[#1B2B4B] text-white' : 'bg-slate-100 text-slate-300'}`}
                      >
                        {permissions[role]?.[perm] && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Button variant="primary">Salvar permissões</Button>
      </div>
    </DashboardLayout>
  );
}

export default PermissionsPage;
