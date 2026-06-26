import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { runCommand, validateInput } from './utils.js';
import { broadcast } from './ws.js';

const router = express.Router();
const wifi = require('node-wifi');

wifi.init({
    iface: null, // let os choose interface
});

router.get('/switch', async (req, res) => {
    const {ssid, password} = req.body;

    if (!ssid) {
        return res.status(400).json({ message: 'SSID is required' });
    }

    try {
        await wifi.connect({ ssid, password }, err => {
            if (err) {
                return res.status(500).json({ message: 'Error connecting to Wi-Fi', error: err.message });
            }
            res.json({ message: `Connected to Wi-Fi network: ${ssid}` });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error connecting to Wi-Fi', error: error.message });
    }
});

export default router;