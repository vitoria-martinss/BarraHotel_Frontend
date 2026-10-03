const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        mensagem: "API do Hotel funcionando!"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.post("/hospedes", (req, res) => {

    const {
        nome,
        email,
        telefone,
        documento,
        data_nascimento
    } = req.body;

    const sql = `
        INSERT INTO hospedes
        (nome, email, telefone, documento, data_nascimento)
        VALUES (?, ?, ?, ?, ?)
    `;

    const valores = [
        nome,
        email,
        telefone,
        documento,
        data_nascimento
    ];

    db.query(sql, valores, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                erro: "Erro ao cadastrar hóspede"
            });
        }

        res.status(201).json({
            mensagem: "Hóspede cadastrado com sucesso!",
            id_hospede: result.insertId
        });
    });
});

app.get("/hospedes", (req, res) => {

    const sql = `
        SELECT
            id_hospede,
            nome,
            email,
            telefone,
            documento,
            data_nascimento,
            data_cadastro
        FROM hospedes
        ORDER BY nome;
    `;

    db.query(sql, (err, resultados) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                erro: "Erro ao buscar hóspedes"
            });
        }

        res.json(resultados);
    });
});
app.get("/reservas", (req, res) => {
    const sql = `
        SELECT
            r.id_reserva,
            r.data_reserva,
            r.check_in_previsto,
            r.check_out_previsto,
            r.check_in_real,
            r.check_out_real,
            r.status,
            h.nome AS hospede_responsavel
        FROM reservas r
        INNER JOIN hospedes h
            ON r.id_hospede_responsavel = h.id_hospede
        ORDER BY r.check_in_previsto;
    `;

    db.query(sql, (err, resultados) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                erro: "Erro ao buscar reservas"
            });
        }

        res.json(resultados);
    });
});

app.post("/reservas", (req, res) => {

    const {
        id_hospede_responsavel,
        check_in_previsto,
        check_out_previsto,
        quartos
    } = req.body;

    // 1. Verificar hóspede
    const sqlHospede = `
        SELECT id_hospede
        FROM hospedes
        WHERE id_hospede = ?
    `;

    db.query(
        sqlHospede,
        [id_hospede_responsavel],
        (err, resultadosHospede) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    erro: "Erro ao verificar hóspede"
                });
            }

            if (resultadosHospede.length === 0) {
                return res.status(404).json({
                    erro: "Hóspede responsável não encontrado"
                });
            }

            // 2. Verificar quartos
            const sqlQuartos = `
                SELECT id_quarto
                FROM quartos
                WHERE id_quarto IN (?)
            `;

            db.query(
                sqlQuartos,
                [quartos],
                (err, resultadosQuartos) => {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            erro: "Erro ao verificar quartos"
                        });
                    }

                    if (resultadosQuartos.length !== quartos.length) {
                        return res.status(404).json({
                            erro: "Um ou mais quartos não foram encontrados"
                        });
                    }
                    const sqlConflito = `
    SELECT rq.id_quarto
    FROM reserva_quarto rq
    INNER JOIN reservas r
        ON rq.id_reserva = r.id_reserva
    WHERE rq.id_quarto IN (?)
      AND r.status NOT IN ('cancelada', 'finalizada')
      AND ? < r.check_out_previsto
      AND ? > r.check_in_previsto
    LIMIT 1
`;

db.query(
    sqlConflito,
    [
        quartos,
        check_in_previsto,
        check_out_previsto
    ],
    (err, resultadosConflito) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                erro: "Erro ao verificar disponibilidade"
            });
        }

        if (resultadosConflito.length > 0) {
            return res.status(409).json({
                erro: "Um ou mais quartos não estão disponíveis nesse período"
            });
        }

        res.json({
            mensagem: "Reserva disponível para criação!",
            id_hospede_responsavel,
            check_in_previsto,
            check_out_previsto,
            quartos
        });
    }
);
                    

                    
                }
            );
        }
    );
});