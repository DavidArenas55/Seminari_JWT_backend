import express from 'express';
import {
    saveMethodHandler,
    createSubjectHandler,
    getAllSubjectsHandler,
    getSubjectByIdHandler,
    updateSubjectHandler,
    deleteSubjectHandler,
    getUsersBySubjectHandler
} from '../subjects/subject_controller.js';
import { checkJwt } from '../../middleware/session.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Subject:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         teacher:
 *           type: string
 *         students:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 */

/**
 * @swagger
 * /api/main:
 *   get:
 *     summary: Página de bienvenida
 *     description: Retorna un mensaje de bienvenida.
 *     tags:
 *       - Main
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bienvenido a la API
 */
router.get('/main', saveMethodHandler);

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Crea una nueva asignatura
 *     description: Añade los detalles de una nueva asignatura.
 *     tags:
 *       - Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Asignatura creada exitosamente
 */
router.post('/subjects', createSubjectHandler);

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Obtiene todas las asignaturas
 *     description: Retorna una lista de todas las asignaturas.
 *     tags:
 *       - Subjects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 */
router.get('/subjects', checkJwt, getAllSubjectsHandler);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Obtiene una asignatura por ID
 *     description: Retorna los detalles de una asignatura específica.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignatura
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 */
router.get('/subjects/:id', getSubjectByIdHandler);

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     summary: Actualiza una asignatura por ID
 *     description: Actualiza los detalles de una asignatura específica.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       200:
 *         description: Asignatura actualizada exitosamente
 */
router.put('/subjects/:id', updateSubjectHandler);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Elimina una asignatura por ID
 *     description: Elimina una asignatura específica.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignatura
 *     responses:
 *       200:
 *         description: Asignatura eliminada exitosamente
 */
router.delete('/subjects/:id', deleteSubjectHandler);

/**
 * @swagger
 * /api/subjects/{id}/users:
 *   get:
 *     summary: Obtiene todos los usuarios en una asignatura
 *     description: Retorna una lista de todos los usuarios en una asignatura específica.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/subjects/:id/users', getUsersBySubjectHandler);

export default router;