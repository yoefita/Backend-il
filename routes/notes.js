const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Import database connection
const connection = require('../config/database');

/**
 * INDEX NOTES
 */
router.get('/', function (req, res) {
    // Query to get all notes
    connection.query('SELECT * FROM notes ORDER BY id ASC', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error!',
            });
        } else {
            return res.status(200).json({
                status: true,
                data: rows
            });
        }
    });
});

/*
 * STORE NOTES
 */
router.post('/store', [
    // Validation rules
    body('title').notEmpty().withMessage('Title is required!'),
    body('datetime').notEmpty().withMessage('Datetime is required!'),
    body('note').notEmpty().withMessage('Note is required!')
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    // Define formData
    let formData = {
        title: req.body.title,
        datetime: req.body.datetime,
        note: req.body.note
    };

    // Insert query
    connection.query('INSERT INTO notes SET ?', formData, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error!',
            });
        } else {
            return res.status(201).json({
                status: true,
                message: 'Successfully inserted!',
                data: rows.insertId
            });
        }
    });
});

/*
* SHOW NOTES
*/
router.get('/(:id)', function (req, res) {
    // get the id from parameter url
    let id = req.params.id

    // execute query
    connection.query(`SELECT * FROM notes WHERE id = ${id}`, function (err, rows) {
        // If query error
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error!',
            })
        }

        // If notes not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Note not found!',
            })
        }
        // If notes found 
        else {
            return res.status(200).json({
                status: true,
                // show the index-0 form rows
                data: rows[0]
            })
        }
    })
})

/*
* UPDATE NOTE
*/
router.patch('/update/(:id)', [
    // Validation rules
    body('title').notEmpty().withMessage('Title is required!'),
    body('datetime').notEmpty().withMessage('Datetime is required!'),
    body('note').notEmpty().withMessage('Note is required!')
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    // get id
    let id = req.params.id

    // Define update data
    let formData = {
        title: req.body.title,
        datetime: req.body.datetime,
        note: req.body.note
    };

    connection.query(`UPDATE notes SET ? WHERE id = ${id}`, formData, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error!',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Successfully updated!',
                data: rows
            })
        }
    })

})

/*
* DELETE NOTE
*/
router.delete('/(:id)', function (req, res) {
    let id = req.params.id

    connection.query(`DELETE FROM notes WHERE id = ${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Internal server error!"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Successfully deleted!"
            })
        }
    })
})


module.exports = router;
