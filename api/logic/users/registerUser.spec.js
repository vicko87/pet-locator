import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'
const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('María López', 'maria.lopez@example.com', '123123123', '123123123')

        const user = await User.findOne({
            email: 'maria.lopez@example.com'
        })

        expect(user).to.exist
        expect(user.name).to.equal('María López')
        expect(user.email).to.equal('maria.lopez@example.com')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
    })


    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'María López', email: 'maria.lopez@example.com', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('María López', 'maria.lopez@example.com', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})