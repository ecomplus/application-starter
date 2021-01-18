exports.post = ({ appSdk, admin }, req, res) => {
  /**
    * Requests coming from Modules API have two object properties on body: `params` and `application`.
    * `application` is a copy of your app installed by the merchant,
    * including the properties `data` and `hidden_data` with admin settings configured values.
    * JSON Schema reference for the Apply Discount module objects:
    * `params`: https://apx-mods.e-com.plus/api/v1/apply_discount/schema.json?store_id=100
    * `response`: https://apx-mods.e-com.plus/api/v1/apply_discount/response_schema.json?store_id=100
    */

  const { params, application } = req.body
  const { storeId } = req

  // merge all app options configured by merchant
  const appData = Object.assign({}, application.data, application.hidden_data)

  // setup basic required response object
  const response = {
    discount_rule: {}
  }

  /* DO THE STUFF HERE TO FILL RESPONSE OBJECT WITH DISCOUNT OPTIONS */
  /*
  // You can set how many discount rules you need. 
  // But you can leave set up an extra discount that applies with the rules configured in the application. 
  // example;
  if (appData.available_extra_discount) {
    const extra = appData.available_extra_discount
    const { amount } = params

    if (amount.total <= extra.min_amount) {
      const discountValue = extra.value

      if (extra.type === 'percentage') {
        discountValue *= (amount.total / 100)
      }

      const newAmountTotal = (amount.total - discountValue)
    }

    response.available_extra_discount = {
      ...appData.available_extra_discount
    }
  }
  */

  /**
   * 
   */
  res.send(response)
}
