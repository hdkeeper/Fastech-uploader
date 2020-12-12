/*
    Обработчики /api/files
*/
const router = require('express').Router();
const { File } = require('./db');

router
.get('/:field', async (req, res) => {
    res.send(await File.findAll({
        attributes: ['id', 'name'],
        where: { field: req.params.field }
    }));
})
.post('/:field', async (req, res) => {
    const argFile = req.files[Object.keys(req.files)[0]];
    const dbFile = await File.create({
        field: req.params.field,
        name: argFile.name,
        body: argFile.data
    });

    res.send({ id: dbFile.id, name: dbFile.name });
})
.get('/:field/:id', async (req, res) => {
    const dbFile = await File.findOne({
        where: {
            id: req.params.id,
            field: req.params.field
        }
    });

    if (!dbFile) {
        return res.status(404).send('Not found');
    }

    res.attachment(dbFile.name).send(dbFile.body);
})
.delete('/:field/:id', async (req, res) => {
    await File.destroy({
        where: {
            id: req.params.id,
            field: req.params.field
        }
    });

    res.send('Deleted');
});

module.exports = router;
