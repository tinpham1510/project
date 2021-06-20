var express = require('express');
var router = express.Router();
var { db, auth, firebaseApp, FieldValue } = require('../../config/firebase-config');
var { ensureAuthenticated } = require('../../config/auth-config');

var validator = require('../../config/validator-config');
/**
 * @swagger
 * tags:
 *  name: DonHang
 *  description: Đơn hàng
 */

/**
 * @swagger
 * /api/don-hang:
 *  get:
 *      summary: Lấy danh sách đơn hàng
 *      tags: [DonHang]
 *      responses:
 *          200:
 *              description: Danh sách đơn hàng
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
 *                                          MaDH: 
 *                                              type: string
 *                                          MaKH: 
 *                                              type: string
 *                                          TenNguoiDung:
 *                                              type: string
 *                                          TenNguoiNhan: 
 *                                              type: string
 *                                          DiaChi: 
 *                                              type: string
 *                                          NgayMua:
 *                                              type: string
 *                                          TinhTrangDonHang: 
 *                                              type: string
 *  
 */
router.get('/', async (req, res) => {
    try {
        var collectionDonHang = db.collection('DonHang').where('MaKH', '==', req.user.uid);
        var data = await collectionDonHang.get();
        return res.json({
            success: true, data: data.docs.map((value) => {
                let item = value.data();
                item.MaDH = value.id;
                return item;
            })
        });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});
/**
 * @swagger
 * /api/don-hang/chi-tiet:
 *  get:
 *      summary: Lấy chi tiết đơn hàng
 *      tags: [DonHang]
 *      parameters:
 *       - in: query
 *         name: MaDH
 *         schema:
 *           type: string
 *         description: Mã đơn hàng
 *      responses:
 *          200:
 *              description: Chi tiết đơn hàng
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
 *                                          MaDH: 
 *                                              type: string
 *                                          MaKH: 
 *                                              type: string
 *                                          TenNguoiDung:
 *                                              type: string
 *                                          TenNguoiNhan: 
 *                                              type: string
 *                                          DiaChi: 
 *                                              type: string
 *                                          NgayMua:
 *                                              type: string
 *                                          TinhTrangDonHang: 
 *                                              type: string
 *  
 */
router.get('/chi-tiet', async (req, res) => {
    try {
        var data = await db.collection('DonHang').doc(req.query.MaDH).get();
        let result = data.data();
        result.MaDH = data.id;
        return res.json({ success: true, data: result });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/don-hang/xac-nhan-don-hang:
 *  post:
 *      summary: Xác nhận đơn hàng
 *      tags: [DonHang]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         MaDH: 
 *                             type: string
 *                      required:
 *                          MaDH
 *      responses:
 *          200:
 *              description: Trạng thái xác nhận
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 */
router.post('/xac-nhan-don-hang', async (req, res) => {
    try {
        var donHang = await db.collection('DonHang').doc(req.body.MaDH).get();
        if (donHang.exists) {
            donHang.ref.update({ TinhTrangDonHang: 'Đang xử lý' });
            return res.json({ success: true });
        }
        else {
            return res.json({ success: false, message: "Đơn hàng không tồn tại" })
        }
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/don-hang/xac-nhan-hoan-thanh:
 *  post:
 *      summary: Xác nhận hoàn thành đơn hàng
 *      tags: [DonHang]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         MaDH: 
 *                             type: string
 *                      required:
 *                          MaDH
 *      responses:
 *          200:
 *              description: Trạng thái xác nhận
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                  success:
 *                                      type: boolean
 *                                      description: Trạng thái trả về
 */
router.post('/xac-nhan-don-hang', async (req, res) => {
    try {
        var donHang = await db.collection('DonHang').doc(req.body.MaDH).get();
        if (donHang.exists) {
            if (donHang.data().TinhTrangDonHang !== 'Đang xử lý') {
                return res.json({ success: false, message: "Trạng thái đơn hàng phải là đang xử lý" });
            }
            else{
            donHang.ref.update({ TinhTrangDonHang: 'Đã hoàn thành' });
            }
            return res.json({ success: true });
        }
        else {
            return res.json({ success: false, message: "Đơn hàng không tồn tại" });
        }
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

module.exports = router;