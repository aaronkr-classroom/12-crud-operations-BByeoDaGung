"use strict";

/**
 * Listing 12.5 (p. 178)
 * 홈 컨트롤러로의 라우팅
 */

// 특정 라우트를 위한 콜백 함수 추가
exports.showHome = (req, res) => {
  res.render("index");
};

exports.showTransportation = (req, res) => {
  res.render("transportation");
};
