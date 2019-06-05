const express = require("express");
const redisClient = require("./modules/redis-client");
const app = express();

app.init = async function init({dbcon}) {

    app.get("/", (req, res, next) => {
        res.status(200).send("Hello, i am superfast server");
    });

    app.get("/book", async (req, res, next) => {

        const bookId = 1;

        var cachedBook = await redisClient.getAsync("book-" + bookId);
        if(!cachedBook){
            let bookRes = await dbcon.query('SELECT * FROM Book');
            const book = bookRes[0];

            const chapters = await dbcon.query('SELECT * FROM Chapter WHERE BookId=' + book.Id);
            for(chapter of chapters) {
                let result = await dbcon.query('SELECT * FROM Page WHERE ChapterId=' + chapter.Id)
                chapter["pages"] = result
            }

            book["chapters"] = chapters
            let result = await redisClient.setAsync("book-" + bookId, JSON.stringify(book));

            console.log("From db")
            res.status(200).json(book);

        } else{
            console.log("From cache")
            res.status(200).json(JSON.parse(cachedBook));
        }
    });

    app.get("/clearcache", async (req, res, next) => {
        const bookId = 1;
        var cleared = await redisClient.delAsync("book-" + bookId);
        res.status(200).json(cleared);
    })
};

module.exports = app;
