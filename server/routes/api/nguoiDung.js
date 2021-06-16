var express = require('express');
var router = express.Router();
var { db, auth, firebaseApp } = require('../../config/firebase-config');
var { ensureAuthenticated } = require('../../config/auth-config');

var validator = require('../../config/validator-config');
var signUpSchema = require('../../schemas/signUpSchema');
/**
 * @swagger
 * tags:
 *  name: NguoiDung
 *  description: Người dùng
 */

/**
 * @swagger
 * /api/nguoi-dung/thong-tin:
 *  get:
 *      summary: Lấy thông tin tài khoản
 *      tags: [NguoiDung]
 *      responses:
 *          200:
 *              description: Thông tin tài khoản
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: Trạng thái trả về
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      HoTenKH: 
 *                                          type: string
 *                                      TaiKhoan: 
 *                                          type: string
 *                                      email: 
 *                                          type: string
 *                                      DiaChi:
 *                                          type: string
 *                                      SoCMND:
 *                                          type: string
 * 
 *                          
 * 
 */
router.get('/thong-tin', ensureAuthenticated, async (req, res) => {
    db.collection('KhachHang').doc(req.user.uid).get().then((doc) => {
        return res.json({ success: true, data: doc.data() });
    });
});

/**
 * @swagger
 * /api/nguoi-dung:
 *  post:
 *      summary: Đăng ký tài khoản
 *      tags: [NguoiDung]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         HoTenKH: 
 *                             type: string
 *                         TaiKhoan: 
 *                             type: string
 *                         MatKhau:
 *                             type: string
 *                         email:
 *                             type: string
 *                         SoCMND: 
 *                             type: string
 *                         DiaChi:
 *                             type: string
 *                         Ate:
 *                             type: string
 *                      required:
 *                          HoTenKH
 *                          TaiKhoan
 *                          MatKhau
 *                          email
 *      responses:
 *          200:
 *              description: Thông tin người dùng vừa tạo
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: Trạng thái trả về
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      HoTenKH: 
 *                                          type: string
 *                                      TaiKhoan: 
 *                                          type: string
 *                                      MatKhau: 
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      DiaChi:
 *                                          type: string
 *                                      SoCMND:
 *                                          type: string
 *                                      Ate:
 *                                          type: string
 * 
 */
router.post('/', validator(signUpSchema), async function (req, res) {
    existUsers = await db.collection('KhachHang').where("TaiKhoan", "==", req.body.TaiKhoan).get();
    if (!existUsers.empty) {
        return res.json({ success: false, message: "The password is invalid or the user does not have a password." });
    }
    firebaseApp.auth().createUserWithEmailAndPassword(req.body.email, req.body.MatKhau)
        .then((userCredential) => {
            let userInfo = {
                HoTenKH: req.body.HoTenKH,
                TaiKhoan: req.body.TaiKhoan,
                MatKhau: req.body.MatKhau,
                SoCMND: req.body.SoCMND ,
                email: req.body.email,
                DiaChi: req.body.DiaChi || '',
                Ate: req.body.Ate || '',
                loai_nguoi_dung: 'KhachHang'
            };
            auth.setCustomUserClaims(userCredential.user.uid, { role: 'KhachHang' });
            db.collection('KhachHang').doc(userCredential.user.uid)
                .create(userInfo)
                .then(() => {
                    return res.json({ success: true, data: userInfo });
                })
        })
        .catch((err) => {
            return res.json({ success: false, message: err.message });
        })
});
/**
 * @swagger
 * /api/nguoi-dung/doi-mat-khau:
 *  put:
 *      summary: Đổi mật khẩu
 *      tags: [NguoiDung]
 *      responses:
 *          200:
 *              description: Trạng thái trả về
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: Trạng thái trả về
 * 
 */
 router.put('/doi-mat-khau', ensureAuthenticated, async (req, res) => {
    try {
        firebaseApp.auth().sendPasswordResetEmail(req.user.email);
        return res.json({ success: true });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/nguoi-dung:
 *  put:
 *      summary: Cập nhật thông tin tài khoản
 *      tags: [NguoiDung]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         ten_nguoi_dung: 
 *                             type: string
 *                         ten_tai_khoan: 
 *                             type: string
 *                         dia_chi:
 *                             type: string
 *                         so_dien_thoai:
 *                             type: string
 *      responses:
 *          200:
 *              description: Trạng thái trả về
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: Trạng thái trả về
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      ten_nguoi_dung: 
 *                                          type: string
 *                                      ten_tai_khoan: 
 *                                          type: string
 *                                      email: 
 *                                          type: string
 *                                      dia_chi:
 *                                          type: string
 *                                      so_dien_thoai:
 *                                          type: string
 */
 router.put('/', ensureAuthenticated, async (req, res) => {
    try {
        var updateNguoiDung = {
            HoTenKH: req.body.HoTenKH,
            DiaChi: req.body.DiaChi,
            Ate: req.body.Ate,
            SoCMND: req.body.SoCMND
        };

        await db.collection('KhachHang').doc(req.user.uid).update(updateNguoiDung);
        return res.json({ success: true, data: updateNguoiDung });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

module.exports = router;