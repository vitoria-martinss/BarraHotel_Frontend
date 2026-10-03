import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function ReportsPage() {
  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Relatórios</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { title: 'Reservas por período', desc: 'Relatório detalhado de reservas com filtros por data, status e categoria'},
            { title: 'Receita por período', desc: 'Análise financeira com totais por forma de pagamento e categoria de quarto'},
            { title: 'Ocupação dos quartos', desc: 'Taxa de ocupação por categoria, andar e período de tempo'},
            { title: 'Desempenho mensal', desc: 'Comparativo mês a mês de reservas, receita e ocupação'},
            { title: 'Hóspedes cadastrados', desc: 'Lista completa de hóspedes com dados de reserva e frequência'},
            { title: 'Cancelamentos', desc: 'Análise de cancelamentos com motivos e impacto financeiro'},
          ].map(r => (
            <Card key={r.title} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">{r.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
                  <Button variant="outline" size="sm" className="mt-3">Gerar relatório</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export default ReportsPage;
