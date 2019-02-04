---
title: "Offer Earning Mechanisms"
layout: "tutorial"
---

# API Reference

Earning Mechanisms are exposed via an API resource called [Earning Mechanisms](/api/#earning-mechanisms).

# What is an Earning Mechanism?

An Earning Mechanism is an offer component that describes the desired type of behavior a membership should exhibit, and the award that they receive after exhibiting that behavior. An offer must have one earning mechanism configured. An Earning Mechanism directly supports the change in behavior being driven by a marketing initiative; An Earning Mechanism may be Transaction-based (e.g., the purchase of a specific product), or behavior-based (e.g., filling out a survey). A single earning mechanism should be selected that matches most closely the behavior that the marketing initiative is meant to drive. To ease selection, this guide divides the available mechanisms by their high-level goal [below](#what-earning-mechanisms-are-available).

Certain Earning Mechanisms have more than award that may be selected; for example the [External Fulfillment](#external-fulfillment) may be configured to award points, or to provide no award (if the offer is incentivized outside of Hatch, e.g,. an immediate discount at the point of sale). The award types available to each earning mechanism are listed with their configuration below.

# How are Earning Mechanisms configured?

Earning Mechanisms may be configured for an offer via the [Create Earning Mechanism api](/api/#create-earning-mechanism). The payload for creating an Earning Mechanism follows the general JSON-API structure (below), with the following note: when selecting a particular type of earning mechanism for creation, the `earning_mechanism_type` attribute indicates which earning mechanism is selected. This dictates which attributes should be included in the `configuration` attribute, as well as in the `award` attribute, in order to correctly configure the particular earning mechanism.

**General Create Earning Mechanism API structure**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "__Indicates the type of Earning Mechanism being configured.__",
      "configuration": {
        // A hash of configuration values. The structure of this hash changes depending on the earning mechanism type selected.
      },
      "award": {
        "award_type": "__Indicates the type of Award being configured for this Earning Mechanism",
        "configuration": {
      	  // A hash of award values. The structure of this hash changes depending on the award type selected.
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "__ID of the offer that the Earning Mechanism is associated with.__"
        }
      }
    }
  }
}
```

# What Earning Mechanisms are available?

## Transacation-Based
### Encourage Program Participation

1.  [Total Eligible Purchase](#total-eligible-purchase)
1.  [Total Spend on Transaction](#total-spend-on-transaction)

### Save Up & Come Back

1.  [Total Eligible Purchase Over Time](#total-eligible-purchase-over-time)
1.  [Total Spend Over Time](#total-spend-over-time)

### Brand-Specific Purchase

1.  [Product Purchase](#product-purchase)

### Add-on or Upsell

1.  [Variety Purchase](#variety-purchase)

### Try Many Products

1.  [Variety Purchase Over Time](#variety-purchase-over-time)

### Point-of-Sale Verified

1.  [External Fulfillment](#external-fulfillment)

## Behavior-Based

1.  [Loyalty Event](#loyalty-event)
1.  [Membership Event](#membership-event)
1.  [Visits](#visits)

---

### External Fulfillment

External Fulfillment supports offers for which the program owner (rather than the Hatch platform itself) is responsible for determining whether or not the offer has been fulfilled. This is typically accomplished by a point of sale executing its own basket analysis to determine whether the membership has purchased the appropriate products. An offer configured with External Fulfillment will be considered fulfilled in Hatch when its corresponding `id` is sent in the `fulfilled_offer_ids` array attribute of a [Transaction](/api#transactions).

#### Examples

1.  To incentivize a membership to donate to a local charity, a "quarter drop game" is set up on the counter such that a membership wins 100 points if they hit the target.
1.  To incentivize the purchase of a doughnut with coffee, an immediate discount of $0.50 is given if both products are purchased together.

**earning_mechanism_type**: `external_fulfillment`

**configuration**: External Fulfillment requires no configuration

**awards**: `point_award`, `null`

**Example full payload (Point Award)**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "external_fulfillment",
      "configuration": null,
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 100
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

**Example full payload (Null Award)**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "external_fulfillment",
      "configuration": null,
      "award": {
        "award_type": "null",
        "configuration": null
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

---

### Loyalty Event

Loyalty Event supports offers which are not linked to transactional behaviors of memberships, and allow for any number of membership behaviors to be incentivized. An offer configured with a Loyalty Event earning mechanism will be considered fulfilled in Hatch when a payload containing the `membership_id` and the matching `event_type` is sent to the [Loyalty Event](/api#loyalty-events) endpoint, for example:

```json
{
  "data": {
    "type": "loyalty_events",
    "attributes": {
      "chain_id": "4107a548-8e64-4514-a69e-98ca13d7f5f0",
      "event_type": "social-post",
      "event_data": {
        "membership_id": "9e5281cd-604a-4d9d-9fca-ab7012f12492"
      },
    },
  }
}
```

Points for the Loyalty Event may be set statically (50 points for "sharing" a post on social media), or determined upon fulfillment of the Loyalty Event when it is created via the [Create Loyalty Event](/api#create-loyalty-event) api endpoint. To configure points use the `point_award` award type; to determine them upon fulfillment use the `external_point_award` award type. When using `external_point_award`, the number of points to award must be included in the Loyalty Event payload:

```json
{
  "data": {
    "type": "loyalty_events",
    "attributes": {
      "chain_id": "4107a548-8e64-4514-a69e-98ca13d7f5f0",
      "event_type": "social-post",
      "event_data": {
        "membership_id": "9e5281cd-604a-4d9d-9fca-ab7012f12492",
        "action": {
          "add_points": 100 // Indicates that 100 points should be added for the Membership
        }
      },
    },
  }
}
```

#### Examples

1.  To incentivize a membership to complete their fill out a survey in a mobile application they are given 100 points per question answered.
1.  To incentivize a membership to visit a new store location. They are awarded 100 points once they "check-in."
1.  To incentivize a membership to interact with the program's mobile application each day, they are granted a chance to win a variable number of points upon opening it.

**earning_mechanism_type**: `loyalty_event`

**configuration**:

```json
{
  "event_type": "filled-out-survey" // Any string; matches the `event_type` that will be sent to the Loyalty Event api endpoint
}
```

**awards**: `point_award`, `external_point_award`

**Example full payload (Point Award)**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "loyalty_event",
      "configuration": {
        "event_type": "filled-out-survey"
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 100
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

**Example full payload (External Point Award)**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "loyalty_event",
      "configuration": {
        "event_type": "filled-out-survey"
      },
      "award": {
        "award_type": "external_point_award",
        "configuration": null
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Membership Event

Like Loyalty Event, Membership Event supports offers which are not linked to transactional behaviors of memberships. Whereas the fulfillment of a Loyalty Event is triggered by a client explicitly calling the [Create Loyalty Event](/api#create-loyalty-event) api, Membership Events are initiated internally by Hatch and relate to actions or lifecycle events of a particular membership. Currently there are three event types supported:

1.  **`birthday`**: Triggers the award on the membership's birthday.
1.  **`created`**: Triggers the award when a new membership is created.
1.  **`confirmed`**:  Triggers the award when a membership is [updated](/api/#update-membership) to the `confirmed` state.

#### Examples

1.  In order to "surprise and delight" a membership, they're granted 200 points on their birthday.
1.  A new membership is given 100 points in order to encourage them to become familiar with the marketing program's mobile application, and encourage them to redeem a reward and visit the store.
1.  A membership is incentivized to confirm their mobile number by receiving 500 points.

**earning_mechanism_type**: `membership_event`

**configuration**:

```json
{
  "event_type": "birthday" // A string, must be one of "birthday", "confirmed", or "created".
}
```

**awards**: `point_award`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "membership_event",
      "configuration": {
        "event_type": "created"
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 100
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Product Purchase

Product Purchase supports offers that influence a consumer to buy a particular product, often due to a brand partnership that the marketing program has entered in to. Eligible products are specified via the `eligible_product_groups` field which consists of an array of IDs of [Product Groups](/guides/product-groups) that have been previously created. Products are counted either by the quantity that was purchased, or the total dollars spend on qualifying items, and awards can be made for each individual item or arbitrary groups of items purchased.

#### Examples

1.  A Brand is willing to fund an offer to grant 500 points per Blue Drink Plus that a membership purchases
1.  Stores now carry a new flavor of coffee and related products and would like to offer 300 points if a membership purchases at least $10 of qualifying drip-coffee, ground-coffee, and creamer.
1.  A Brand would like to increase the purchase quantity of a popular product, and offers 250 points each time a membership purchases 3 within a single Transaction.

**earning_mechanism_type**: `product_purchase`

**configuration**:

```json
{
    "count_products_by": "quantity", // Must be `quantity` or `money_amount`
    "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups)
    "purchase_threshold": 1 // Indicates the unit quantity or dollar-spend required to trigger the award
}
```

**awards**: `point_award`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "product_purchase",
      "configuration": {
        "purchase_threshold": 5,
        "count_products_by": "money_amount",
        "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"]
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 125
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```


### Total Eligible Purchase

Sometimes called a "Base Earn", Total Eligible Purchase supports offers that help keep a loyalty program top-of-mind for memberships by ensuring that they earn some amount of points each time they transact. Total Eligible Purchase assumes there are a few very commonly purchased items, and provides a small award any time a membership purchases one of those. The qualifying purchases are totaled either by quantity or dollars spent. The total may be rounded (either "down", or "half_up"), or left as-is. This total is then multiplied by the number of points specified in the award; this total may also be rounded "down" or "half_up".

The following table details how each type of rounding may affect the award, consider an offer that awards **10** points per gallon of gas purchased, and a membership who purchases **5.85** gallons of gas.

|                    | **quantity raw**  | **quantity down** | **quantity half_up** |
| ------------------ | ----------------- | ----------------- | -------------------- |
| **points down**    | 58 points         | 50 points         | 60 points            |
| **points half_up** | 59 points         | 50 points         | 60 points            |


#### Examples

1.  At a gas station, memberships earn points for every gallon of fuel that they purchase
1.  At a coffee shop, memberships earn points on every dollar spent on bags of coffee beans

**earning_mechanism_type**: `total_eligible_purchase`

**configuration**:

```json
{
  "count_products_by": "quantity", // Must be `quantity` or `money_amount`
  "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups)
  "round_counted_products": "half_up" // Must be "raw", "half_up", or "down"
}
```

**awards**: `points_per`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "total_eligible_purchase",
      "configuration": {
        "count_products_by": "quantity",
        "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"],
        "round_counted_products": "down"
      },
      "award": {
        "award_type": "points_per",
        "configuration": {
          "points": 2,
          "rounding": "down"
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Total Eligible Purchase Over Time

Total Eligible Purchase Over Time supports offers which give memberships a "goal" to attain. It encourages repeated visits for a specific product in order to "save up" and reach a specified threshold. As the name suggests, the membership need not purchase enough products to satisfy the offer in a single transaction; instead, they have the lifetime of the offer in which to reach the configured threshold.

#### Examples

1.  In order to get memberships to switch to premium fuel, 400 points points are offered once a total of 40 gallons have been purchased.
1.  In order to clear stock of frozen slushie drink stock before summer ends, a membership is awarded the "Slushie King" when they purchase 40 frozen drinks.

**earning_mechanism_type**: `total_eligible_purchase_over_time`

**configuration**:

```json
{
  "count_products_by": "quantity", // Must be `quantity` or `money_amount`
  "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups)
  "accumulation_threshold": 40 // The quantity or total dollars that must be accumulated before receiving the award
}
```

**awards**: `point_award`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "total_eligible_purchase_over_time",
      "configuration": {
        "count_products_by": "quantity",
        "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"],
        "accumulation_threshold": 40
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 2,
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Total Spend on Transaction

Sometimes called a "Base Earn", Total Spend on Transaction supports offers that help keep a loyalty program top-of-mind for a membership by ensuring that they earn some amount of points each time they transact. Total Spend on Transaction assumes that almost every purchase -- except for a small set of ineligible products -- should earn points, and awards points based on the number of dollars spent. The total spend may be rounded (either "down", or "half_up"), or left as-is. This total is then multiplied by the number of points specified in the award; this total may also be rounded "down" or "half_up".

The following table details how each type of rounding may affect the award, consider an offer that awards **10** points per dollar spent, and a membership who spends $**5.85**.

|                    | **spend raw**  | **spend down** | **spend half_up** |
| ------------------ | -------------- | -------------- | ----------------- |
| **points down**    | 58 points      | 50 points      | 60 points         |
| **points half_up** | 59 points      | 50 points      | 60 points         |

#### Examples

1.  Members earn points for dollar spent, except for on alcohol, tobacco or lottery products

**earning_mechanism_type**: `total_spend_on_transaction`

**configuration**:

```json
{
  "ineligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups) that are excluded from the total count
  "round_money_amount": "half_up" // Must be "raw", "half_up", or "down"
}
```

**awards**: `points_per`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "total_eligible_purchase",
      "configuration": {
        "ineligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"],
        "round_money_amount": "down"
      },
      "award": {
        "award_type": "points_per",
        "configuration": {
          "points": 2,
          "rounding": "down"
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Total Spend Over Time

Total Spend Over Time supports offers which gives the memberships a "goal" to attain. It encourages repeated visits in order to "save up" and reach a specified spend threshold. As the name suggests, the membership need not spend to satisfy the offer in a single transaction; instead, they have the lifetime of the offer in which to reach the configured threshold. Total Spend Over Time differs from [Total Eligible Purchase Over Time](#total-eligible-purchase-over-time) by allowing memberships to accumulate dollars spent on almost every product purchased -- with a small set of configured exclusions.

#### Examples

1.  In order to incentivize memberships to purchase merchandise in-store, a convenience store offers 200 points for every $50 spent on merchandise

**earning_mechanism_type**: `total_spend_over_time`

**configuration**:

```json
{
  "ineligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups) that are excluded from the total count
  "accumulation_threshold": 40 // The quantity or total dollars that must be accumulated before receiving the award
}
```

**awards**: `point_award`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "total_spend_over_time",
      "configuration": {
        "ineligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"],
        "accumulation_threshold": 40
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 2,
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Variety Purchase

Variety Purchase supports offers that incentivize the purchase of products that a membership may not usually purchase -- along with those that are often purchased. This Earning Mechanism is configured similarly to the [Product Purchase](#product-purchase) Earning Mechanism, except that an array of products may be specified to be purchased together.

#### Examples

1.  Memberships often buy coffee but rarely buy doughnuts. An offer is published to award 150 points if both coffee _and_ doughnuts are purchased.
1.  The Beef Jerky company has released three new flavors and would like to fund an offer that encourages a membership to purchase all three in one Transaction.

**earning_mechanism_type**: `variety_purchase`

**configuration**:

```json
{
  "products": [
    {
      "count_products_by": "quantity", // Must be `quantity` or `money_amount`
      "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups)
      "purchase_threshold": 1 // Indicates the unit quantity or dollar-spend required to trigger the award
    },
    {
      "count_products_by": "quantity", // Must be `quantity` or `money_amount`
      "eligible_product_groups": ["7e24147b-9633-42fe-b6f3-1ffcf9ad3a31"], // An array of previously-created [Product Groups](/guides/product-groups)
      "purchase_threshold": 2 // Indicates the unit quantity or dollar-spend required to trigger the award
    }
  ]
}
```

**awards**: `point_award`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "variety_purchase",
      "configuration": {
        "products": [
          {
            "count_products_by": "quantity",
            "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"],
            "purchase_threshold": 1
          },
          {
            "count_products_by": "quantity",
            "eligible_product_groups": ["7e24147b-9633-42fe-b6f3-1ffcf9ad3a31"],
            "purchase_threshold": 2
          }
        ]
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 2,
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Variety Purchase Over Time

Variety Purchase Over Time supports offers which give memberships a "goal" to attain, where the goal is to try many different products. As the name suggests, the membership need not spend to purchase every product in a single transaction; instead, they have the lifetime of the offer in which to reach the buy everything.

#### Examples

1.  A bakery would like customers to try more of their products and offers 100 points if someone buys 1 coffee, 1 hot chocolate, and 1 pastry over the course of a week.
1.  A sports drink company has release ten new flavors of an after-workout drink, and would like customers to try all of them. The title of "workout paragon" is awarded to a membership that purchases all of them over the course of a month.

**earning_mechanism_type**: `variety_purchase_over_time`

**configuration**:

```json
{
  "products": [
    {
      "count_products_by": "quantity", // Must be `quantity` or `money_amount`
      "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups)
      "purchase_threshold": 1 // Indicates the unit quantity or dollar-spend required to trigger the award
    },
    {
      "count_products_by": "quantity", // Must be `quantity` or `money_amount`
      "eligible_product_groups": ["7e24147b-9633-42fe-b6f3-1ffcf9ad3a31"], // An array of previously-created [Product Groups](/guides/product-groups)
      "purchase_threshold": 2 // Indicates the unit quantity or dollar-spend required to trigger the award
    }
  ]
}
```

**awards**: `point_award`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "variety_purchase_over_time",
      "configuration": {
        "products": [
          {
            "count_products_by": "quantity",
            "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"],
            "purchase_threshold": 1
          },
          {
            "count_products_by": "quantity",
            "eligible_product_groups": ["7e24147b-9633-42fe-b6f3-1ffcf9ad3a31"],
            "purchase_threshold": 2
          }
        ]
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 25,
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```

### Visits

Visits supports an offer to encourage a membership to visit regularly and make purchases frequently. A "visit" is counted as the total number of transactions that occur after the offer is published.

#### Examples

1.  As a way to increasingly incentivize frequency, three offers are set up:  100 points after 5 visits, 500 points after 10 visits, 1000 points after 15 visits.

**earning_mechanism_type**: `visits`

**configuration**:

```json
{
  "visit_threshold": 10 // Must be a positive integer
}
```

**awards**: `point_award`

**Example full payload**

```json
{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "visits",
      "configuration": {
        "visit_threshold": 10
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 250,
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this offer has been previously created.
        }
      }
    }
  }
}
```
