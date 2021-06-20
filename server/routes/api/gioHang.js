var express = require('express');
var router = express.Router();
var { db, auth, firebaseApp, FieldValue } = require('../../config/firebase-config');
var { ensureAuthenticated } = require('../../config/auth-config');

var validator = require('../../config/validator-config');
const gioHangSchema = require('../../schemas/gioHangSchema');
/**
 * @swagger
 * tags:
 *  name: GioHang
 *  description: Giỏ hàng
 */

/**
 * @swagger
 * /api/gio-hang:
 *  get:
 *      summary: Lấy thông tin giỏ hàng
 *      tags: [GioHang]
 *      responses:
 *          200:
 *              description: Danh sách sản phẩm trong giỏ hàng
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: Trạng thái trả về
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          MaSP: 
 *                                              type: string
 *                                          TenSP: 
 *                                              type: string
 *                                          SoLuong:
 *                                              type: number
 *                                          Gia: 
 *                                              type: number
 *  
 */
router.get('/', async (req, res) => {
    try {
        var collectionGioHang = db.collection('KhachHang').doc(req.user.uid).collection('gio-hang');
        var collectionSanPham = db.collection('SanPham');
        var gioHang = await collectionGioHang.get();
        let data = [];
        for (var gioHangItem of gioHang.docs) {
            let item = gioHangItem.data();
            let sanPham = await collectionSanPham.doc(item.MaSP).get();
            //item.TenSP = sanPham.data().TenSP;
            //item.Gia = sanPham.data().Gia;
            data.push(item);
        }
        return res.json({ success: true, data: data });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/gio-hang:
 *  post:
 *      summary: Thêm sản phẩm vào giỏ hàng
 *      tags: [GioHang]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         MaSP: 
 *                             type: string
 *                         SoLuong:
 *                             type: integer
 *                      required:
 *                          MaSP
 *                          SoLuong
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
 *                                          SoLuong:
 *                                              type: number
 */
router.post('/', validator(gioHangSchema), async (req, res) => {
    try {
        var collectionGioHang = db.collection('KhachHang').doc(req.user.uid).collection('gio-hang');
        var currentSanPham = await collectionGioHang.where('MaSP', '==', req.body.MaSP).get();
        if (currentSanPham.empty) {
            var insertSanPham = {
                MaSP: req.body.MaSP,
                SoLuong: req.body.SoLuong
            }
            await collectionGioHang.add(insertSanPham);
            return res.json({ success: true, data: insertSanPham });
        }
        else {
            var updateSanPham = (await collectionGioHang.where('MaSP', '==', req.body.MaSP).get())[0];
            updateSanPham.update({ SoLuong: FieldValue.increment(req.body.SoLuong) });
            return res.json({ success: true, data: updateSanPham.data() })
        }
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/gio-hang:
 *  put:
 *      summary: Cập nhật số lượng sản phẩm trong giỏ hàng
 *      tags: [GioHang]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         MaSP: 
 *                             type: string
 *                         SoLuong:
 *                             type: integer
 *                      required:
 *                          MaSP
 *                          SoLuong
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
 *                                          SoLuong:
 *                                              type: number
 */
router.put('/', validator(gioHangSchema), async (req, res) => {
    try {
        var collectionGioHang = db.collection('KhachHang').doc(req.user.uid).collection('gio-hang');
        var currentSanPham = await collectionGioHang.where('MaSP', '==', req.body.MaSP).get();
        if (currentSanPham.empty) {
            var insertSanPham = {
                MaSP: req.body.MaSP,
                SoLuong: req.body.SoLuong
            }
            await collectionGioHang.add(insertSanPham);
            return res.json({ success: true, data: insertSanPham });
        }
        else {
            var updateSanPham = currentSanPham.docs[0];
            updateSanPham.ref.update({ SoLuong: req.body.SoLuong });
            return res.json({ success: true, data: insertSanPham });
        }
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/gio-hang:
 *  delete:
 *      summary: Xoá sản phẩm khỏi giỏ hàng
 *      tags: [GioHang]
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
        var collectionGioHang = db.collection('KhachHang').doc(req.user.uid).collection('gio-hang');
        var data = await collectionGioHang.where('MaSP', '==', req.body.MaSP).get();
        if (!data.empty) {
            data.docs.forEach((doc) => doc.ref.delete());
        }
        return res.json({ success: true, data: { MaSP: req.body.MaSP } });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/gio-hang/thanh-toan:
 *  post:
 *      summary: Thanh toán
 *      tags: [GioHang]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         TenNguoiNhan:
 *                             type: string
 *                         Ate:
 *                             type: string
 *                         DiaChi:
 *                             type: string
 *                         email:
 *                             type: string
 *                      required:
 *                          TenNguoiNhan
 *                          Ate
 *                          DiaChi
 *                          email
 *      responses:
 *          200:
 *              description: Mã đơn hàng
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 */
router.post('/thanh-toan', async (req, res) => {
    try {
        var collectionGioHang = db.collection('KhachHang').doc(req.user.uid).collection('gio-hang');
        var collectionDonHang = db.collection('DonHang');
        var collectionSanPham = db.collection('SanPham');
        var listSanPham = await collectionGioHang.get();
        var arrSanPhamDonHang = [];
        for (var sanPham of listSanPham.docs) {
            let item = sanPham.data();
            let sanPhamRef = await collectionSanPham.doc(item.MaSP).get();
            item.Gia = sanPhamRef.data().Gia;
            arrSanPhamDonHang.push(item);
        }
        insertDonHang = {
            MaKH: req.user.uid,
            TenNguoiNhan: req.body.TenNguoiNhan,
            Ate: req.body.Ate,
            DiaChi: req.body.dia_chi,
            email: req.body.email,
            sanPham: arrSanPhamDonHang,
            NgayMua: new Date(),
            TinhTrangDonHang: 'Đã khởi tạo'
        };
        collectionDonHang.add(insertDonHang);
        const batch = db.batch();
        (await collectionGioHang.get()).docs.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
        return res.json({ success: true });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

module.exports = router;