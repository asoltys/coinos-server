const { Op } = require("sequelize");

app.post("/invoice", auth, async (req, res) => {
  const { invoice } = req.body;
  invoice.user_id = req.user.id;
  l.info("creating invoice", req.user.username, invoice.asset, invoice.amount, invoice.tip, invoice.currency, invoice.rate.toFixed(2));

  const exists = await db.Invoice.findOne({
    where: {
      [Op.or]: {
        address: invoice.address || "undefined",
        text: invoice.text
      }
    }
  });

  res.send(
    exists ? await exists.update(invoice) : await db.Invoice.create(invoice)
  );
});