/*
 *	ENDPOINTS - PERSONA
 *
 *	ends CRUD:
 		POST - createPersona
 		GET  - getPersonas
 		GET  - getPersonaById-->ID
 		PUT  - updatePersona-->ID
		DELETE - deletePersona-->ID

	logica personalizada:
		GET  - comparePersona-->ID
		GET  - winnablePersona(?)
		GET  - challengPersona(?)
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Persona:
 *       type: object
 *       required:
 *         - nome
 *         - forca
 *         - inteligencia
 *         - destreza
 *         - resistencia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da Persona
 *         nome:
 *           type: string
 *           description: Nome da Persona
 *         categoria:
 *           type: string
 *           description: Categoria ou classificação histórica
 *         periodo:
 *           type: string
 *           description: Período histórico ou era
 *         descricao:
 *           type: string
 *           description: Breve descrição sobre a Persona
 *         forca:
 *           type: integer
 *           description: Atributo força
 *         inteligencia:
 *           type: integer
 *           description: Atributo inteligência
 *         destreza:
 *           type: integer
 *           description: Atributo destreza
 *         carisma:
 *           type: integer
 *           description: Atributo carisma
 *         resistencia:
 *           type: integer
 *           description: Atributo resistência
 *         habilidade_esp:
 *           type: string
 *           description: Habilidade especial
 *         poder_total:
 *           type: number
 *           format: float
 *           description: Cálculo final do poder total da Persona
*/

const asyncHandler = require('../middleware/asyncHandler');
const Persona = require('../models/Persona');

// FUNCAO DE CALCULO DO PODER ----- +
function calculoPoderTotal(persona) {
	const atributos = ['forca', 'inteligencia', 'destreza', 'carisma', 'resistencia'];
	let soma = 0;
	let contagem = 0;

	atributos.forEach(attr => {
		if (persona[attr] !== null && persona[attr] !== undefined) {
			soma +=persona[attr];
			contagem++;
		}
	});
	// retorna a media OU valor-padrao: 50pts
	return contagem > 0 ? soma / contagem : 50;
}
// -------------------------------- +++

/**
 * paths:
  /personas:
    post:
      summary: Cria uma nova Persona
      description: Este endpoint permite criar uma nova Persona com atributos fornecidos no corpo da requisição.
      tags:
        - Personas
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                nome:
                  type: string
                  description: Nome da persona.
                  example: "Aragorn"
                categoria:
                  type: string
                  description: Categoria da persona, como 'Guerreiro', 'Mago', etc.
                  example: "Guerreiro"
                periodo:
                  type: string
                  description: Período histórico ou universo da persona.
                  example: "Idade Média"
                descricao:
                  type: string
                  description: Uma breve descrição da persona.
                  example: "Rei e líder do exército dos Homens."
                forca:
                  type: integer
                  description: Nível de força da persona (1-100).
                  example: 85
                inteligencia:
                  type: integer
                  description: Nível de inteligência da persona (1-100).
                  example: 90
                destreza:
                  type: integer
                  description: Nível de destreza da persona (1-100).
                  example: 75
                carisma:
                  type: integer
                  description: Nível de carisma da persona (1-100).
                  example: 95
                resistencia:
                  type: integer
                  description: Nível de resistência da persona (1-100).
                  example: 80
                habilidade_esp:
                  type: string
                  description: Uma habilidade especial da persona.
                  example: "Liderança Inspiradora"
              required:
                - nome
                - categoria
                - periodo
                - descricao
                - forca
                - inteligencia
                - destreza
                - carisma
                - resistencia
                - habilidade_esp
      responses:
        201:
          description: Persona criada com sucesso.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    description: ID único da persona.
                    example: 1
                  nome:
                    type: string
                    description: Nome da persona.
                    example: "Aragorn"
                  categoria:
                    type: string
                    description: Categoria da persona.
                    example: "Guerreiro"
                  periodo:
                    type: string
                    description: Período histórico ou universo da persona.
                    example: "Idade Média"
                  descricao:
                    type: string
                    description: Uma breve descrição da persona.
                    example: "Rei e líder do exército dos Homens."
                  forca:
                    type: integer
                    description: Nível de força da persona (1-100).
                    example: 85
                  inteligencia:
                    type: integer
                    description: Nível de inteligência da persona (1-100).
                    example: 90
                  destreza:
                    type: integer
                    description: Nível de destreza da persona (1-100).
                    example: 75
                  carisma:
                    type: integer
                    description: Nível de carisma da persona (1-100).
                    example: 95
                  resistencia:
                    type: integer
                    description: Nível de resistência da persona (1-100).
                    example: 80
                  habilidade_esp:
                    type: string
                    description: Habilidade especial da persona.
                    example: "Liderança Inspiradora"
                  poder_total:
                    type: integer
                    description: O poder total calculado da persona.
                    example: 505
        400:
          description: Erro de validação dos dados enviados.
        500:
          description: Erro interno do servidor.
*/
const createPersona = asyncHandler(async(req, res) => {
	
	const { nome, categoria, periodo, descricao, forca,
	inteligencia, destreza, carisma, resistencia, habilidade_esp} = req.body;

	const poder_total = calculoPoderTotal(req.body);

	const persona = await Persona.create({
		nome,
		categoria,
		periodo,
		descricao,
		forca,
		inteligencia,
		destreza,
		carisma,
		resistencia,
		habilidade_esp,
		poder_total
	});

	res.status(200).json(persona);
});

/**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: Retorna todas as Personas
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: Lista de Personas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Persona'
 */
const getPersonas = asyncHandler(async(req, res) => {

	const personas = await Persona.findAll();
	res.status(200).json(personas);
});

/**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: Retorna uma Persona específica pelo ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da Persona
 *     responses:
 *       200:
 *         description: Informações da Persona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       404:
 *         description: Persona não encontrada
*/
const getPersonaById = asyncHandler(async(req, res) => {

	const { id } = req.params;
	const persona = await Persona.findByPk(id);

	if (!persona)
		return res.status(404).json({ message: 'Persona não encontrada! '});
		
	res.status(200).json(persona);
});

// atualizando -> ID
const updatePersona = asyncHandler(async(req, res) => {

    const { id } = req.params;
    const updates = req.body;

    const persona = await Persona.findByPk(id);
    if (!persona)
        return res.status(404).json({ message: 'Personagem não encontrada' });

    await persona.update(updates);
    res.status(200).json(persona);
});

const deletePersona = asyncHandler(async(req, res) => {

	const { id } =  req.params;
	const persona = await Persona.findByPk(id);

	if (!persona)
		return res.status(404).json({message: 'Personagem não encontrado'});

	await persona.destroy();

	res.status(200).json({message: 'Personagem deletado com sucesso!'});
});

module.exports = {
    createPersona,
    getPersonas,
    getPersonaById,
    updatePersona,
    deletePersona
};