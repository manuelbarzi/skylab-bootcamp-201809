const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process


// ....................  USER ROUTES .....................//

router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { name, surname, username, password, email } = req.body

        return logic.registerUser(name, surname, username, password, email)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully registered`
                })
            })
    }, res)
})

router.post('/auth', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)
})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.post('/users/:id/profilePicture', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req
        if (id !== sub) throw Error('token sub does not match user id')

        return new Promise((resolve, reject) => {
            const busboy = new Busboy({ headers: req.headers })

            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                logic.addProfilePicture(id, file)
            })

            busboy.on('finish', () => resolve())

            busboy.on('error', err => reject(err))

            req.pipe(busboy)
        })
            .then(() => res.json({
                message: 'photo uploaded'
            }))
    }, res)
})

router.patch('/users/:id', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { name, surname, username, newPassword, password } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateUser(id, name ? name : null, surname ? surname : null, username ? username : null, newPassword ? newPassword : null, password)
            .then(() =>
                res.json({
                    message: 'user updated'
                })
            )
    }, res)
})

// ....................  RENTAL ROUTES .....................//

//ADD RENTALS

router.post('/users/:id/rentals', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { title, city, street, category, image, bedrooms, shared, description, dailyRate } } = req
        return logic.addRental(id, title, city, street, category, image, bedrooms, shared, description, dailyRate)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${title} successfully created`
                })
            })
    }, res)
})

// LIST RENTALS BY ID

router.get('/rentals', (req, res) => {
    routeHandler(() => {
        return logic.retriveRentals()
            .then(rentals => {
                return res.json({
                    data: rentals
                })
            }
            )
    }, res)
})

router.get('/rentals/:idRental', [jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { idRental } } = req

        return logic.retriveRental(idRental)
            .then(rental => {
                return res.json({
                    data: rental
                })
            }
            )
    }, res)
})


router.get('/users/:id/rentals', [jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listRentalByUserId(id)
            .then(rentals => {
                return res.json({
                    data: rentals
                })
            }
            )
    }, res)
})

router.get('/users/:id/rentals/:rentalId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, rentalId } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listRentalByRentalId(id, rentalId)
            .then(rentals => {
                return res.json({
                    data: rentals
                })
            })
    }, res)
})


router.post('/rentals/:query', [jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { query } } = req

        return logic.listRentalByQuery(query)
            .then(rentals => {
                return res.json({
                    data: rentals
                })
            })
    }, res)
})

//UPDATE RENTAL

router.patch('/users/:id/rentals/:rentalId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {

        const { sub, params: { id, rentalId }, body: { title, city, street, category, image, bedrooms, shared, description, dailyRate } } = req
        if (id !== sub) throw Error('token sub does not match user id')
        return logic.updateRental(id, rentalId, title ? title : null, city ? city : null, street ? street : null, category ? category : null, image ? image : null, bedrooms ? bedrooms : null, shared ? shared : null, description ? description : null, dailyRate ? dailyRate : null)
            .then(() =>
                res.json({
                    message: 'Rental updated'
                })
            )
    }, res)
})


// DELETE RENTAL

router.delete('/users/:id/rentals/:rentalId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, rentalId } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.removeRental(id, rentalId)
            .then(() => res.json({
                message: 'Rental removed'
            }))
    }, res)
})

//

// ....................  BOOKING ROUTES .....................//


//ADD BOOKING

router.post('/users/:id/rentals/:rentalId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id, rentalId }, sub, body: { endAt, startAt, totalPrice, days, guests } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addBooking(id, rentalId, endAt, startAt, totalPrice, days, guests)
            .then((booking) => {
                res.status(201)

                res.json({
                    data: booking,
                    message: `your booking has been succesfully`
                })
            })
    }, res)
})



// router.get('/rentals', [bearerTokenParser, jwtVerifier], (req, res) => {
//     routeHandler(() => {

//         return logic.retrieveUser(id)
//             .then(user =>
//                 res.json({
//                     data: user
//                 })
//             )
//     }, res)
// })

// router.patch('/users/:id/collaborators', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { params: { id }, sub, body: { collaboratorUsername } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.addCollaborator(id, collaboratorUsername)
//             .then(() =>
//                 res.json({
//                     message: 'collaborator added'
//                 })
//             )
//     }, res)
// })

// router.get('/users/:id/collaborators', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { params: { id }, sub } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.listCollaborators(id)
//             .then(collaborators =>
//                 res.json({
//                     data: collaborators
//                 })
//             )
//     }, res)
// })

// router.post('/users/:id/postits', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { sub, params: { id }, body: { text } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.addPostit(id, text)
//             .then(() => res.json({
//                 message: 'postit added'
//             }))

//     }, res)
// })

// router.get('/users/:id/postits', [bearerTokenParser, jwtVerifier], (req, res) => {
//     routeHandler(() => {
//         const { sub, params: { id } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.listPostits(id)
//             .then(postits => res.json({
//                 data: postits
//             }))
//     }, res)
// })

// router.put('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { sub, params: { id, postitId }, body: { text } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.modifyPostit(id, postitId, text)
//             .then(() => res.json({
//                 message: 'postit modified'
//             }))
//     }, res)
// })

// router.delete('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { sub, params: { id, postitId } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.removePostit(id, postitId)
//             .then(() => res.json({
//                 message: 'postit removed'
//             }))
//     }, res)
// })

// router.patch('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { sub, params: { id, postitId }, body: { status } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.movePostit(id, postitId, status)
//             .then(() => res.json({
//                 message: 'postit moved'
//             }))
//     }, res)
// })

// router.patch('/users/:id/postits/:postitId/collaborator', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { sub, params: { id, postitId }, body: { collaboratorId } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.assignPostit(id, postitId, collaboratorId)
//             .then(() => res.json({
//                 message: 'postit assigned'
//             }))
//     }, res)
// })

module.exports = router