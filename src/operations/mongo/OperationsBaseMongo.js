class OperationsBaseMongo {
    constructor(model) {
        this.model = model;
    }

    async insert(data) {
        try {
            const concrete = new this.model(data);
            return await concrete.save();
        } catch (error) {
            throw error;
        }
    }

    async update(query, replace) {
        try {
            return await this.model.updateMany(query, replace);
        } catch (error) {
            throw error;
        }
    }

    async get(query) {
        try {
            return await this.model.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    async getAll(query) {
        try {
            return await this.model.find(query);
        } catch (error) {
            throw error;
        }
    }

    async delete(query) {
        try {
            return await this.model.deleteMany(query);
        } catch (error) {
            throw error;
        }
    }

    async getPaginated(query, page=1, limit=10) {
        try {
            return await this.model.find(query).skip((page-1)*limit).limit(parseInt(limit));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OperationsBaseMongo;