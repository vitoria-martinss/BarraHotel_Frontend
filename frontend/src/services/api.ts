const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function tratarResposta<T>(resposta: Response): Promise<T> {
  if (!resposta.ok) {
    throw new Error(`Erro na API: ${resposta.status}`);
  }

  return resposta.json() as Promise<T>;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const resposta = await fetch(`${API_URL}${endpoint}`);
  return tratarResposta<T>(resposta);
}

export async function buscarHospedes() {
  return apiGet<Array<{
    id_hospede: number;
    nome: string;
    email: string;
    telefone?: string;
    documento: string;
    data_nascimento?: string;
    data_cadastro?: string;
  }>>("/hospedes");
}

export async function cadastrarHospede(hospede: {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  data_nascimento: string;
}) {
  const resposta = await fetch(`${API_URL}/hospedes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hospede),
  });

  return tratarResposta<{ mensagem: string; id_hospede: number }>(resposta);
}

export async function buscarReservas() {
  return apiGet<Array<{
    id_reserva: number;
    data_reserva?: string;
    check_in_previsto: string;
    check_out_previsto: string;
    check_in_real?: string;
    check_out_real?: string;
    status: string;
    hospede_responsavel: string;
  }>>("/reservas");
}
