module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 1,
          name: "Budweiser 330ml",
          price: 3.49,
          url_image: "http://localhost:3001/images/bud.png",
        },
        {
          id: 2,
          name: "Heineken 600ml",
          price: 7.5,
          url_image: "http://localhost:3001/images/heineken600.png",
        },
        {
          id: 3,
          name: "Antarctica Pilsen 300ml",
          price: 2.49,
          url_image: "http://localhost:3001/images/antartica.png",
        },
        {
          id: 4,
          name: "Brahma 600ml",
          price: 7.5,
          url_image: "http://localhost:3001/images/brahma600.png",
        },
        {
          id: 5,
          name: "Skol 269ml",
          price: 2.19,
          url_image: "http://localhost:3001/images/skol200.png",
        },
        {
          id: 6,
          name: "Skol Beats Senses 313ml",
          price: 4.49,
          url_image: "http://localhost:3001/images/beats300.png",
        },
        {
          id: 7,
          name: "Becks 330ml",
          price: 4.99,
          url_image: "http://localhost:3001/images/becks300.png",
        },
        {
          id: 8,
          name: "Brahma Duplo Malte 350ml",
          price: 2.79,
          url_image: "http://localhost:3001/images/duplomalte.png",
        },
        {
          id: 9,
          name: "Becks 600ml",
          price: 8.89,
          url_image: "http://localhost:3001/images/becks600.png",
        },
        {
          id: 10,
          name: "Skol Beats Senses 269ml",
          price: 3.57,
          url_image: "http://localhost:3001/images/beatslata.png",
        },
        {
          id: 11,
          name: "Stella Artois 275ml",
          price: 3.49,
          url_image: "http://localhost:3001/images/stela275.png",
        },
        {
          id: 12,
          name: "Polar 473ml",
          price: 3.19,
          url_image: "http://localhost:3001/images/polar.png",
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
