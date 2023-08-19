const { Product } = require('../../database/config')
const { Op } = require('sequelize')

exports.filterDynamic = async (req, res) => {
  // Filtrar por categoría si se proporciona
  const filterCriterias = req.body
  let filteredProducts = await Product.findAll()
  console.log('0', filteredProducts.length)
  if (filterCriterias.categories && filterCriterias.categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filterCriterias.categories.includes(product.categoryId)
    )
  }

  // Filtrar por nombre si se proporciona
  if (filterCriterias.name) {
    console.log(filterCriterias.name)
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase() === filterCriterias.name.toLowerCase()
    )
  }
  // Filtar por rango de precio
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= 0 &&
        product.price <= parseFloat(filterCriterias.maxPrice)
  )
  console.log('3', filteredProducts.length)

  if (filterCriterias.sortBy) {
    if (filterCriterias.sortBy === 'priceLowToHigh') {
      // Filtrar por orden si se proporciona
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (filterCriterias.sortBy === 'priceHighToLow') {
      filteredProducts.sort((a, b) => b.price - a.price)
    }
  }
  res.json({
    filteredProducts
  })
}

exports.findByName = async (req, res) => {

  const { name } = req.body;
  const product = await Product.findOne({
    where: {
      name: {
        [Op.like]: `%${name}%`
      }
    }
  })
  
  if (product) {
    res.json({
      product,
      message: 'Product found'
    })
  } else {
    res.status(404).json({ error: 'Product not found' })
  }

}