const express = require("express");
const app = express();

app.init = async function init({dbcon}) {

    app.get("/", (req, res, next) => {
        res.status(200).send("Hello, i am superfast server");
    });

    app.get("/book", async (req, res, next) => {

        let result = await dbcon.query('SELECT * FROM Book');
        const book = result[0];
        const chapters = await dbcon.query('SELECT * FROM Chapter WHERE BookId=' + book.Id);
        for(chapter of chapters) {
            let result = await dbcon.query('SELECT * FROM Page WHERE ChapterId=' + chapter.Id)
            chapter["pages"] = result
        }

        book["chapters"] = chapters;
        res.status(200).json(book);
    });
};

module.exports = app;
