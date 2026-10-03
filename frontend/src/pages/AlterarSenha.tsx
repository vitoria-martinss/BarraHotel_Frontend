import { useState } from 'react';
import { useApp } from '../store';
import { rooms, reservations, getReservationsByGuestId, getGuestById, getRoomById, formatCurrency, formatDate, type Room } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Breadcrumb, Input } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { GUEST_NAV } from '../config/navigation';

function GuestPasswordPage() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.next.length < 6) return setError('A nova senha deve ter pelo menos 6 caracteres.');
    if (form.next !== form.confirm) return setError('As senhas não coincidem.');
    setSaved(true);
    setForm({ current: '', next: '', confirm: '' });
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <DashboardLayout title="Área do Hóspede" navItems={GUEST_NAV} area="guest">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-display)' }}>Alterar Senha</h1>
        <Card className="p-6">
          {saved && <Alert type="success" message="Senha alterada com sucesso!" className="mb-4" />}
          {error && <Alert type="error" message={error} className="mb-4" />}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Senha atual" type="password" value={form.current} onChange={e => setForm(p => ({ ...p, current: e.target.value }))} required />
            <Input label="Nova senha" type="password" value={form.next} onChange={e => setForm(p => ({ ...p, next: e.target.value }))} required />
            <Input label="Confirmar nova senha" type="password" value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} required />
            <Button type="submit" variant="primary" className="w-full">Salvar nova senha</Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default GuestPasswordPage;
