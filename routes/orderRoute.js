import express from 'express';
import Fund from '../models/fundModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const funds = await Fund.find({}).populate('user');
  res.send(funds);
});
router.get("/mine", isAuth, async (req, res) => {
  const funds = await Fund.find({ user: req.user._id });
  res.send(funds);
});

router.get("/:id", isAuth, async (req, res) => {
  const fund = await Fund.findOne({ _id: req.params.id });
  if (fund) {
    res.send(fund);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const fund = await Fund.findOne({ _id: req.params.id });
  if (fund) {
    const deletedFund = await fund.remove();
    res.send(deletedFund);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => {
  const newFund = new Fund({
    orderItems: req.body.orderItems,
    user: req.user._id,
    payment: req.body.payment,
    itemsFund: req.body.itemsFund,
    taxFund: req.body.taxFund,
    shippingFund: req.body.shippingFund,
    totalFund: req.body.totalPrice,
  });
  const newFundCreated = await newFund.save();
  res.status(201).send({ message: "New Fund Created", data: newFundCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const fund = await Fund.findById(req.params.id);
  if (fund) {
    fund.isPaid = true;
    fund.paidAt = Date.now();
    fund.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        fundID: req.body.fundID,
        paymentID: req.body.paymentID
      }
    }
    const updatedFund = await order.save();
    res.send({ message: 'Fund Paid.', fund: updatedFund });
  } else {
    res.status(404).send({ message: 'Fund Raiser not found.' })
  }
});

export default router;