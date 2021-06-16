const loaiSanPhamSchema = {
    type: "object",
    properties: {
        LoaiSP: { type: "string", minLength: 1, maxLength: 200 },
        MaLoaiSPCha: { type: "string", minLength: 1, maxLength: 200 }
    },
    required: ["LoaiSP"],
    additionalProperties: false
}
module.exports = loaiSanPhamSchema;