exports.post = ({ appSdk, admin }, req, res) => {
  /**
   * Requests coming from Modules API have two object properties on body: `params` and `application`.
   * `application` is a copy of your app installed by the merchant,
   * including the properties `data` and `hidden_data` with admin settings configured values.
   * JSON Schema reference for the Apply Discount module objects:
   * `params`: https://apx-mods.e-com.plus/api/v1/apply_discount/schema.json?store_id=100
   * `response`: https://apx-mods.e-com.plus/api/v1/apply_discount/response_schema.json?store_id=100
   *
   * Complete (advanced) example in our default discouts app:
   * https://github.com/ecomplus/discounts/blob/master/routes/ecom/modules/apply-discount.js
   */

  const { params, application } = req.body
  const { storeId } = req
  const response = {}
  // merge all app options configured by merchant
  const appData = Object.assign({}, application.data, application.hidden_data)

  if (appData.available_extra_discount) {
    response.available_extra_discount = appData.available_extra_discount
  }
  if (params.discount_coupon) {
    // should match discount by coupon code
  }

  /* DO THE STUFF HERE TO FILL RESPONSE OBJECT WITH DISCOUNT OPTIONS */

  /**
   * Sample snippets:

  // set discount value
  response.discount_rule = {
    label: 'X Campaign',
    extra_discount: {
      value: 20.5,
      flags: ['x-coupon']
    }
  }

  */

  res.send(response)
}
