const roleList = [
  { id: 1, code: 'admin', name: '管理员' },
  { id: 2, code: 'emp', name: '员工' }
]

const userList = [
  {
    id: 1,
    userName: 'aaa',
    password: '123123',
    roleId: 1
  },
  {
    id: 2,
    userName: 'bbb',
    password: '123123',
    roleId: 2
  },
  {
    id: 3,
    userName: 'ccc',
    password: '123123',
    roleId: 2
  }
]

export function login(userName, password) {
  const user = userList.find((r) => {
    return r.userName === userName && r.password === password
  })
  return user ? user.id : null
}

export function getUser(token) {
  const user = userList.find(r => r.id === Number(token))
  const { code } = roleList.find(r => r.id === user.roleId)
  return {
    id: user.id,
    userName: user.userName,
    role: code
  }
}
