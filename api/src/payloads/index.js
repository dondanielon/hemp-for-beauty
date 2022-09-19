function getRequestRatePayload(data) {
  const payload = {
    origin: {
      name: "Empresa",
      company: "hemp for beauty",
      email: "",
      street: "",
      number: "",
      district: "",
      city: "Zapopan",
      state: "JA",
      category: 1,
      country: "MX",
      postalCode: "44230",
      reference: "",
    },
    destination: {
      name: "",
      company: "",
      email: "",
      phone: "",
      street: "",
      number: "",
      district: "",
      city: data.destination.city,
      state: data.destination.stateCode,
      category: 1,
      country: "MX",
      postalCode: data.destination.postalCode,
      reference: "",
    },
    packages: [
      {
        content: "beauty products",
        amount: 1,
        type: "box",
        dimensions: {
          length: 20,
          width: 20,
          height: 20,
        },
        weight: 1,
        insurance: 0,
        declaredValue: 0,
        weightUnit: "KG",
        lengthUnit: "CM",
      },
    ],
    shipment: {
      carrier: "paquetexpress", // AQUI VA EL CARRIER QUE EL CLIENTE ELIJA
      service: "ground", //VER CON CLIENTE QUE SERVICIO QUIERE IMPLEMENTAR
      type: 1,
    },
    settings: {
      currency: "MXN",
    },
  };

  return payload;
}

module.exports = {
  getRequestRatePayload,
};
