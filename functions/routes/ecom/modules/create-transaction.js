exports.post = ({ appSdk, admin }, req, res) => {
  /**
   * Requests coming from the modules receive a hydrated body with two objects, `params` and application`.
   * `application` is a copy of your app installed by the merchant,
   * including the properties `data` and `hidden_data` with admin settings configured values.
   * JSON Schema of the create_transaction module
   * `params`: https://apx-mods.e-com.plus/api/v1/create_transaction/schema.json?store_id=100
   * `response`: https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
   */

  const { params, application } = req.body
  const { storeId } = req

  // merge all app options configured by merchant
  const appData = Object.assign({}, application.data, application.hidden_data)

  // payment `transaction` object
  // required in `response` object and must follow schema: https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
  const transaction = {}

  // Indicates whether the buyer should be redirected to payment link right after checkout
  let redirectToPayment = false

  /**
   * Do the stuff here, call external web service or just fill the `transaction` object
   * according to the by the chosen payment_method.
   * `response`: https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
   */
  switch (params.payment_method.code) {
    case 'credit_card':
      // 
      break;
    case 'banking_billet':
      //  
      break;
    case 'online_debit':
      // redirectToPayment = true
      break;
    default:
      break;
  }

  // setup basic required response object
  // must follow schema : https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
  const response = {
    redirect_to_payment: redirectToPayment,
    transaction
  }

  res.send(response)
}
