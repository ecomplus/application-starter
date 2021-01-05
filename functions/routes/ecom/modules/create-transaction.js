exports.post = ({ appSdk, admin }, req, res) => {
  /**
   * Requisições vindas dos módulos recebem um body hidratrado com dois objetos, `params` e application`.
   * Em `application` está uma cópia do seu aplicativo instalado pelo lojista, inclusive as propriedades `data` e `hidden_data`.
   * JSON Schema do módulo create_transaction
   * `params`: https://apx-mods.e-com.plus/api/v1/create_transaction/schema.json?store_id=100
   * `response`: https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
   */
  const { params, application } = req.body

  /**
   * storeId é tratado em @/bin/web.js, e está disponível em `req.storeId` em todas as requisições feitas em resources que comecem com `/ecom/*`.
   * Mas também pode ser acessada em req.get('x-store-id') ou req.headers['x-store-id']
   */
  const { storeId } = req

  // Mescla configurações do lojista no app instalado
  const appData = Object.assign({}, application.data, application.hidden_data)

  // https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
  const transaction = {}
  let redirectToPayment = false

  /**
   * Realize sua operação aqui conforme o metódo de pagamento escolhido.
   * Faça chamada em algum web service externo ou apenas preencha a propriedade `transaction` conforme a referência do módulo.
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
      redirectToPayment = true
      //
      break;
    default:
      break;
  }

  const response = {
    redirect_to_payment: redirectToPayment,
    transaction
  }

  res.send(response)
}
