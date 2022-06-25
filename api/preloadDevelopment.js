const { Product, Ingredient, Label } = require("./src/db");

const ingredients = [
  { name: "CBD", description: "Efecto antioxidante, el CBD es rico en vitamina E y acido fenólico, poderosos antioxidantes, se encarga de luchar contra los radicales libres, factores externos que intervienen en el envejecimiento de la piel. Es muy recomendable para cuidar pieles sensibles o irritadas." },
  { name: "LAVANDA", description: "Ingredientes anti-inflamatorios, ayudan a reducir cualquier irritación." },
  { name: "FILTRO SOLAR", description: "Ayuda a proteger la piel frente a la radiación solar y evita que los rayos UVA y UVB dañen la superficie cutánea, previniendo así el envejecimiento prematuro provocado por el sol." },
  { name: "ALOE VERA", description: "Anti-inflamatorio y regenerador de tejidos, Puede aplicarse en todo tipo de pieles. Permite tener un rostro más terso debido a su alto contenido de colágeno y la elastina ayuda a prevenir el envejecimiento." },
  { name: "GLICERINA", description: "Tiene función humectante. Combate la flacidez y atenúa los signos de expresión y arrugas." },
  { name: "AGUA DE ROSAS", description: "Se utiliza como loción tónica para pieles sensibles y desvitalizadas. Revitaliza pieles maduras." },
  { name: "ACEITE DE CALENDULA", description: null },
  { name: "MONOESTERATO DE GLICERILO", description: null },
  { name: "XANTANA", description: null },
  { name: "MENTA", description: "Ayuda a retener la humedad evitando el envejecimiento prematuro, actúa sobre el enrojecimiento cutáneo reduciendo la inflamación, potencia la acción refrescante en la piel." },
  { name: "ACIDO GLICÓLICO", description: "Mejora el proceso de renovación de la piel para conseguir un aspecto rejuvenecido, es el aliado perfecto para eliminar las manchas producidas por el sol, el envejecimiento y el acné. Aporta más hidratación, con lo que mejora la textura y luminosidad de la piel." },
  { name: "AGUA DESMINERALIZADA", description: null },
  { name: "LINAZA", description: "Por la cantidad de OMEGA3 que contiene presenta beneficios anti-inflamatorios y nutritivos para la piel. Combate el acné, minimiza manchas en la piel, favorece la regeneración de tejidos de la piel, devuelve la vitalidad a la piel." },
  { name: "COCOAMIDA PROPIL BETAINA", description: "Estimula la formación de colágeno, indispensable para una piel tersa, regenerador cutáneo, excelente para la hidratación profunda de la piel." },
  { name: "ACEITE DE CIPRÉS", description: "Tiene propiedades antisépticas, por lo que es perfecto para combatir el acné. Siendo astringente, permitirá cerrar los poros y a eliminar toxinas." },
  { name: "POLVO DE CASCARA DE NUEZ", description: "Elimina las células superficiales de la piel y eliminas asperezas." },
  { name: "UREA", description: null },
  { name: "ALGINATO DE SODIO", description: null }
];

const products = [
  {
    name: "Sun Day Cream - Crema de dia",
    price: 549,
    weight: "50gr",
    specs: [
      "Se utiliza como loción tónica para pieles sensibles y desvitalizadas. Revitaliza pieles maduras",
      "Elimina manchas en la piel",
      "Anti acné",
      "Promueve el rejuvenecimiento de la piel",
      "Protege la piel de la radiación solar",
      "Crema a base de agua (las cremas elaboradas a base de agua son ideales para pieles grasas, ya que limitan la aparición de brotes por acné, además de que la piel asimila una mejor hidratación, logrando un mejor aspecto, con menores efectos del foto envejecimiento)."
    ],
    images: [
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg"
    ], 
    stock: 15,
    ingredients: ["CBD", "LAVANDA", "FILTRO SOLAR", "ALOE VERA", "GLICERINA", "AGUA DE ROSAS", "ACEITE DE CALENDULA", "MONOESTERATO DE GLICERILO", "XANTANA"]
  },
  {
    name: "Night Wear Cream - Crema de Noche",
    price: 349,
    weight: "50gr",
    specs: [
      "Para piel normal y grasa",
      "Elimina manchas en la piel",
      "Anti acné",
      "Promueve el rejuvenecimiento de la piel",
      "Crema a base de agua"
    ],
    images: [
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg"
    ], 
    stock: 20,
    ingredients: ["CBD", "ALOE VERA", "GLICERINA", "AGUA DE ROSAS", "MENTA", "ACEITE DE CALENDULA", "MONOESTERATO DE GLICERILO", "XANTANA"]
  },
  {
    name: "Serum facial de noche - Acido glicolico",
    price: 449,
    weight: "30ml",
    specs: [
      "Aclara",
      "Revitaliza",
      "Reafirma la piel"
    ],
    images: [
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg"
    ], 
    stock: 20,
    ingredients: ["CBD", "ACIDO GLICÓLICO", "AGUA DESMINERALIZADA"]
  },
  {
    name: "Cleanser gel - Gel limpiador facial",
    price: 649,
    weight: "80gr",
    specs: [
      "Para piel normal y grasa",
      "Remueve el acné",
      "Limpia impurezas",
      "Hidrata la piel"
    ],
    images: [
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg"
    ], 
    stock: 20,
    ingredients: ["CBD", "LINAZA", "COCOAMIDA PROPIL BETAINA", "ACEITE DE CIPRÉS", "AGUA DESMINERALIZADA", "XANTANA"]
  },
  {
    name: "Nut Facial Scrub - Exfoliante facial de nuez",
    price: 499,
    weight: "50gr",
    specs: [
      "Para todo tipo de piel",
      "Elimina células muertas",
      "Anti acné",
      "Mejora el aspecto de la piel",
      "Mejora la circulación a nivel cutáneo"
    ],
    images: [
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg",
        "https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg"
    ], 
    stock: 20,
    ingredients: ["CBD", "POLVO DE CASCARA DE NUEZ", "GLICERINA", "ALOE VERA", "MENTA", "UREA", "XANTANA", "ALGINATO DE SODIO"]
  },
];

async function preloadProducts() {
  await Promise.all(ingredients.map(async (ingredient) => {
    await Ingredient.findOrCreate({
      where: { name: ingredient.name },
      defaults: ingredient
    });
  }));
  await Promise.all(products.map(async (product) => {
    const [newProduct, created] = await Product.findOrCreate({
      where: { name: product.name },
      defaults: {
        name: product.name,
        weight: product.weight,
        price: product.price,
        images: product.images,
        specs: product.specs,
        stock: product.stock
      }
    });
    await newProduct.setIngredients(product.ingredients)
  }));
}

module.exports = {
  preloadProducts
};