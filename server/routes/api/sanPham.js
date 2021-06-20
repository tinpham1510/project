var express = require('express');
var router = express.Router();
var { db, auth, firebaseApp, FieldValue } = require('../../config/firebase-config');
var { ensureAuthenticated } = require('../../config/auth-config');

var validator = require('../../config/validator-config');
const sanPhamSchema = require('../../schemas/sanPhamSchema');
const sanPhamUpdateSchema = require('../../schemas/sanPhamUpdateSchema');
/**
 * @swagger
 * tags:
 *  name: SanPham
 *  description: Sản phẩm
 */

/**
 * @swagger
 * /api/san-pham:
 *  get:
 *      summary: Lấy danh sách sản phẩm
 *      tags: [SanPham]
 *      parameters:
 *       - in: query
 *         name: MaLoaiSP
 *         schema:
 *           type: string
 *         description: Lọc theo mã loại sản phẩm
 *       - in: query
 *         name: Gia_min
 *         schema:
 *           type: integer
 *         description: Lọc theo giá tiền tối thiểu
 *       - in: query
 *         name: Gia_max
 *         schema:
 *           type: integer
 *         description: Lọc theo giá tiền tối đa
 *       - in: query
 *         name: TenTH
 *         schema:
 *           type: string
 *         description: Lọc theo tên thương hiệu
 *       - in: query
 *         name: XuatXu
 *         schema:
 *           type: string
 *         description: Lọc theo xuất xứ
 *       - in: query
 *         name: TinhTrang
 *         schema:
 *           type: string
 *         description: Lọc theo tình trạng sản phẩm
 *       - in: query
 *         name: ThoiGianDaSuDung
 *         schema:
 *           type: integer
 *         description: Lọc theo thời gian sử dụng (tháng)
 *      responses:
 *          200:
 *              description: Danh sách sản phẩm
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          MaSP: 
 *                                              type: string
 *                                          TenSP: 
 *                                              type: string
 *                                          Gia: 
 *                                              type: number
 *                                          TinhTrang:
 *                                              type: string
 *                                          ThoiGianDaSuDung:
 *                                              type: number
 *  
 */
router.get('/', async (req, res) => {
    var collectionSanPham = db.collection('SanPham');
    if (req.query.MaLoaiSP)
        collectionSanPham = collectionSanPham.where('MaLoaiSP', '==', req.query.MaLoaiSP);
    if (req.query.Gia)
        collectionSanPham = collectionSanPham.where('Gia', '>=', req.query.Gia);
    if (req.query.Gia)
        collectionSanPham = collectionSanPham.where('Gia', '<=', req.query.Gia);
    if (req.query.TenTH)
        collectionSanPham = collectionSanPham.where('TenTH', '==', req.query.TenTH);
    if (req.query.XuatXu)
        collectionSanPham = collectionSanPham.where('XuatXu', '==', req.query.XuatXu);
    if (req.query.TinhTrang)
        collectionSanPham = collectionSanPham.where('TinhTrang', '==', req.query.TinhTrang);
    if (req.query.ThoiGianDaSuDung)
        collectionSanPham = collectionSanPham.where('ThoiGianDaSuDung', '<=', req.query.ThoiGianDaSuDung);
    collectionSanPham.get().then((querySnap) => {
        let data = [];
        querySnap.forEach((doc) => {
            let item = doc.data();
            item.MaSP= doc.id;
            data.push(item);
        });
        return res.json({ success: true, data: data });
    }).catch((err) => {
        return res.json({ success: false, message: err.message });
    });
});
/**
 * @swagger
 * /api/san-pham/{id}:
 *  get:
 *      summary: Lấy chi tiết sản phẩm
 *      tags: [SanPham]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 1
 *         description: Mã sản phẩm
 *      responses:
 *          200:
 *              description: Thông tin sản phẩm
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          MaSP: 
 *                                              type: string
 *                                          TenSP: 
 *                                              type: string
 *                                          Gia: 
 *                                              type: number
 *                                          SoLuongTonKho:
 *                                              type: number
 *                                          LoaiSP:
 *                                              type: number
 *                                          MoTa: 
 *                                              type: string
 *                                          GhiChu: 
 *                                              type: string
 *                                          XuatXu: 
 *                                              type: number
 *                                          TenTH:
 *                                              type: string
 *                                          TinhTrang:
 *                                              type: string
 *                                          ThoiGianDaSuDung:
 *                                              type: number
 *                                          file:
 *                                              type: array
 *                                              item:
 *                                                  type: string
 *  
 */
router.get('/:id', async (req, res) => {
    try {
        var collectionSanPham = db.collection('SanPham');
        var result = await collectionSanPham.doc(req.params.id).get();
        if (!result.exists)
            throw new Error('Không tồn tại sản phẩm.');
        return res.json({ success: true, data: result.data() });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});
/**
 * @swagger
 * /api/san-pham:
 *  post:
 *      summary: Thêm sản phẩm
 *      tags: [SanPham]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         TenSP: 
 *                             type: string
 *                         MaLoaiSP:
 *                             type: string
 *                         Gia: 
 *                             type: integer
 *                         SoLuong:
 *                             type: integer
 *                         MoTa: 
 *                             type: string
 *                         GhiChu:
 *                             type: string
 *                         TenTH:
 *                             type: string
 *                         XuatXu: 
 *                             type: string
 *                         TinhTrang:
 *                             type: string
 *                         ThoiGianDaSuDung:
 *                             type: integer
 *                         file:
 *                             type: array
 *                             items:
 *                                 type: string
 *                                 format: binary
 *                      required:
 *                          TenSP
 *                          Gia
 *                          SoLuong
 *                          TenTH
 *                          TinhTrang
 *                          ThoiGianDaSuDung    
 *      responses:
 *          200:
 *              description: Thông tin sản phẩm đã thêm
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          MaSP: 
 *                                              type: string
 *                                          TenSP: 
 *                                              type: string
 *                                          Gia: 
 *                                              type: number
 *                                          SoLuongTonKho:
 *                                              type: number
 *                                          LoaiSP:
 *                                              type: number
 *                                          MoTa: 
 *                                              type: string
 *                                          GhiChu: 
 *                                              type: string
 *                                          XuatXu: 
 *                                              type: number
 *                                          TenTH:
 *                                              type: string
 *                                          TinhTrang:
 *                                              type: string
 *                                          ThoiGianDaSuDung:
 *                                              type: number
 */
router.post('/', validator(sanPhamSchema), async (req, res) => {
    try {
        var fileURL_arr = [];

        var collectionSanPham = db.collection('SanPham');
        var insertSanPham = {
            TenSP: req.body.TenSP,
            MaLoaiSP: req.body.MaLoaiSP,
            LoaiSP: (await db.collection('LoaiSanPham')
                .doc(req.body.MaLoaiSP).get()).data().LoaiSP,
            Gia: req.body.Gia,
            SoLuong: req.body.SoLuong,
            MoTa: req.body.MoTa || "",
            GhiChu: req.body.GhiChu || "",
            TenTH: req.body.TenTH,
            XuatXu: req.body.XuatXu || "",
            TinhTrang: req.body.TinhTrang,
            ThoiGianDaSuDung: req.body.ThoiGianDaSuDung
        }
        var result = await collectionSanPham.add(insertSanPham);
        insertSanPham.MaSP = result.id;
        if (req.files?.file) {
            if (Array.isArray(req.files?.file)) {
                for (const file of req.files?.file) {
                    var snapshot = await firebaseApp.storage()
                        .ref(`SanPham/${result.id}/${file.name}`)
                        .put(file.data, { contentType: file.mimetype });
                    var fileURL = await snapshot.ref.getDownloadURL();
                    fileURL_arr.push(fileURL);
                }
            }
            else {
                var file = req.files?.file;
                var snapshot = await firebaseApp.storage()
                    .ref(`SanPham/${result.id}/${file.name}`)
                    .put(file.data, { contentType: file.mimetype });
                var fileURL = await snapshot.ref.getDownloadURL();
                fileURL_arr.push(fileURL);
            }
        }
        console.log(await fileURL_arr);
        insertSanPham.file = fileURL_arr;
        var result = await result.update({ file: await fileURL_arr });
        return res.json({ success: true, data: insertSanPham });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/san-pham:
 *  put:
 *      summary: Sửa thông tin sản phẩm
 *      tags: [SanPham]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         MaSP:
 *                             type: string
 *                         MaLoaiSP:
 *                             type: string
 *                         TenSP: 
 *                             type: string
 *                         Gia: 
 *                             type: integer
 *                         SoLuong:
 *                             type: integer
 *                         MoTa: 
 *                             type: string
 *                         GhiChu:
 *                             type: string
 *                         TenTH:
 *                             type: string
 *                         XuatXu: 
 *                             type: string
 *                         TinhTrang:
 *                             type: string
 *                         ThoiGianDaSuDung:
 *                             type: integer
 *                         file:
 *                             type: array
 *                             items:
 *                                 type: string
 *                                 format: binary
 *                         delete_file:
 *                             type: array
 *                             items:
 *                                  type: string
 *                      required:
 *                          MaSP
 *      responses:
 *          200:
 *              description: Thông tin sản phẩm đã sửa
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          MaSP: 
 *                                              type: string
 *                                          TenSP: 
 *                                              type: string
 *                                          Gia: 
 *                                              type: number
 *                                          SoLuongTonKho:
 *                                              type: number
 *                                          LoaiSP:
 *                                              type: number
 *                                          MoTa: 
 *                                              type: string
 *                                          GhiChu: 
 *                                              type: string
 *                                          XuatXu: 
 *                                              type: number
 *                                          TenTH:
 *                                              type: string
 *                                          TinhTrang:
 *                                              type: string
 *                                          ThoiGianDaSuDung:
 *                                              type: number
 */
router.put('/', validator(sanPhamUpdateSchema), async (req, res) => {
    try {
        var collectionSanPham = db.collection('SanPham');
        var LoaiSP = (await db.collection('LoaiSanPham').
            doc(req.body.MaLoaiSP || '-').get())?.data()?.LoaiSanPham;
        var updateSanPham = {
            TenSP: req.body.TenSP,
            MaLoaiSP: req.body.MaLoaiSP,
            LoaiSP: LoaiSP,
            Gia: req.body.Gia,
            SoLuong: req.body.SoLuong,
            MoTa: req.body.GhiChu,
            GhiChu: req.body.GhiChu,
            TenTH: req.body.TenTH,
            XuatXu: req.body.XuatXu,
            TinhTrang: req.body.TinhTrang,
            ThoiGianDaSuDung: req.body.ThoiGianDaSuDung
        }
        var result = await collectionSanPham.doc(req.body.MaSP).update(updateSanPham);
        updateSanPham.MaSP = req.body.MaSP;
        var fileURL_arr = [];
        console.log(req.body.delete_file.split(','))
        if (req.body.delete_file != null)
        {
            for (var deleteURL of req.body.delete_file.split('')) {
                firebaseApp.storage().refFromURL(deleteURL).delete();
                await collectionSanPham.doc(req.body.MaSP).update({ file: FieldValue.arrayRemove(deleteURL) });
            }
        }
        if (req.files?.file) {
            if (Array.isArray(req.files?.file)) {
                for (const file of req.files?.file) {
                    var snapshot = await firebaseApp.storage()
                        .ref(`SanPham/${updateSanPham.MaSP}/${file.name}`)
                        .put(file.data, { contentType: file.mimetype });
                    var fileURL = await snapshot.ref.getDownloadURL();
                    await collectionSanPham.doc(req.body.MaSP).update({file: FieldValue.arrayUnion(fileURL)});
                    fileURL_arr.push(fileURL);
                    }
                }
            else {
                var file = req.files?.file;
                var snapshot = await firebaseApp.storage()
                    .ref(`SanPham/${updateSanPham.MaSP}/${file.name}`)
                    .put(file.data, { contentType: file.mimetype });
                var fileURL = await snapshot.ref.getDownloadURL();
                await collectionSanPham.doc(req.body.MaSP).update({file: FieldValue.arrayUnion(fileURL)});
                fileURL_arr.push(fileURL);
                }
        }    
        updateSanPham.delete_file = req.body.delete_file.split('');
        updateSanPham.new_file = fileURL_arr;
        return res.json({ success: true, data: updateSanPham });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});


/**
 * @swagger
 * /api/san-pham:
 *  delete:
 *      summary: Xoá sản phẩm
 *      tags: [SanPham]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         MaSP:
 *                             type: string
 *                      required:
 *                          MaSP
 *      responses:
 *          200:
 *              description: Mã sản phẩm đã xoá
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          MaSP: 
 *                                              type: string
 */
router.delete('/', async (req, res) => {
    try {
        var collectionSanPham = db.collection('SanPham');
        await collectionSanPham.doc(req.body.MaSP).delete();
        firebaseApp.storage().ref(`SanPham/${req.body.MaSP}`).delete().then(()=> 
        { }, ()=> { });
        return res.json({ success: true, data: { MaSP: req.body.MaSP } });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

module.exports = router;