class UserManagement {
  constructor(client) {
    this.client = client
  }

  setUserManConfig(projectId, provider, config) {
    return Promise((resolve, reject) => {
      this.client.postJSON(`/v1/config/${projectId}/user-management/${provider}`, config)
        .then((status, data) => {
          if (status !== 200) {
            reject(data.error)
            return
          }
          resolve()
        })
    })
  }
}

export default UserManagement