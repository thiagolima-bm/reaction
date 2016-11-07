import { Meteor } from "meteor/meteor";
import { Match, check} from "meteor/check";
import { Counts } from "meteor/tmeasday:publish-counts";
import { Discounts} from "/imports/plugins/core/discounts/lib/collections";
import { Reaction } from "/server/api";

//
// Security
// import "/server/security/collections";
// Security definitions
//
Security.permit(["read", "insert", "update", "remove"]).collections([
  Discounts
]).ifHasRole({
  role: "discount-rates",
  group: Reaction.getShopId()
});

/**
 * Discounts
 * @type {Publication}
 * @param {Object} query
 * @param {Object} options
 */
Meteor.publish("DiscountRates", function (query, options) {
  check(query, Match.Optional(Object));
  check(options, Match.Optional(Object));

  // check shopId
  const shopId = Reaction.getShopId();
  if (!shopId) {
    return this.ready();
  }

  const select = query || {};
  // append shopId to query
  select.shopId = shopId;

  if (!select.discountMethod) {
    select.discountMethod = "rate";
  }

  // appends a count to the collection
  // we're doing this for use with griddleTable
  Counts.publish(this, "discount-rates-count", Discounts.find(
    select,
    options
  ));

  return Discounts.find(
    select,
    options
  );
});
