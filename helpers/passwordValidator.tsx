const passwordValidator = (password) => {
    if (!password) return "Mật khẩu không được để trống!"
    if (password.length < 5) return 'Mật khẩu phải có ít nhất 5 ký tự!'
    return ''
  }

  export default passwordValidator