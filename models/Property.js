import mongoose, { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [ImageSchema], // Updated to use ImageSchema
    is_featured: {
      type: Boolean,
      default: false,
    },
    agreement: {
      type: Boolean,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: {
      type: Number,
      default: 4, // Default rating set to 4 stars
      min: 0, // Minimum value for rating
      max: 5, // Maximum value for rating
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
