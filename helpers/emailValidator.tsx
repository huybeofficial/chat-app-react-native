const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email không được để trống!"
    if (!re.test(email)) return 'Địa chỉ Eamil không hợp lệ!'
    return ''
  }


  export default emailValidator