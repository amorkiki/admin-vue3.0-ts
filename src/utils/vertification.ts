/**
 * 手机号验证
 * @param {*} value 手机号
 * @param value 
 */
export function checkPhone(value: string):boolean{
  let regPhone = /^1[3456789]\d{9}$/
  return regPhone.test(value)
}

/**
 * 密码检验，6-20数字+英文
 */
export function checkPass(value: string): boolean{
  let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return regPassword.test(value)
}

/**
 * 验证码，6数字+英文
 */
export function checkCode(value: string): boolean{
  let regCode = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6}$/;
  return regCode.test(value)
}