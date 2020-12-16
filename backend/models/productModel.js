import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // user field adds a relationship between review and user
  },
  { timestamps: true }
)

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // user field adds a relationship between product and user
    name: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)
// we can use a second argument with mongoose and use timestamps which will update automatically

const Product = mongoose.model('Product', productSchema)
// we then give mongoose a new model with the schema and then export it

export default Product
