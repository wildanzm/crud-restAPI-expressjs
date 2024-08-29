const express = require("express");
const router = express.Router();
const db = require("../database/connect");
const response = require("../helpers/response");

/* GET home page. */
router.get("/", function (req, res, next) {
	response(200, "Student Api", "SUCCESS", res);
});

router.get("/students", (req, res, next) => {
	const sql = "SELECT * FROM students";
	db.query(sql, (err, fields) => {
		response(200, fields, "Get List Students", res);
	});
});

router.get("/students/:id", (req, res, next) => {
	const id = req.params.id;
	const sql = `SELECT * FROM students WHERE id =${id}`;

	db.query(sql, (err, fields) => {
		response(200, fields, "Get Students By Id", res);
	});
});

router.post("/students", (req, res, next) => {
	const { name, grade, address } = req.body;
	const sql = `INSERT INTO students (name, grade, address) VALUES ('${name}', '${grade}', '${address}')`;

	db.query(sql, (err, fields) => {
		if (err) response(500, "Invalid", "error", res);
		if (fields?.affectedRows) {
			const data = {
				isSuccess: fields.affectedRows,
				id: fields.insertId,
			};
			response(200, data, "Added Data Students Success", res);
		}
	});
});

router.put("/students", (req, res, next) => {
	const { id, name, grade, address } = req.body;
	const sql = `UPDATE students SET name = '${name}', grade = '${grade}', address = '${address}' WHERE id = ${id}`;

	db.query(sql, (err, fields) => {
		if (err) response(500, "Invalid", "error", res);
		if (fields?.affectedRows) {
			const data = {
				isSuccess: fields.affectedRows,
				id: fields.insertId,
			};
			response(200, data, "Update Data Students Success", res);
		} else {
			response(404, "Id Not Found", "error", res);
		}
	});
});

router.delete("/students", (req, res, next) => {
	const { id } = req.body;
	const sql = `DELETE FROM students WHERE id = ${id}`;

	db.query(sql, (err, fields) => {
		if (err) response(500, "Invalid", "error", res);
		if (fields?.affectedRows) {
			const data = {
				isDeleted: fields.affectedRows,
			};
			response(200, data, "Delete Data Students Success", res);
		} else {
			response(404, "Id Not Found", "error", res);
		}
	});
});

module.exports = router;
