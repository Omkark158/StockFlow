const express = require('express');
const { getLowStockAlerts } = require('../controllers/alertController');

const router = express.Router();

router.get('/companies/:company_id/alerts/low-stock', getLowStockAlerts);

module.exports = router;