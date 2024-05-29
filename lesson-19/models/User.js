"use strict";

const Subscriber = require("./Subscriber");

/**
 * Listing 18.1 (p. 259)
 * user.js에서 사용자 모델 생성
 */

/**
 * 노트: Mongoose Schema 객체에서 객체 소멸(object destruct)의 사용에 주목하자.
 * {Schema}는 Mongoose의 Schema 객체를 동일한 이름의 상수로 할당한다. 나중에 이
 * 새로운 형식을 다른 모델에 적용할 것이다.
 */
const mongoose = require("mongoose"),
  { Schema } = mongoose;

const userSchema = new Schema(
  // 사용자 스키마 생성
  {
    name: {
      // name 속성에 이름(first)과 성(last) 추가
      first: {
        type: String,
        trim: true,
      },
      last: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    }, // 비밀번호 속성 추가
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // 사용자와 강좌를 연결 시켜주기 위한 강좌 속성 추가
    subscribedAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriber", // subscribedAccount를 사용자와 구독자를 연결하기 위해 추가
    },
    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true, // timestamps 속성을 추가해 createdAt 및 updatedAt 시간 기록
  }
);

/**
 * Listing 18.2 (p. 260)
 * 사용자 모델에 가상 속성 추가
 */
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
}); // 사용자의 풀 네임을 얻기 위한 가상 속성 추가

/**
 * Listing 19.4 (p. 281)
 * user.js에 pre("save") 훅 추가
 */
userSchema.pre("save", function (next) { // 화살표 함수가 아닌 일반 함수를 사용합니다.
  let user = this;
  if (user.subscribedAccount == undefined) {
    Subscriber.findOne({
      email: user.email
    })
    .then(subscriber => { // 잘못된 구문을 수정합니다.
      user.subscribedAccount = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error in connecting subscriber: ${error.message}`);
      next(error);
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);

/**
 * 노트: 이 책을 쓰는 시점에는 Mongoose 훅에서 화살표 함수는 작동하지 않는다.
 */
