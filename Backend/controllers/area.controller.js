import { AreaService } from '../services/area.service.js';

const areaService = new AreaService();

/**
 * Crea una nueva área de trabajo.
 * Solo ADMIN.
 */
export const createArea = async (req, res) => {
    try {
        const area = await areaService.createArea(req.body.name);
        res.status(201).json({ ok: true, message: 'Área creada con éxito', data: area });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Lista todas las áreas registradas.
 */
export const listAreas = async (req, res) => {
    try {
        const areas = await areaService.listAreas();
        res.status(200).json({ ok: true, data: areas });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

