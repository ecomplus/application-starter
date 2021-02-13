exports.post = ({ appSdk }, req, res) => {
  /**
   * Requests coming from the modules receive a hydrated body with two objects, `params` and application`.
   * In `application` is a copy of your application installed by the merchant, including the properties` data` and `hidden_data`.
   * JSON Schema of the list_payments module
   * `params`: https://apx-mods.e-com.plus/api/v1/list_payments/schema.json?store_id=100
   * `response`: https://apx-mods.e-com.plus/api/v1/list_payments/response_schema.json?store_id=100
   */
  const { params, application } = req.body
  const { storeId } = req

  // merge all app options configured by merchant
  const appData = Object.assign({}, application.data, application.hidden_data)

  // setup basic required response object
  // Must follow schema: https://apx-mods.e-com.plus/api/v1/list_payments/response_schema.json?store_id=100
  const response = {
    payment_gateways: []
  }

  /* DO THE STUFF HERE TO FILL RESPONSE OBJECT WITH PAYMENT GATEWAYS */
  /* 
    // eg;
    response.payment_gateways.push({
      intermediator: {
        code: 'paupay',
        link: 'https://www.paupay.com.br',
        name: 'paupay'
      },
      payment_url: 'https://www.paupay.com.br/',
      type: 'payment',
      payment_method: {
        code: 'banking_billet',
        name: 'Boleto Bancário'
      },
      label: 'Boleto Bancário',
      expiration_date: appData.banking_billet.expiration_date || 14
    })
  */

  res.send(response)
}
