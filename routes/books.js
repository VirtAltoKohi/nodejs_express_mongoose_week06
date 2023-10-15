const express = require("express")
const bookModel = require('../models/books')

const routes = express.Router()

//Get All Books
routes.get("/books", async (req, res) => {
    
    try {
        const bookList =  await bookModel.find({})
        res.status(200).send(bookList)
    } catch(error) {
        res.status(500).send(error)
    }

    //res.send({message: "Get All Books"})

})

//Add NEW Book
routes.post("/books", async (req, res) => {
    console.log(req.body)
    try {
        const newBook = new bookModel({
            ...req.body
        })
        await newBook.save()
        res.status(200).send(newBook)
    } catch(error) {
        res.status(500).send(error)
    }
    
    // res.send({message: "Add NEW Book"})
})

//Update existing Book By Id
routes.put("/book/:bookid", async (req, res) => {
    try {
        // Create an object with the updated book data from the request body
        const updatedBookData = {
            ...req.body
        };

        // Use findOneAndUpdate to find the book by its ID and update it
        const updatedBook = await bookModel.findOneAndUpdate(
            { _id: req.params.bookid },
            updatedBookData,
            { new: true }
        );

        if (!updatedBook) {
            // Handle the case where the book with the specified ID is not found
            return res.status(404).send({ message: "Book not found" });
        }

        // Respond with the updated book
        res.status(200).send(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
    // res.send({message: "Update existing Book By Id"})
})

//Delete Book By ID
routes.delete("/book/:bookid", async (req, res) => {
    try {
        const book = await bookModel.findOneAndDelete(req.params.bookid)
        if (!book) {
            res.status(200).send({message: "BOook not found"})
        } else {
            console.log(book)
            res.status(204).send(book);
        }
    } catch(error) {
        res.status(500).send(error);
    }
    
    // res.send({message: "Delete Book By ID"})
})

//Get Book By ID
routes.get("/book/:bookid", async (req, res) => {
    try {
        const book = await bookModel.find({_id: req.params.bookid})
        if (!book) {
            res.status(200).send({message: "Book couldn't be found"})
        } else {
            res.status(200).send(book)
        }
    } catch (error) {
        res.status(500).send(error)
    }

    // res.send({message: "Get Book By ID"})
})

//Get All Books in sorted order
routes.get("/books/sort", async (req, res) => {
    try {
        const book = await bookModel.find({})
        book.sort(function(a,b) {
            var nameA = a.title
            var nameB = b.title

            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
        // console.log(book)
        res.status(200).send(book)

    } catch (error) {
        res.status(500).send({messagee: "Coudn't fetch any book data"})
    }
    
    // res.send({message: "Get All Books in sorted order"})
})

module.exports = routes