import { AppProvider, useApp } from './store';
import Home from './pages/Home';
import Quartos from './pages/Quartos';
import QuartoDetalhes from './pages/QuartoDetalhes';
import Servicos from './pages/Servicos';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import EsqueciSenha from './pages/EsqueciSenha';
import DashboardHospede from './pages/DashboardHospede';
import NovaReserva from './pages/NovaReserva';
import MinhasReservas from './pages/MinhasReservas';
import PerfilHospede from './pages/PerfilHospede';
import AlterarSenha from './pages/AlterarSenha';
import DashboardRecepcao from './pages/DashboardRecepcao';
import ReservasRecepcao from './pages/ReservasRecepcao';
import HospedesRecepcao from './pages/HospedesRecepcao';
import CheckIn from './pages/CheckIn';
import CheckOut from './pages/CheckOut';
import QuartosRecepcao from './pages/QuartosRecepcao';
import Governanca from './pages/Governanca';
import Manutencao from './pages/Manutencao';
import DashboardAdmin from './pages/DashboardAdmin';
import QuartosAdmin from './pages/QuartosAdmin';
import Categorias from './pages/Categorias';
import HospedesAdmin from './pages/HospedesAdmin';
import ReservasAdmin from './pages/ReservasAdmin';
import Funcionarios from './pages/Funcionarios';
import Financeiro from './pages/Financeiro';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import Permissoes from './pages/Permissoes';

function Router() {
  const { page } = useApp();

  switch (page.id) {
    case 'home': return <Home />;
    case 'rooms': return <Quartos />;
    case 'room-detail': return <QuartoDetalhes roomId={page.roomId} />;
    case 'services': return <Servicos />;
    case 'about': return <Sobre />;
    case 'contact': return <Contato />;
    case 'login': return <Login />;
    case 'register': return <Cadastro />;
    case 'forgot-password': return <EsqueciSenha />;
    case 'guest-dashboard': return <DashboardHospede />;
    case 'booking': return <NovaReserva initialRoomId={page.roomId} />;
    case 'my-reservations': return <MinhasReservas />;
    case 'guest-profile': return <PerfilHospede />;
    case 'guest-password': return <AlterarSenha />;
    case 'staff-dashboard': return <DashboardRecepcao />;
    case 'staff-reservations': return <ReservasRecepcao />;
    case 'staff-guests': return <HospedesRecepcao />;
    case 'checkin': return <CheckIn />;
    case 'checkout': return <CheckOut />;
    case 'staff-rooms': return <QuartosRecepcao />;
    case 'housekeeping': return <Governanca />;
    case 'maintenance': return <Manutencao />;
    case 'admin-dashboard': return <DashboardAdmin />;
    case 'admin-rooms': return <QuartosAdmin />;
    case 'admin-categories': return <Categorias />;
    case 'admin-guests': return <HospedesAdmin />;
    case 'admin-reservations': return <ReservasAdmin />;
    case 'employees': return <Funcionarios />;
    case 'financial': return <Financeiro />;
    case 'reports': return <Relatorios />;
    case 'settings': return <Configuracoes />;
    case 'permissions': return <Permissoes />;
    default: return <Home />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
