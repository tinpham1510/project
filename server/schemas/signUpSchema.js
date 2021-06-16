const signUpSchema = {
    type: "object",
    properties: {
        HoTenKH: { type: "string", minLength: 1, maxLength: 100 },
        TaiKhoan: { type: "string", minLength: 1, maxLength: 25 },
        MatKhau: { type: "string", format: "password", minLength: 8 },
        email: {type: "string", format:"email"},
        DiaChi: { type: "string", minLength: 1, maxLength: 200 },
        Ate: { type: "string", minLength: 8, maxLength: 11 },
        SoCMND: { type: "string", minLength: 9, maxLength: 9 }
    },
    required: ["HoTenKH", "TaiKhoan", "MatKhau", "email"],
    additionalProperties: false,
}
module.exports = signUpSchema;