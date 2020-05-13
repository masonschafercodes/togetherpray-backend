const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//Routes

//Create a new prayer request
app.post('/requests', async(req, res) => {
    try {
        
        const { request } = req.body;
        const { title } = req.body;
        const { username } = req.body;

        const newRequest = await pool.query('INSERT INTO prayerrequests (title, request, username) VALUES($1, $2, $3) RETURNING *', [title, request, username]);

        res.json(newRequest[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Create new comment

app.post('/comments', async(req, res) => {
    try {
        const { username } = req.body;
        const { comment } = req.body;
        const { prayer_id } = req.body;

        const newComment = await pool.query("INSERT INTO prayercomments (username, comment, prayer_id) VALUES($1, $2, $3) RETURNING *", [username, comment, prayer_id]);

        res.json(newComment[0]);
    } catch (err) {
        console.error(err.message)
    }
})

//get Comments
app.get('/comments/:id', async(req, res) => {
    try {

        const { id } = req.params;

        const getComments = await pool.query('select prayerrequests.title, prayercomments.username, prayercomments.comment from prayerrequests join prayercomments on prayerrequests.prayer_id = prayercomments.prayer_id where prayerrequests.prayer_id = $1', [id]);

        res.json(getComments.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get all Comments
app.get('/comments', async(req, res) => {
    try {

        const getAllComments = await pool.query('select prayerrequests.title, prayercomments.username, prayercomments.comment from prayerrequests join prayercomments on prayerrequests.prayer_id = prayercomments.prayer_id');

        res.json(getAllComments.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//get all requests

app.get('/requests', async(req, res) => {
    try {
        const allRequests = await pool.query('SELECT * FROM prayerrequests');

        res.json(allRequests.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})