const sanPhamSchema = {
    type: "object",
    properties: {
        TenSP: { type: "string", minLength: 1, maxLength: 200 },
        MaLoaiSP: { type: "string", minLength: 1, maxLength: 200 },
        Gia: { type: "integer", minimum: 1, maximum: 99999999999 },
        SoLuong: { type: "integer", minimum: 1, maximum: 999999 },
        MoTa: { type: "string", minLength: 0, maxLength: 1000 },
        GhiChu: { type: "string", minLength: 0, maxLength: 1000 },
        TenTH: { type: "string", minLength: 1, maxLength: 200 },
        XuatXu: { type: "string", minLength: 0, maxLength: 200 },
        TinhTrang: { type: "string", minLength: 1, maxLength: 200 },
        ThoiGianDaSuDung: { type: "integer", minimum: 0, maximum: 999 }
    },
    required: ["TenSP", "Gia", "SoLuong", "TinhTrang", "TenTH", "ThoiGianDaSuDung"],
    additionalProperties: true
}
module.exports = sanPhamSchema;