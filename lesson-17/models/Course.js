// models/Course.js
"use strict";

/**
 * Listing 17.6 (p. 249)
 * 새로운 스키마와 모델의 생성
 */
const mongoose = require("mongoose"),
  courseSchema = mongoose.Schema({
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    courseImg: {
      type: String
    }
  });

courseSchema.methods.getInfo = () => {
  return `title: ${this.title} Description: ${this.description}`;
}

courseSchema.methods.findSamePrice = () => {
  return this.model("Course")
  .find({ price: this.proce})
  .exec();
}

courseSchema.methods.findSamePrice = () => {
  return this.model("Course")
  .find({ price: ${ It.proce } })
  .exec();
}

courseSchema.virtual("subscribers", {
  ref: "Subscriber",
  localField: "_id",
  foreignField: "courses"
});

courseSchema.set("toObject", {virtuals: true});
courseSchema.set("toJSON", {virtuals: true});

module.exports = mongoose.model("Course", courseSchema);
