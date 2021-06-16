var express = require('express');
var router = express.Router();
var { db, auth, firebaseApp, FieldValue } = require('../../config/firebase-config');
var { ensureAuthenticated } = require('../../config/auth-config');

var validator = require('../../config/validator-config');
const loaiSanPhamSchema = require('../../schemas/loaiSanPhamSchema');
const loaiSanPhamUpdateSchema = require('../../schemas/loaiSanPhamUpdateSchema');
/**
 * @swagger
 * tags:
 *  name: LoaiSanPham
 *  description: Loại sản phẩm
 */

/**
 * @swagger
 * /api/loai-san-pham:
 *  get:
 *      summary: Lấy danh sách loại sản phẩm
 *      tags: [LoaiSanPham]
 *      parameters:
 *       - in: query
 *         name: MaLoaiSPCha
 *         schema:
 *           type: string
 *         description: Mã loại sản phẩm cha
 *      responses:
 *          200:
 *              description: Danh sách loại sản phẩm
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
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              LoaiSP:
 *                                                  type: string
 *                                              MaLoaiSPCha:
 *                                                  type: string
 *  
 */
router.get('/', async (req, res) => {
    var collectionLoaiSanPham = db.collection('LoaiSanPham');
    if (req.query.MaLoaiSPCha != null)
        collectionLoaiSanPham = collectionLoaiSanPham.where('MaLoaiSPCha', '==', req.query.ma_loai_san_pham_cha);
    collectionLoaiSanPham.get().then((querySnap) => {
        let data = [];
        querySnap.forEach((doc) => {
            let item = {};
            item.LoaiSP = doc.data().LoaiSP;
            item.MaLoaiSP = doc.id;
            data.push(item);
        });
        return res.json({ success: true, data: data });
    }).catch((err) => {
        return res.json({ success: false, message: err.message });
    });
});

/**
 * @swagger
 * /api/loai-san-pham:
 *  post:
 *      summary: Thêm loại sản phẩm
 *      tags: [LoaiSanPham]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         LoaiSP: 
 *                             type: string
 *                         MaLoaiSPCha: 
 *                             type: string
 *                      required:
 *                          LoaiSP
 *      responses:
 *          200:
 *              description: Thông tin loại sản phẩm đã thêm
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
 *                                          LoaiSP: 
 *                                              type: string
 *                                          LoaiSPCha: 
 *                                              type: string
 */
router.post('/', validator(loaiSanPhamSchema), async (req, res) => {
    try {
        var collectionLoaiSanPham = db.collection('LoaiSanPham');
        if (req.body.MaLoaiSPCha!= null) {
            if (!(await collectionLoaiSanPham.doc(req.body.MaLoaiSPCha).get()).exists) {
                throw new Error("Không tồn tại loại sản phẩm cha");
            }
            if (!((await collectionLoaiSanPham.where('LoaiSP', '==', req.body.LoaiSP)
                .where('MaLoaiSPCha', '==', req.body.MaLoaiSPCha).get()).empty))
                throw new Error("Loại sản phẩm này đã tồn tại");
        }
        else {
            if (!((await collectionLoaiSanPham.where('LoaiSP', '==', req.body.LoaiSP).get()).empty))
                throw new Error("Loại sản phẩm này đã tồn tại");
        }

        var insertLoaiSanPham = {
            LoaiSP: req.body.LoaiSP,
            MaLoaiSPCha: req.body.MaLoaiSPCha ?? "root",
        }
        var result = await collectionLoaiSanPham.add(insertLoaiSanPham);
        insertLoaiSanPham.MaLoaiSP = result.id;
        return res.json({ success: true, data: insertLoaiSanPham });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

/**
 * @swagger
 * /api/loai-san-pham:
 *  put:
 *      summary: Sửa loại sản phẩm
 *      tags: [LoaiSanPham]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         MaLoaiSP:
 *                             type: string
 *                         LoaiSP: 
 *                             type: string
 *                         MaLoaiSPCha: 
 *                             type: string
 *                      required:
 *                          MaLoaiSPCha,
 *                          LoaiSP
 *      responses:
 *          200:
 *              description: Thông tin loại sản phẩm đã sửa
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
 *                                          MaLoaiSP:
 *                                              type: string
 *                                          LoaiSP: 
 *                                              type: string
 *                                          MaLoaiSPCha: 
 *                                              type: string
 */
router.put('/', validator(loaiSanPhamUpdateSchema), async (req, res) => {
    try {
        var collectionLoaiSanPham = db.collection('LoaiSanPham');
        if (req.body.MaLoaiSPCha != null) {
            if (!(await collectionLoaiSanPham.doc(req.body.MaLoaiSPCha).get()).exists) {
                throw new Error("Không tồn tại loại sản phẩm cha");
            }
            if (!((await collectionLoaiSanPham.where('LoaiSP', '==', req.body.LoaiSP)
                .where('MaLoaiSPCha', '==', req.body.MaLoaiSPCha).get()).empty))
                throw new Error("Loại sản phẩm này đã tồn tại");
        }
        else {
            if (!((await collectionLoaiSanPham.where('LoaiSP', '==', req.body.LoaiSP).get()).empty))
                throw new Error("Loại sản phẩm này đã tồn tại");
        }
        var updateLoaiSanPham = {
            LoaiSP: req.body.LoaiSP,
            LoaiSPCha: req.body.LoaiSPCha,
        }

        //Batch update
        var batch = db.batch();
        var loaiSanPhamRef = collectionLoaiSanPham.doc(req.body.MaLoaiSP);
        batch.update(loaiSanPhamRef, updateLoaiSanPham);
        var collectionSanPham = await db.collection('SanPham')
            .where('MaLoaiSP', '==', req.body.MaLoaiSP).get();
        for (var sanPham of collectionSanPham.docs) {
            batch.update(sanPham, { LoaiSP: req.body.LoaiSP });
        }

        var result = await batch.commit();
        updateLoaiSanPham.MaLoaiSP = req.body.MaLoaiSP;
        return res.json({ success: true, data: updateLoaiSanPham });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});


/**
 * @swagger
 * /api/loai-san-pham:
 *  delete:
 *      summary: Xoá loại sản phẩm
 *      tags: [LoaiSanPham]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          MaLoaiSP:
 *                              type: string
 *                      required:
 *                          MaLoaiSP
 *      responses:
 *          200:
 *              description: Mã loại sản phẩm đã xoá
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
 *                                          MaLoaiSP: 
 *                                              type: string
 */
router.delete('/', async (req, res) => {
    try {
        var batch = db.batch();
        var collectionLoaiSanPhamRef = db.collection('LoaiSanPham').doc(req.body.MaLoaiSP);
        batch.delete(collectionLoaiSanPhamRef);
        var collectionSanPham = await db.collection('SanPham')
            .where('MaLoaiSP', '==', req.body.MaLoaiSP).get();
        for (var sanPham of collectionSanPham.docs) {
            batch.update(sanPham, { MaLoaiSP: FieldValue.delete(), LoaiSP: FieldValue.delete() });
        }
        var result = await batch.commit();
        return res.json({ success: true, data: { MaSP: req.body.MaLoaiSP } });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

module.exports = router;