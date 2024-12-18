/*
 * PERSONA
 * modelo base para inserção de novos 
 * lutadores no banco de dados.
 * ---------------------------------- +
 * Difere de User, que é o usuario do site.
 * 
 * ----------------------------------   +++
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Persona = sequelize.define('Persona', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING
    },
    periodo: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.TEXT
    },
    forca: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    inteligencia: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    destreza: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carisma: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    resistencia: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    habilidade_esp: {
        type: DataTypes.STRING
    },
    poder_total: {
        type: DataTypes.FLOAT
    }
});

module.exports = Persona;