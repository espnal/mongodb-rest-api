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
        year: {
          type: Integer
        },
        type: {
          type: String
        },
        colors: {
          type: [String]
        },
        price: {
            type: Integer
          }
      })
    );
    return Vehicles
}