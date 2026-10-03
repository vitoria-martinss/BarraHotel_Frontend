import { useState } from 'react';
import { useApp } from '../store';
import { rooms, reservations, getReservationsByGuestId, getGuestById, getRoomById, formatCurrency, formatDate, type Room } from '../data';
import { Button, Badge, Card, StatCard, Table, Pagination, SearchBar, Modal, Alert, Tabs, EmptyState, Breadcrumb, Input } from '../ui';
import DashboardLayout from '../layouts/DashboardLayout';
import { GUEST_NAV } from '../config/navigation';

function BookingPage({ initialRoomId }: { initialRoomId?: string }) {
  const { navigate, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [category, setCategory] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(initialRoomId ? rooms.find(r => r.id === initialRoomId) ?? null : null);
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'Cartão de crédito' | 'Cartão de débito' | 'Dinheiro'>('PIX');
  const [loading, setLoading] = useState(false);
  const [reservationCode] = useState(`BH-2025-${String(Math.floor(Math.random() * 900) + 100)}`);

  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 1;

  const availableRooms = rooms.filter(r => {
    if (r.status !== 'Disponível') return false;
    if (category && r.category !== category) return false;
    if (Number(guestsCount) > r.capacity) return false;
    return true;
  });

  async function handleConfirm() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep(5);
  }

  const STEPS = ['Pesquisa', 'Disponibilidade', 'Dados', 'Confirmação', 'Concluído'];

  return (
    <DashboardLayout title="Área do Hóspede" navItems={GUEST_NAV} area="guest">
      <div className="max-w-3xl mx-auto">
        {/* Step indicator */}
        {step < 5 && (
          <div className="flex items-center gap-0 mb-8">
            {STEPS.slice(0, 4).map((label, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i + 1 <= step ? 'bg-[#1B2B4B] text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <div className={`flex-1 h-0.5 ${i + 1 < step ? 'bg-[#1B2B4B]' : 'bg-slate-200'} ${i === 3 ? 'hidden' : ''}`} />
                <span className={`hidden sm:block text-xs ml-1 mr-4 ${i + 1 === step ? 'text-[#1B2B4B] font-semibold' : 'text-slate-400'}`}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Search */}
        {step === 1 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5" style={{ fontFamily: 'var(--font-display)' }}>
              Pesquisar disponibilidade
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Data de entrada *</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Data de saída *</label>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8963E]/40" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Quantidade de hóspedes</label>
                <select value={guestsCount} onChange={e => setGuestsCount(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none">
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} hóspede{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Categoria do quarto</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none">
                  <option value="">Qualquer categoria</option>
                  <option value="Single">Single</option>
                  <option value="Casal">Casal</option>
                  <option value="Triplo">Triplo</option>
                  <option value="Quádruplo">Quádruplo</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="primary" size="lg" onClick={() => setStep(2)} disabled={!checkIn || !checkOut}>
                Ver disponibilidade →
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Availability */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
                Quartos disponíveis
              </h2>
              <p className="text-sm text-slate-500">{availableRooms.length} resultado{availableRooms.length !== 1 ? 's' : ''}</p>
            </div>

            {availableRooms.length === 0 ? (
              <Card className="p-8">
                <EmptyState
                  title="Nenhum quarto disponível"
                  description="Tente alterar as datas ou categoria de quarto"
                  action={<Button variant="outline" onClick={() => setStep(1)}>← Alterar pesquisa</Button>}
                />
              </Card>
            ) : (
              availableRooms.map(room => (
                <Card key={room.id} className="p-5">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      <img src={room.photo} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
                            {room.category} — {room.subcategory}
                          </h3>
                          <p className="text-xs text-slate-400">Quarto {room.number} · {room.floor}º andar</p>
                          <div className="flex gap-3 text-xs text-slate-500 mt-1">
                            <span>👤 {room.capacity} pess.</span>
                            <span>🛏 {room.beds} cama{room.beds > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {room.amenities.slice(0, 3).map(a => (
                              <span key={a} className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{a}</span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-[#B8963E]">{formatCurrency(room.dailyRate)}</p>
                          <p className="text-xs text-slate-400">/noite</p>
                          <p className="text-sm font-semibold text-slate-700 mt-1">{formatCurrency(room.dailyRate * nights)}</p>
                          <p className="text-xs text-slate-400">{nights} noite{nights > 1 ? 's' : ''}</p>
                          <Button
                            variant="primary"
                            size="sm"
                            className="mt-2"
                            onClick={() => { setSelectedRoom(room); setStep(3); }}
                          >
                            Selecionar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}

            {availableRooms.length > 0 && (
              <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1">
                ← Alterar pesquisa
              </button>
            )}
          </div>
        )}

        {/* Step 3: Reservation data */}
        {step === 3 && selectedRoom && (
          <Card className="p-6 space-y-5">
            <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Dados da reserva</h2>

            {/* Guest info */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Hóspede</h3>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-semibold text-slate-800">{(currentUser?.data as any)?.name}</p>
                <p className="text-sm text-slate-500">{(currentUser?.data as any)?.email}</p>
                <p className="text-sm text-slate-500">{(currentUser?.data as any)?.mobile}</p>
              </div>
            </div>

            {/* Room */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Quarto selecionado</h3>
              <div className="flex gap-4 bg-slate-50 rounded-xl p-4">
                <img src={selectedRoom.photo} alt="" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-semibold text-slate-800">{selectedRoom.category} — {selectedRoom.subcategory}</p>
                  <p className="text-sm text-slate-500">Quarto {selectedRoom.number} · {selectedRoom.floor}º andar</p>
                </div>
              </div>
            </div>

            {/* Stay details */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Detalhes da estadia</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Check-in', value: checkIn ? formatDate(checkIn) : '-' },
                  { label: 'Check-out', value: checkOut ? formatDate(checkOut) : '-' },
                  { label: 'Hóspedes', value: `${guestsCount} pessoa${Number(guestsCount) > 1 ? 's' : ''}` },
                  { label: 'Diárias', value: `${nights} noite${nights > 1 ? 's' : ''}` },
                  { label: 'Valor/noite', value: formatCurrency(selectedRoom.dailyRate) },
                  { label: 'Total', value: formatCurrency(selectedRoom.dailyRate * nights) },
                ].map(item => (
                  <div key={item.label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Forma de pagamento</h3>
              <div className="grid grid-cols-2 gap-2">
                {(['PIX', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${paymentMethod === method ? 'border-[#B8963E] bg-[#B8963E]/10 text-[#B8963E]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                  >
                    {method === 'PIX' ? '🔑' : method === 'Cartão de crédito' ? '💳' : method === 'Cartão de débito' ? '💳' : '💵'} {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">← Voltar</Button>
              <Button variant="primary" onClick={() => setStep(4)} className="flex-1">Revisar reserva →</Button>
            </div>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && selectedRoom && (
          <Card className="p-6 space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-700 text-sm font-medium">⚠️ Revise os dados antes de confirmar</p>
            </div>

            <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Revisão da reserva</h2>

            <div className="space-y-3 bg-slate-50 rounded-xl p-4">
              {[
                { label: 'Hóspede', value: (currentUser?.data as any)?.name },
                { label: 'Quarto', value: `${selectedRoom.category} — Quarto ${selectedRoom.number}` },
                { label: 'Check-in', value: checkIn ? formatDate(checkIn) : '-' },
                { label: 'Check-out', value: checkOut ? formatDate(checkOut) : '-' },
                { label: 'Noites', value: String(nights) },
                { label: 'Hóspedes', value: `${guestsCount}` },
                { label: 'Pagamento', value: paymentMethod },
                { label: 'Total', value: formatCurrency(selectedRoom.dailyRate * nights) },
                { label: 'Status', value: 'Pendente de confirmação' },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1">← Voltar</Button>
              <Button variant="secondary" onClick={handleConfirm} loading={loading} className="flex-1">
                ✓ Confirmar reserva
              </Button>
            </div>
          </Card>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <Badge label="Confirmada" className="mb-3" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Reserva concluída!
            </h2>
            <p className="text-slate-500 mb-5">Sua reserva foi realizada com sucesso.</p>

            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-slate-400">NÚMERO DA RESERVA</p>
              <p className="text-xl font-bold font-mono-data text-[#1B2B4B] mt-1">{reservationCode}</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate({ id: 'my-reservations' })} className="flex-1">
                Ver minha reserva
              </Button>
              <Button variant="primary" onClick={() => navigate({ id: 'guest-dashboard' })} className="flex-1">
                Voltar ao início
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

// ─── My Reservations ──────────────────────────────────────────────────────────

export default BookingPage;
