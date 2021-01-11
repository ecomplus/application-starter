exports.post = ({ appSdk, admin }, req, res) => {
    /**
   * Requests coming from the modules receive a hydrated body with two objects, `params` and application`.
   * In `application` is a copy of your application installed by the merchant, including the properties` data` and `hidden_data`.
   * JSON Schema of the apply_discount module
   * `params`: https://apx-mods.e-com.plus/api/v1/apply_discount/schema.json?store_id=100
   * `response`: https://apx-mods.e-com.plus/api/v1/apply_discount/response_schema.json?store_id=100
   */
  const { params, application } = req.body
  const { storeId } = req

  // merge all app options configured by merchant
  const appData = Object.assign({}, application.data, application.hidden_data)

  // setup basic required response object
  // Must follow schema: https://apx-mods.e-com.plus/api/v1/apply_discount/response_schema.json?store_id=100
  const response = {
    discount_rule: {}
  }

  /* DO THE STUFF HERE TO FILL RESPONSE OBJECT WITH DISCOUNT OPTIONS */
  res.send(response)
}
