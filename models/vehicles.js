module.exports = (mongoose) => {
    const Vehicles = mongoose.model(
      'themes',
      mongoose.Schema({
        brand: {
          type: String
        },
        model: {
          type: String
        },
        year: {
          type: Number
        },
        type: {
          type: String
        },
        colors: {
          type: [String]
        },
        price: {
            type: Number
          }
      })
    );
}