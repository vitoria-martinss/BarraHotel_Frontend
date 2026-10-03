import { useEffect, useState } from "react";
import FormularioHospede from "../components/FormularioHospedes";
import ListaHospedes from "../components/ListaHospedes";
import { buscarHospedes, cadastrarHospede } from "../services/api";

interface Hospede {
  id_hospede: number;
  nome: string;
  email: string;
  telefone?: string;
  documento: string;
}

export default function Hospedes() {
  const [hospedes, setHospedes] = useState<Hospede[]>([]);

  async function carregarHospedes() {
    try {
      const dados = await buscarHospedes();
      setHospedes(dados);
    } catch (erro) {
      console.error("Erro ao carregar hóspedes:", erro);
    }
  }

  useEffect(() => {
    void carregarHospedes();
  }, []);

  async function adicionarHospede(novoHospede: {
    nome: string;
    email: string;
    telefone: string;
    documento: string;
    data_nascimento: string;
  }) {
    await cadastrarHospede(novoHospede);
    await carregarHospedes();
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Hóspedes</h1>
      <FormularioHospede aoCadastrar={adicionarHospede} />
      <ListaHospedes hospedes={hospedes} />
    </div>
  );
}
