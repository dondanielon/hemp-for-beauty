const { Product, Ingredient, User } = require("./src/db");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { SALT_ROUNDS, CRYPT_KEY, ADMIN_ROLE } = process.env;

const ingredients = [
  { name: "CBD", description: "Efecto antioxidante, el CBD es rico en vitamina E y acido fenólico, poderosos antioxidantes, se encarga de luchar contra los radicales libres, factores externos que intervienen en el envejecimiento de la piel. Es muy recomendable para cuidar pieles sensibles o irritadas." },
  { name: "Lavanda", description: "Ingredientes anti-inflamatorios, ayudan a reducir cualquier irritación." },
  { name: "Filtro solar", description: "Ayuda a proteger la piel frente a la radiación solar y evita que los rayos UVA y UVB dañen la superficie cutánea, previniendo así el envejecimiento prematuro provocado por el sol." },
  { name: "Aloe vera", description: "Anti-inflamatorio y regenerador de tejidos, Puede aplicarse en todo tipo de pieles. Permite tener un rostro más terso debido a su alto contenido de colágeno y la elastina ayuda a prevenir el envejecimiento." },
  { name: "Glicerina", description: "Tiene función humectante. Combate la flacidez y atenúa los signos de expresión y arrugas." },
  { name: "Agua de rosas", description: "Se utiliza como loción tónica para pieles sensibles y desvitalizadas. Revitaliza pieles maduras." },
  { name: "Aceite de calendula", description: null },
  { name: "Monoesterato de glicerilo", description: null },
  { name: "Xantana", description: null },
  { name: "Menta", description: "Ayuda a retener la humedad evitando el envejecimiento prematuro, actúa sobre el enrojecimiento cutáneo reduciendo la inflamación, potencia la acción refrescante en la piel." },
  { name: "Acido glicolico", description: "Mejora el proceso de renovación de la piel para conseguir un aspecto rejuvenecido, es el aliado perfecto para eliminar las manchas producidas por el sol, el envejecimiento y el acné. Aporta más hidratación, con lo que mejora la textura y luminosidad de la piel." },
  { name: "Agua desmineralizada", description: null },
  { name: "Linaza", description: "Por la cantidad de OMEGA3 que contiene presenta beneficios anti-inflamatorios y nutritivos para la piel. Combate el acné, minimiza manchas en la piel, favorece la regeneración de tejidos de la piel, devuelve la vitalidad a la piel." },
  { name: "Cocoamida propil betaina", description: "Estimula la formación de colágeno, indispensable para una piel tersa, regenerador cutáneo, excelente para la hidratación profunda de la piel." },
  { name: "Aceite de cipres", description: "Tiene propiedades antisépticas, por lo que es perfecto para combatir el acné. Siendo astringente, permitirá cerrar los poros y a eliminar toxinas." },
  { name: "Polvo de cascara de nuez", description: "Elimina las células superficiales de la piel y eliminas asperezas." },
  { name: "Urea", description: null },
  { name: "Alginato de sodio", description: null }
];

const products = [
  {
    name: "Sun Day Cream - Crema de dia",
    price: 549,
    weight: "40gr",
    specs: [
      "Se utiliza como loción tónica para pieles sensibles y desvitalizadas. Revitaliza pieles maduras",
      "Elimina manchas en la piel",
      "Anti acné",
      "Promueve el rejuvenecimiento de la piel",
      "Protege la piel de la radiación solar",
      "Crema a base de agua (las cremas elaboradas a base de agua son ideales para pieles grasas, ya que limitan la aparición de brotes por acné, además de que la piel asimila una mejor hidratación, logrando un mejor aspecto, con menores efectos del foto envejecimiento)."
    ],
    image: "https://i.ibb.co/gd75pJZ/sun-day-cream.png", 
    stock: 15,
    ingredients: ["CBD", "Lavanda", "Filtro solar", "Aloe vera", "Glicerina", "Agua de rosas", "Aceite de calendula", "Monoesterato de glicerilo", "Xantana"]
  },
  {
    name: "Night Wear Cream - Crema de Noche",
    price: 349,
    weight: "40gr",
    specs: [
      "Para piel normal y grasa",
      "Elimina manchas en la piel",
      "Anti acné",
      "Promueve el rejuvenecimiento de la piel",
      "Crema a base de agua"
    ],
    image: "https://i.ibb.co/k2z8Cnr/night-wear-cream.png", 
    stock: 20,
    ingredients: ["CBD", "Aloe vera", "Glicerina", "Agua de rosas", "Menta", "Aceite de calendula", "Monoesterato de glicerilo", "Xantana"]
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
    image: "https://i.ibb.co/HGwPspX/facial-serum.png", 
    stock: 23,
    ingredients: ["CBD", "Acido glicolico", "Agua desmineralizada"]
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
    image: "https://i.ibb.co/r0rcf53/cleanser-gel.png", 
    stock: 11,
    ingredients: ["CBD", "Linaza", "Cocoamida propil betaina", "Aceite de cipres", "Agua desmineralizada", "Xantana"]
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
    image: "https://i.ibb.co/2tbF5pM/nut-facial.png", 
    stock: 18,
    ingredients: ["CBD", "Polvo de cascara de nuez", "Glicerina", "Aloe vera", "Menta", "Urea", "Xantana", "Alginato de sodio"]
  },
];


const admin = {
  email: "admin@admin.hemp",
  password: "1234",
  firstName: "Admin",
  lastName: "A1",
  phone: "0000000000",
  role: ADMIN_ROLE
};

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
        image: product.image,
        specs: product.specs,
        stock: product.stock
      }
    });
    await newProduct.setIngredients(product.ingredients)
  }));
  const hash = await bcrypt.hash(`${admin.password}${CRYPT_KEY}`, parseInt(SALT_ROUNDS));
  await User.create({
    email: admin.email.toLocaleLowerCase(),
    password: hash,
    firstName: admin.firstName,
    lastName: admin.lastName,
    phone: admin.phone,
    role: admin.role
  });
}

module.exports = {
  preloadProducts
};