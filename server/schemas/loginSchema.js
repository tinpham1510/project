const loginSchema = {
    type: "object",
    properties: {
        TaiKhoan: { type: "string", minLength: 1 },
        MatKhau: { type: "string", minLength: 1 }
    },
   required: ["TaiKhoan", "MatKhau"],
    additionalProperties: false,
}
module.exports = loginSchema;