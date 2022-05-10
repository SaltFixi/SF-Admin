import Mock from 'mockjs'

/**
 * 登录页
 */
Mock.mock(/api\/sys-user\/login/, 'post', (_req) => {
  const result = { data: {} }
  const body = JSON.parse(_req.body)
  let success = false
  const { user, password } = body
  if (user === 'admin' && password === '9499453f9c2b064ad5094031d6ee46df') {
    success = true
    result.data.name = 'Saltedfixi'
    result.data.role = 'admin'
  } else if (user === 'xx' && password === '30fcb6acfe4f39cbb1b743a989cd39a5') {
    success = true
    result.data.name = 'xx'
    result.data.role = 'emp'
  }
  if (success) {
    result.status = 200
    result.resultCode = true
    result.data.token = 'Authorization:' + Mock.Random.guid()
    result.data.message = '登录成功'
  } else {
    result.status = 401
    result.resultCode = false
    result.message = '登录失败'
  }
  return result
})
