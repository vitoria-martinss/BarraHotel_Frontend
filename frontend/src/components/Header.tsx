import { useApp } from '../store';

export default function Header() {
  const { navigate } = useApp();
  return (
    <header className="bg-[#0E1825] text-white p-4">
      <button onClick={() => navigate({ id: 'home' })} className="font-semibold">Barra Hotel</button>
    </header>
  );
}
