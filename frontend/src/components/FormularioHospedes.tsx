import { useState, type FormEvent } from "react";

interface NovoHospede {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  data_nascimento: string;
}

interface FormularioHospedeProps {
  aoCadastrar: (hospede: NovoHospede) => Promise<void>;
}

export default function FormularioHospede({ aoCadastrar }: FormularioHospedeProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [documento, setDocumento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const novoHospede: NovoHospede = {
      nome,
      email,
      telefone,
      documento,
      data_nascimento: dataNascimento,
    };

    try {
      await aoCadastrar(novoHospede);

      setNome("");
      setEmail("");
      setTelefone("");
      setDocumento("");
      setDataNascimento("");

      alert("Hóspede cadastrado com sucesso!");
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível cadastrar o hóspede.");
    }
  }

  return (
    <section>
      <h2>Cadastrar hóspede</h2>

      <form onSubmit={enviarFormulario}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(evento) => setNome(evento.target.value)} required />
        </div>

        <div>
          <label>E-mail:</label>
          <input type="email" value={email} onChange={(evento) => setEmail(evento.target.value)} required />
        </div>

        <div>
          <label>Telefone:</label>
          <input type="text" value={telefone} onChange={(evento) => setTelefone(evento.target.value)} />
        </div>

        <div>
          <label>Documento:</label>
          <input type="text" value={documento} onChange={(evento) => setDocumento(evento.target.value)} required />
        </div>

        <div>
          <label>Data de nascimento:</label>
          <input type="date" value={dataNascimento} onChange={(evento) => setDataNascimento(evento.target.value)} />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
}
