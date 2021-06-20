const gioHangSchema = {
    type: "object",
    properties: {
        MaSP: { type: "string", minLength: 1, maxLength: 200 },
        SoLuong: { type: "integer" }
    },
    required: ["MaSP", "SoLuong"],
    additionalProperties: false
}
module.exports = gioHangSchema;