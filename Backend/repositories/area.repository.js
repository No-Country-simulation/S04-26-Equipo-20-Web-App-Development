import { prisma } from '../config/db.js';

export class AreaRepository {

    async create(name) {
        return await prisma.area.create({ data: { name } });
    }

    async findAll() {
        return await prisma.area.findMany({ orderBy: { name: 'asc' } });
    }

    async findById(id) {
        return await prisma.area.findUnique({ where: { id } });
    }

    async findByName(name) {
        return await prisma.area.findUnique({ where: { name } });
    }
}
