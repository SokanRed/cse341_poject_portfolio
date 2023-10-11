module.exports = (mongoose) => {
    const Vehicles = mongoose.model(
        'vehicles',
        mongoose.Schema({
            brand: {
                type: String
            },
            model: {
                type: String
            },
            horsePower: {
                type: Number
            },
            fuelType: {
                type: String
            },
            color: {
                type: String
            },
            category: {
                type: String
            },
            transmisson: {
                type: String
            },
            numberPassenger: {
                type: Number
            }
        })
    );

    return Vehicles;
}