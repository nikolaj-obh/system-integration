import { Router } from "express";

const router = Router();

const shops = [{
    id: 1,
    shopName: "Lidl",
    shopLocation: "Horsens",
}];

/**
 * @openapi
 * /shops:
 *   get:
 *     description: Get all shops
 *     responses:
 *       200:
 *         description: Returns all shops
 */
router.get("/shops", (req, res) => {
    res.send({data: shops})
});

/**
 * @openapi
 * /shop:
 *   post:
 *     description: Create a new shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *               type: integer
 *              shopName:
 *               type: string
 *              shopLocation:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns the shop that was created
 */
router.post("/shop", (req, res) => {
    const shop = req.body;
    shops.push(shop);
    res.send(shop);
});

export default router;