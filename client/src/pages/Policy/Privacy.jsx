import React from 'react'

function Privacy() {
  return (
    <div className="policy-container">
      <label className="policy-title"> POLITICAS DE PRIVACIDAD</label>
      <div className="policy-section">
        <label className="policy-section-title">¿Qué hacemos con tu información?</label>
        <label className="policy-section-content">Cuando compras algún producto de nuestra tienda, como parte del proceso de compra, recolectamos información personal como tu nombre, dirección y correo electrónico.</label>
      </div>
      <div className="policy-section">
        <label className="policy-section-title">¿Cómo obtenemos tu consentimiento?</label>
        <label className="policy-section-content">Cuando nos proporcionas tu información personal para completar una transacción, verificar tu tarjeta de crédito, validar una dirección de envío, eso implica aceptar que nosotros usemos esa información para un solo objetivo.</label>
      </div>
    </div>
  )
}

export default Privacy