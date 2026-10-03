import { useEffect, useState } from "react";
import ListaReservas from "../components/ListaReservas";
import { buscarReservas } from "../services/api";

interface Reserva {
  id_reserva: number;
  hospede_responsavel: string;
  check_in_previsto: string;
  check_out_previsto: string;
  status: string;
}

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    async function carregarReservas() {
      try {
        const dados = await buscarReservas();
        setReservas(dados);
      } catch (erro) {
        console.error("Erro ao carregar reservas:", erro);
      }
    }

    void carregarReservas();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Reservas</h1>
      <ListaReservas reservas={reservas} />
    </div>
  );
}
