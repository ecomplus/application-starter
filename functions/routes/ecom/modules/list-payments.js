exports.post = ({ appSdk }, req, res) => {
  /**
   * Requests coming from Modules API have two object properties on body: `params` and `application`.
   * `application` is a copy of your app installed by the merchant,
   * including the properties `data` and `hidden_data` with admin settings configured values.
   * JSON Schema reference for the List Payments module objects:
   * `params`: https://apx-mods.e-com.plus/api/v1/list_payments/schema.json?store_id=100
   * `response`: https://apx-mods.e-com.plus/api/v1/list_payments/response_schema.json?store_id=100
   *
   * Examples in published apps:
   * https://github.com/ecomplus/app-pagarme/blob/master/functions/routes/ecom/modules/list-payments.js
   * https://github.com/ecomplus/app-custom-payment/blob/master/functions/routes/ecom/modules/list-payments.js
   */

  const { params, application } = req.body
  const { storeId } = req
  // setup basic required response object
  const response = {
    payment_gateways: []
  }
  // merge all app options configured by merchant
  const appData = Object.assign({}, application.data, application.hidden_data)

  /* DO THE STUFF HERE TO FILL RESPONSE OBJECT WITH PAYMENT GATEWAYS */

  /**
   * Sample snippets:

  // add new payment method option
  response.payment_gateways.push({
    intermediator: {
      code: 'paupay',
      link: 'https://www.palpay.com.br',
      name: 'paupay'
    },
    payment_url: 'https://www.palpay.com.br/',
    type: 'payment',
    payment_method: {
      code: 'banking_billet',
      name: 'Boleto Bancário'
    },
    label: 'Boleto Bancário',
    expiration_date: appData.expiration_date || 14
  })

  */

  res.send(response)
}
