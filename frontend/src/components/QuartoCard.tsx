import { Badge, Button } from '../ui';
import { formatCurrency, type Room } from '../data';

export function QuartoCard({ room, onDetail }: { room: Room; onDetail: () => void }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={""}
          alt={`Quarto ${room.number}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge label={room.status} />
        </div>
        <div className="absolute top-3 right-3 bg-[#1B2B4B]/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg font-medium">
          Quarto {room.number}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
              {room.category} — {room.subcategory}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{room.floor}º andar</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-[#B8963E]">{formatCurrency(room.dailyRate)}</p>
            <p className="text-xs text-slate-400">/diária</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span>👤 {room.capacity} pessoa{room.capacity > 1 ? 's' : ''}</span>
          <span>🛏 {room.beds} cama{room.beds > 1 ? 's' : ''}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {room.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{a}</span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">+{room.amenities.length - 3}</span>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={onDetail}>
          Ver detalhes
        </Button>
      </div>
    </div>
  );
}

