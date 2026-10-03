import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function SettingsPage() {
  const [saved, setSaved] = useState(false);
  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5 max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Configurações</h1>
        {saved && <Alert type="success" message="Configurações salvas com sucesso!" />}
        <Card className="p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Informações do hotel</h2>
          <div className="grid grid-cols-2 gap-4">
            {[['Nome do hotel', 'Barra Hotel'], ['Endereço', 'Av. Manoel Gomes Casaca, Nº 111 — Vila Santana'], ['Cidade', 'Vargem Grande do Sul'], ['Estado', 'São Paulo'], ['CEP', '13880-000'], ['Telefone', '(19) 98448-7235'], ['E-mail', 'reservasbarrahotel@gmail.com']].map(([l, v]) => (
              <div key={l} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">{l}</label>
                <input defaultValue={v} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/30" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Políticas</h2>
          <div className="space-y-4">
            {[['Horário check-in', '14:00'], ['Horário check-out', '12:00'], ['Antecedência para cancelamento', '48 horas'], ['Multa por cancelamento tardio', '50%']].map(([l, v]) => (
              <div key={l} className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{l}</label>
                <input defaultValue={v} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none w-40 text-right" />
              </div>
            ))}
          </div>
        </Card>
        <Button variant="primary" onClick={() => setSaved(true)}>Salvar configurações</Button>
      </div>
    </DashboardLayout>
  );
}


export default SettingsPage;
