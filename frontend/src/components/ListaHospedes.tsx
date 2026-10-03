interface Hospede {
  id_hospede: number;
  nome: string;
  email: string;
  telefone?: string;
  documento: string;
}

interface ListaHospedesProps {
  hospedes: Hospede[];
}

export default function ListaHospedes({ hospedes }: ListaHospedesProps) {
  return (
    <section>
      <h2>Hóspedes cadastrados</h2>

      {hospedes.map((hospede) => (
        <div key={hospede.id_hospede}>
          <h3>{hospede.nome}</h3>
          <p>E-mail: {hospede.email}</p>
          <p>Telefone: {hospede.telefone || "Não informado"}</p>
          <p>Documento: {hospede.documento}</p>
          <hr />
        </div>
      ))}
    </section>
  );
}
