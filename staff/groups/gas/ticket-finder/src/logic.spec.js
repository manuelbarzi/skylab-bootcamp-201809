//import logic from './logic'

require('isomorphic-fetch')

global.sessionStorage = require('sessionstorage')

const logic = require('./logic')

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {

    describe('users', () => {

        describe('register', () => {

            false && it('should succeed on correct data', () =>

                logic.registerUser('John', 'doe@gmail.com', `jd-${Math.random()}`, '123', '123')

                    .then(() => expect(true).to.be.true)

            )

            false && it('should fail on trying to register twice same user', () => {

                const username = `jd-${Math.random()}`

                return logic.registerUser('John', 'doe@gmail.com', username, '123', '123')

                    .then(() => logic.registerUser('John', 'doe@gmail.com', username, '123', '123'))

                    .catch(err => {

                        expect(err).not.to.be.undefined

                        expect(err.message).to.equal(`user with username "${username}" already exists`)
                    })
            })

            false && it('should fail on undefined name', () => {

                expect(() =>

                    logic.registerUser(undefined, 'doe@gmail.com', 'jd', '123', '123')

                ).to.throw(TypeError, 'undefined is not a string')
            })

            false && it('should fail on different passwords', () => {

                return logic.registerUser('John', 'doe@gmail.com', `jd-${Math.random()}`, '123', '123')
                
                    .catch(err => {

                        expect(err).not.to.be.undefined

                        expect(err.message).to.equal(`passwords do not match`)
                    })
            })

            // TODO other cases
        })

        describe('login', () => {

            describe('with existing user', () => {

                let username, password

                beforeEach(() => {

                    const name = 'John', email = 'doe@gmail.com'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    return logic.registerUser(name, email, username, password, password)
                })

                false && it('should succeed on correct data', () =>
                    logic.login(username, password)
                        .then(() => expect(true).to.be.true)
                )

                false && it('should fail on wrong username', () => {
                    username = `dummy-${Math.random()}`

                    return logic.login(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal(`user with username "${username}" does not exist`)
                        })
                })

                false && it('should fail on wrong password', () => {
                    password = 'pepito'

                    return logic.login(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal('username and/or password wrong')
                        })
                })
            })

            false && it('should fail on undefined username', () => {
                const username = undefined

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            false && it('should fail on boolean username', () => {
                const username = true

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            false && it('should fail on numeric username', () => {
                const username = 123

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            // TODO other cases
        })
    })

    describe('API requests', () => {

        describe('show events for carousel', () => {
            let query

            beforeEach(() => {

                query = 'Metallica'

            })

            it('should return an array of objects with events', () => {
                logic.searchEvents(query)
                    .then(res => {
                        expect(res).not.to.be.undefined
                        expect(res.length).to.be.above(0)
                    })
            })

            it('should fail on undefined query', () => {
                query = undefined
                expect(() =>
                    logic.searchEvents(query)
                ).to.throw(Error, `${query} is not a valid query`)
            })

            it('should fail on numeric query', () => {
                query = 34
                expect(() =>
                    logic.searchEvents(query)
                ).to.throw(Error, `${query} is not a valid query`)
            })

            it('should fail on boolean query', () => {
                query = true
                expect(() =>
                    logic.searchEvents(query)
                ).to.throw(Error, `${query} is not a valid query`)
            })

            it('should fail on blank query', () => {
                query = '    '
                expect(() =>
                    logic.searchEvents(query)
                ).to.throw(Error, `input text is blank`)
            })



            it('should fail with an incorrect url of objects with events', () => {

                return logic.showEvents()
                    .then(res => {
                        expect(res).not.to.be.undefined
                        expect(res.length).to.be.above(0)
                    })
            })
        })

        describe('search info by id', () => {
            it('should succeed on correct id', () => {
                const id = 'vvG1fZ411N-A7B'
                return logic.searchEventInfo(id)
                    .then(() => expect(true).to.be.true)
            })

            it('should fail on undefined id', () => {
                const id = undefined
                expect(() =>
                    logic.searchEventInfo(id)
                ).to.throw(Error, `${id} is not a valid id`)
            })

            it('should fail on empty or blank id', () => {
                const id = '\n   \t'
                expect(() => logic.searchEventInfo(id)
                ).to.throw(Error, 'id is empty or blank')
            })

            it('should fail on incorrect id', () => {
                const id = 'n9821dahkj182'
                return logic.searchEventInfo(id)
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`${id} is not a valid id`)
                    })
            })
        })


        describe('retrieve events', () => {
            let query
            beforeEach(() => {
                query = 'Metallica'
            })
            false && it('should return an array of objects with events', () => {
                logic.searchEvents(query)
                    .then(res => {
                        expect(res).not.to.be.undefined
                        expect(res.length).to.be.above(0)
                    })
            })

            false && it('should fail on undefined search', () => {
                logic.searchEvents(query)
                    .then(res => {
                        expect(res).not.to.be.undefined
                        expect(res.length).to.be.above(0)
                    })
            })

            false && it('should fail on undefined query', () => {
                query = undefined
                expect(() =>
                    logic.searchEvents(query)
                ).to.throw(Error, `${query} is not a valid query`)
            })

            false && it('should fail on a blank query', () => {
                query = ''
                expect(() =>
                    logic.searchEvents(query)
                ).to.throw(Error, `${query} is empty`)
            })

            false && it('should fail on a blank query', () => {
                query = '                  '
                expect(() =>
                    logic.searchEvents(query)
                ).to.throw(Error, `${query} is blank`)
            })


        })

        describe('isFavourite function', () => {
            beforeEach(() => {
                const name = 'John', email = 'doe@gmail.com'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`
                repeatPassword = password

                return logic.registerUser(name, email, username, password, repeatPassword)
                    .then(() => logic.login(username, password)
                        .then(() => logic.storeFavourites('vvG1fZ411N-A7B')
                        )
                    )
            })

            it('should succeed if a event is in your favourite list', () =>
                logic.isFavourite('vvG1fZ411N-A7B')
                    .then((res) => expect(res).to.be.true)

            )

            it('should fail if a event is not in your favourite list', () =>
                logic.isFavourite('KovZpZAEdJaA')
                    .then((res) => expect(res).to.be.false)

            )

            it('should fail on non string id(boolean)', () => {
                let id = true
                           
                    expect(() => logic.isFavourite(id))
                        .to.throw(Error, `${id} is not a string`)
            })

            it('should fail on non string id(number)', () => {
                let id = 13
                            
                    expect(() => logic.isFavourite(id))
                        .to.throw(Error, `${id} is not a string`)
            })

            it('should fail on non string id(array)', () => {
                let id = []
                            
                    expect(() => logic.isFavourite(id))
                        .to.throw(Error, ` is not a string`)
            })

            it('should fail on non string id(undefined)', () => {
                let id = undefined
                            
                    expect(() => logic.isFavourite(id))
                        .to.throw(Error, `${id} is not a string`)
            })

            it('should fail on non string id(object)', () => {
                let id = {}
                            
                    expect(() => logic.isFavourite(id))
                        .to.throw(Error, `[object Object] is not a string`)
            })

        })

        describe('delete favourites from user array', () => {
            describe('with existing user', () => {
                let username, password, itemId

                beforeEach(() => {
                    const name = 'John', email = 'doe@gmail.com'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`
                    repeatPassword = password



                    return logic.registerUser(name, email, username, password, repeatPassword)
                        .then(() => logic.login(username, password))
                        .then(() => logic.storeFavourites('KovZpZAEdJaA'))

                })

                describe('with existing postit', () => {

                    false && it('should succeed on deleting existing item', () =>
                        logic.deleteFavourite('KovZpZAEdJaA')
                            .then(() => expect(true).to.be.true)
                            .then(() => expect(logic._favouritesEventsArray).to.be.empty)
                    )
                    //     it('should fail on ', () =>
                    //     logic.deleteFavourite('KovZpZAEdJaA')
                    //         .then(() => expect(true).to.be.true)
                    //         .then(() => expect(logic._favouritesEventsArray).to.be.empty)
                    // )
                })
            })
        })

        describe('retrieve favourites from user', () => {
            let username, password

            beforeEach(() => {
                const name = 'John', email = 'doe@gmail.com'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`
                repeatPassword = password

                return logic.registerUser(name, email, username, password, repeatPassword)
                    .then(() => logic.login(username, password)
                        .then(() => logic.storeFavourites('vvG1fZ411N-A7B')
                        )
                    )
            })

             false && it('should succeed on retrieving favourites', () => {
                return logic.retrieveFavouriteEvents()
                    .then(() => expect(true).to.be.true)
            })

             it('should return correct amount of events', () => {
                 
                return logic.retrieveFavouriteEvents()
                    .then(res =>{ 
                       
                        expect(res.length).to.equal(1)}) 
            })

            it('should return no favourites when empty', () => {
                 
                return logic.deleteFavourite('vvG1fZ411N-A7B')
                    .then(logic.retrieveFavouriteEvents()
                        .then(expect(true).to.be.true)
                    .then(res => {
                        expect(res.length).to.equal(0)})) //REVIEW
            })

        })


        describe('Store events in favourites', () => {
            describe('with existing user', () => {
                let username, password, item
                beforeEach(() => {
                    const name = 'John', email = 'doe@gmail.com'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`
                    repeatPassword = password


                    return logic.registerUser(name, email, username, password, repeatPassword)
                        .then(() => logic.login(username, password)
                        )
                })
                 false && it('should succeed on adding event to favourites', () =>
                    logic.storeFavourites('vvG1fZ411N-A7B')
                        .then(() => {
                            expect(true).to.be.true
                            expect(logic._favouritesEventsArray).to.not.be.empty
                        })
                )

                false && it('should fail on adding non-existant event to favourites', () =>
                    logic.storeFavourites('asdiufhaisudf')
                        .then(() => expect(true).to.be.true)
                )

                false && it('should fail on undefined id', () => {
                    id = undefined
                    expect(() =>
                        logic.storeFavourites(id)
                    ).to.throw(Error, `${id} is undefined`)
                })

                false && it('should fail on empty id', () => {
                    id = ''
                    expect(() =>
                        logic.storeFavourites(id)
                    ).to.throw(Error, `${id} is empty`)
                })

                false && it('should fail on blank id', () => {
                    id = '         '
                    expect(() =>
                        logic.storeFavourites(id)
                    ).to.throw(Error, `${id} is blank`)
                })

            })
        })

        describe('random events function', () => {

            beforeEach(() => {
                const name = 'John', email = 'doe@gmail.com'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`
                repeatPassword = password

                return logic.registerUser(name, email, username, password, repeatPassword)
                    .then(() => logic.login(username, password)
                        .then(() => logic.storeFavourites('vvG1fZ411N-A7B')
                        )
                    )
            })

            it('should give back 3 elements', () => {   

                let array = logic.randomEvents() 
                expect(array.length).to.equal(3)   
    
            })

        })
    })
})