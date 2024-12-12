const Listing = require('../model/listing.js');
const Review = require('../model/review.js');

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview); // Push review ID

  await newReview.save();
  await listing.save();
  req.flash('success', 'new review created!');

  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'review successfully deleted!');
  res.redirect(`/listings/${id}`);
};