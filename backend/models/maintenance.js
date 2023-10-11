module.exports = (mongoose) => {
    const Maintenance = mongoose.model(
        'maintenance',
        mongoose.Schema({
            vehicle_ID: {
                type: Number
            },
            date: {
                type: Date
            },
            mileage: {
                type: Number
            },
            lubrification: {
                type: Boolean
            },
            brakes: {
                type: Boolean
            },
            mirrors: {
                type: Boolean
            },
            tires: {
                type: Boolean
            },
            suspensionSystem: {
                type: Boolean
            },
        })
    );

    return Maintenance;
}