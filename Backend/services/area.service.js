import { AreaRepository } from '../repositories/area.repository.js';

const areaRepository = new AreaRepository();

export class AreaService {

    async createArea(name) {
        if (!name || name.trim().length === 0) {
            throw new Error('El nombre del área es obligatorio');
        }
        const existing = await areaRepository.findByName(name.trim());
        if (existing) {
            throw new Error('Ya existe un área con ese nombre');
        }
        return await areaRepository.create(name.trim());
    }

    async listAreas() {
        return await areaRepository.findAll();
    }
}
