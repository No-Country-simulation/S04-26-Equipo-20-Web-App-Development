import { prisma } from '../config/db.js';

export class RootCauseRepository {

    async create(data) {
        return await prisma.rootCause.create({ data });
    }

    async findAll() {
        return await prisma.rootCause.findMany({ orderBy: { name: 'asc' } });
    }

    async findById(id) {
        return await prisma.rootCause.findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma.rootCause.update({ where: { id }, data });
    }

    async delete(id) {
        return await prisma.rootCause.delete({ where: { id } });
    }
}
