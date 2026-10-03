import { useState } from 'react';
import { useApp } from '../store';
import { rooms, reservations, getReservationsByGuestId, getGuestById, getRoomById, formatCurrency, formatDate, type Room } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Breadcrumb, Input } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { GUEST_NAV } from '../config/navigation';

function GuestProfilePage() {
  const { currentUser } = useApp();
  const guest = currentUser?.data as any;
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const fields = [
    { label: 'Nome completo', value: guest?.name ?? '', col: 2 },
    { label: 'CPF', value: guest?.cpf ?? '' },
    { label: 'Data de nascimento', value: guest?.birthDate ? formatDate(guest.birthDate) : '' },
    { label: 'Sexo', value: guest?.gender ?? '' },
    { label: 'E-mail', value: guest?.email ?? '' },
    { label: 'Telefone', value: guest?.phone ?? '' },
    { label: 'Celular', value: guest?.mobile ?? '' },
    { label: 'CEP', value: guest?.zipCode ?? '' },
    { label: 'Estado', value: guest?.state ?? '' },
    { label: 'Cidade', value: guest?.city ?? '' },
    { label: 'Bairro', value: guest?.neighborhood ?? '' },
    { label: 'Rua', value: guest?.street ?? '' },
    { label: 'Número', value: guest?.addressNumber ?? '' },
    { label: 'Complemento', value: guest?.complement ?? '' },
  ];

  return (
    <DashboardLayout title="Área do Hóspede" navItems={GUEST_NAV} area="guest">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Meu Perfil</h1>
          <Button variant={editing ? 'outline' : 'primary'} onClick={() => setEditing(!editing)}>
            {editing ? 'Cancelar' : '✏️ Editar perfil'}
          </Button>
        </div>

        {saved && <Alert type="success" message="Perfil atualizado com sucesso!" className="mb-4" />}

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-[#1B2B4B] rounded-2xl flex items-center justify-center text-white text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {guest?.name?.charAt(0) ?? 'H'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{guest?.name}</h2>
              <p className="text-sm text-slate-500">{guest?.email}</p>
              <Badge label={guest?.status ?? 'Ativo'} className="mt-1" />
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <Input label="Nome completo" defaultValue={guest?.name} className="col-span-2" />
              <Input label="CPF" defaultValue={guest?.cpf} />
              <Input label="Data de nascimento" type="date" defaultValue={guest?.birthDate} />
              <Input label="E-mail" type="email" defaultValue={guest?.email} />
              <Input label="Celular" defaultValue={guest?.mobile} />
              <Input label="Telefone" defaultValue={guest?.phone} />
              <Input label="CEP" defaultValue={guest?.zipCode} />
              <Input label="Estado" defaultValue={guest?.state} />
              <Input label="Cidade" defaultValue={guest?.city} />
              <Input label="Bairro" defaultValue={guest?.neighborhood} />
              <Input label="Rua" defaultValue={guest?.street} className="col-span-2" />
              <Input label="Número" defaultValue={guest?.addressNumber} />
              <Input label="Complemento" defaultValue={guest?.complement} />
              <div className="col-span-2 flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
                <Button type="submit" variant="primary">Salvar alterações</Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.label} className={f.col === 2 ? 'col-span-2' : ''}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{f.label}</p>
                  <p className="text-sm text-slate-800 mt-0.5">{f.value || '—'}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}

// ─── Change Password ──────────────────────────────────────────────────────────

export default GuestProfilePage;
