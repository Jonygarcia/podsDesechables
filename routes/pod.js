'use strict'

const express = require('express');
const router = express.Router();
const Pod = require('../models/Pod');

router.get('/', async (req, res) => {
    try {
        const arrayPodDB = await Pod.find();
        console.log(arrayPodDB);
        res.render('pod', { arrayPod: arrayPodDB })
    } catch (error) {
        console.log(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const podDB = new Pod(body)
        await podDB.save()
        res.redirect('/')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const podDB = await Pod.findOne({ _id: id })
        console.log(podDB)
        res.render('detalle', {
            pod: podDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'Producto no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('_id desde backend', id)
    try {
        const podDB = await Pod.findByIdAndDelete({ _id: id });
        console.log(podDB)

        if (!podDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el producto'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Producto eliminado'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const podDB = await Pod.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(podDB)
        res.json({
            estado: true,
            mensaje: 'Producto editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el producto'
        })
    }
})

module.exports = router;
