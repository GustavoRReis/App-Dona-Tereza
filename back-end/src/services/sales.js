const { SaleProduct, users, sales } = require('../database/models');
const { fieldValidation } = require('../helps/index');

const popularSellsProducts = async (productss, dataValues) => {
  const saleOrder = productss.map((sale) => {
    const obj = {
      saleId: dataValues.id,
      productId: sale.id,
      quantity: sale.quantidade,
    };
    return obj;
  });

  await Promise.all(
    saleOrder.map((product) => SaleProduct.create(product)),
  );
};

const newSale = async (body, id) => {
  const { totalPrice, deliveryAddress, deliveryNumber, sellerId, dataProducts } = body;
 
if (!fieldValidation(body)) {
  return { status: 400, message: 'fill in all fields' };
}

const { dataValues } = await sales.create({ 
    totalPrice, 
    deliveryAddress, 
    deliveryNumber, 
    sellerId, 
    userId: id, 
    status: 'Pendente',
  });

  popularSellsProducts(dataProducts, dataValues);

  return { status: 201, message: dataValues };
};

const sellers = async () => {
  const user = await users.findAll({ where: { role: 'seller' } });
  return user;
};

const getAll = async () => {
  const result = await sales.findAll();
  return result;
};

const mudaStatus = async (idStatus, novoStatus) => {
  const result = await sales.update({ 
    status: novoStatus,
  },
  { where: { id: idStatus } });
  return result;
};

module.exports = {
  newSale,
  sellers,
  getAll,
  mudaStatus,
};
