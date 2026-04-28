export function baseCrud(Model) {
    return {

        save(data) {
            const doc = new Model(data);
            return doc.save();
        },

        find() {
            return Model.find();
        },

        findById(id) {
            return Model.findById(id);
        },

        findByIdAndUpdate(id, dados) {
            return Model.findByIdAndUpdate(id, dados, {
                // new: true, deprecated
                returnDocument: true,
                runValidators: true
            });
            },

        findByIdAndDelete(id) {
            return Model.findByIdAndDelete(id);
        }

    };
}