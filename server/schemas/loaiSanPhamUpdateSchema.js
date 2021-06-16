const loaiSanPhamSchema = {
    type: "object",
    properties: {
        MaLoaiSP: { type: "string", minLength: 1, maxLength: 200 },
        LoaiSP: { type: "string", minLength: 1, maxLength: 200 },
        MaLoaiSPCha: { type: "string", minLength: 1, maxLength: 200 }
    },
    required: ["MaLoaiSP", "LoaiSP"],
    additionalProperties: false
}
module.exports = loaiSanPhamSchema;