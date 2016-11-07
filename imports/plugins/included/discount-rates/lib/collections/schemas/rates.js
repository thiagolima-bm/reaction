import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Discounts } from "/imports/plugins/core/discounts/lib/collections/schemas";

/**
* Discount Codes Schema
* @type {Object}
* @desc schema that extends discount schema
* with properties for discount codes.
*/
export const DiscountRates = new SimpleSchema([
  Discounts, {
    discountMethod: {
      label: "Calculation Method",
      type: String,
      allowedValues: ["percent", "shipping", "rate"],
      defaultValue: "rate"
    }
  }
]);
