const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User } = require("../models")

const adminCheck = async (req, res, next) => {
  const { admin_username, admin_password } = req.body
  if (admin_username != "admin") {
    return res.status(401).end("No permission")
  }

  const user = await User.findOne({
    where: {
      username: admin_username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(admin_password, user.passwordhash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "No permission"
    })
  }

  next()
}

router.get("/", adminCheck, async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post("/", adminCheck, async (req, res) => {
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

router.get('/:id', adminCheck, userFinder, async (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(404).end()
  }
})


router.delete("/:id", adminCheck, userFinder, async (req, res) => {
  if (req.user) {
    await req.user.destroy()
  }
  res.status(204).end()
})

module.exports = router