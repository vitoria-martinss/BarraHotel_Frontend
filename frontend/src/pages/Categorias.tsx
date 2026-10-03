import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../store';
import { rooms, guests, reservations, employees, tasks, monthlyRevenue, occupancyData, weeklyCheckins, getGuestById, getRoomById, getEmployeeById, formatCurrency, formatDate, type RoomCategory } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Dropdown } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { ADMIN_NAV } from '../config/navigation';

function AdminCategoriesPage() {
  const categories: { cat: RoomCategory; color: string }[] = [
    { cat: 'Single', color: '#3B82F6' },
    { cat: 'Casal', color: '#10B981' },
    { cat: 'Triplo', color: '#F59E0B' },
    { cat: 'Quádruplo', color: '#8B5CF6' },
  ];

  const subcats = ['com ar-condicionado', 'com ventilador', 'com ar-condicionado + frigobar'] as const;

  return (
    <DashboardLayout title="Painel Administrativo" navItems={ADMIN_NAV} area="admin">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Categorias de Quartos</h1>

        <div className="space-y-6">
          {categories.map(({ cat, color }) => {
            const catRooms = rooms.filter(r => r.category === cat);
            return (
              <Card key={cat} className="p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                    <svg className="w-5 h-5" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>{cat}</h2>
                    <p className="text-sm text-slate-400">{catRooms.length} quartos no total</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subcats.map(sub => {
                    const subRooms = rooms.filter(r => r.category === cat && r.subcategory === sub);
                    const available = subRooms.filter(r => r.status === 'Disponível').length;
                    const occupied = subRooms.filter(r => r.status === 'Ocupado').length;
                    const avgRate = subRooms.length > 0 ? subRooms[0].dailyRate : 0;

                    return (
                      <div key={sub} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <h3 className="font-semibold text-slate-700 text-sm mb-3">
                          {cat} {sub}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Quartos</span>
                            <span className="font-medium">{subRooms.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Disponíveis</span>
                            <span className="font-medium text-emerald-600">{available}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Ocupados</span>
                            <span className="font-medium text-amber-600">{occupied}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Diária</span>
                            <span className="font-bold text-[#B8963E]">{formatCurrency(avgRate)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Capacidade</span>
                            <span className="font-medium">{subRooms[0]?.capacity ?? 0} pess.</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="flex flex-wrap gap-1">
                            {subRooms.map(r => (
                              <span key={r.id} className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'Disponível' ? 'bg-emerald-100 text-emerald-700' : r.status === 'Ocupado' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                                {r.number}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}


export default AdminCategoriesPage;
