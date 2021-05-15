var express = require('express');
var router = express.Router();
var debug = require('debug')('admin')

const { v4: uuidv4 } = require('uuid')

// usage:  GET '/users'
//
// Returns: 
//    { users: <list of users }
router.get(
  "/users",
  ah(async (req, res) => {
    var users = await db.User.findAll()

    debug('users: ' + JSON.stringify(users))
    return res.send({users: users})
  })
);

// usage:  GET '/referrals'
//
// Returns: 
//    { referrals: <list of referral tokens> }
router.get(
  "/referrals",
  ah(async (req, res) => {
    var referrals = await db.Referral.findAll()

    debug('referrals: ' + JSON.stringify(referrals))
    return res.send({referrals: referrals})
  })
);

// usage:  GET '/accounts'
//
// Returns: 
//    { referrals: <list of referral tokens> }
router.get(
  "/accounts",
  ah(async (req, res) => {
    var accounts = await db.Accounts.findAll({
      include: [ db.User ]
    })

    debug('accounts: ' + JSON.stringify(accounts))
    return res.send({accounts: accounts})
  })
);

// usage:  GET '/user/transactions'
//
// Returns: 
//    { users: [
//         <user attributes>, 
//         Invoices: 
//           <invoice attributes>, 
//         Payments: 
//           <invoice attributes>, 
//         Orders: 
//           <invoice attributes>, 
//       ], ...
//    }
router.get(
  "/user_transactions",
  ah(async (req, res) => {
    var transactions = await db.User.findAll({
      include: [ db.Invoice, db.Payment, db.Order ]
    })

    debug('transactions: ' + JSON.stringify(transactions))
    return res.send({transactions: transactions})
  })
);

module.exports = router;