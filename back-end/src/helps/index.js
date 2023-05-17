const fieldValidation = (body) => body.totalPrice && body.deliveryAddress && body.deliveryNumber;

module.exports = {
    fieldValidation,
};