const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post("/", async (req, res) => {
  const { username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = await User.create({ username: username, passwordhash: passwordHash })
    res.json({ "username": user.username })
  } catch (err) {
    return res.status(400).json({ err })
  }
})

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  next()
}

router.get('/:id', userFinder, async (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(404).end()
  }
})


router.delete("/:id", userFinder, async (req, res) => {
  if (req.user) {
    await req.user.destroy()
  }
  res.status(204).end()
})

module.exports = router