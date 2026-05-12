import { RootCauseRepository } from '../repositories/rootCause.repository.js';
import { AppError } from '../errors/AppError.js';

const rootCauseRepository = new RootCauseRepository();

export class RootCauseService {

    async createRootCause({ name, category }) {
        return await rootCauseRepository.create({
            name: name.trim(),
            category: category.trim(),
        });
    }

    async listRootCauses() {
        return await rootCauseRepository.findAll();
    }

    async getRootCause(id) {
        const rootCause = await rootCauseRepository.findById(id);
        if (!rootCause) {
            throw new AppError('Causa raíz no encontrada', 404);
        }
        return rootCause;
    }

    async updateRootCause(id, { name, category }) {
        await this.getRootCause(id);

        const data = {};
        if (name !== undefined) data.name = name.trim();
        if (category !== undefined) data.category = category.trim();

        if (Object.keys(data).length === 0) {
            throw new AppError('No se proporcionaron campos para actualizar', 400);
        }

        return await rootCauseRepository.update(id, data);
    }

    async deleteRootCause(id) {
        await this.getRootCause(id);
        return await rootCauseRepository.delete(id);
    }
}
