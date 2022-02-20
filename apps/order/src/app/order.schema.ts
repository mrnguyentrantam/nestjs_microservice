import * as mongoose from "mongoose";
import { IOrderDocument } from "./interfaces/order.interface";

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, "Status can not be empty"],
    },
    user_id: {
      type: String,
      required: [true, "User can not be empty"],
    },
    cart: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  }
);

OrderSchema.pre("validate", function (next) {
  const self = this as IOrderDocument;

  if (this.isModified("user_id") && self.created_at) {
    this.invalidate("user_id", "The field value can not be updated");
  }
  next();
});
