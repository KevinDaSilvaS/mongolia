class OperationsBaseMongo {
    constructor(model) {
        this.model = model;
    }

    async insert(data) {
        try {
            const concrete = new this.model(data);
            return await concrete.save();
        } catch (error) {
            return error;
        }
    }

    async update(query, replace) {
        try {
            return await this.model.updateMany(query, replace);
        } catch (error) {
            return error;
        }
    }

    async get(query) {
        try {
            return await this.model.findOne(query);
        } catch (error) {
            return error;
        }
    }

    async getAll(query) {
        try {
            return await this.model.find(query);
        } catch (error) {
            return error;
        }
    }

    async delete(query) {
        try {
            return await this.model.deleteMany(query);
        } catch (error) {
            return error;
        }
    }

    async getPaginated(query, page=1, limit=10) {
        try {
            return await this.model.find(query).skip((page-1)*limit).limit(parseInt(limit));
        } catch (error) {
            return error;
        }
    }
}

module.exports = OperationsBaseMongo;