---
title: "Purchase-based Offer Tutorial"
layout: "tutorial"
---


# Purchase-based Offer Tutorial

Learn how to translate a purchase-based marketing initiative in to an Offer in Hatch.

## Intro

Hatch provides powerful tools to strengthen personal relationships with a loyalty program's Memberhship base. These relationships lead to a beneficial change in consumer behavior: a Membership is engaged with offerings that they are personally interested in, and a brand has the opportunity to market new or specifically useful products. The foundation of the relationship is influenced by what a Membership chooses to purchase, and many types of marketing initiatives are based on the Transactions that a consumer makes.

This tutorial describes how to use Offers in Hatch to execute such marketing initiatives, and will walk through the following set of steps:

1.  [Describe the Marketing Initiative](#step-1-em-describe-the-marketing-initiative-em)
1.  [Create the Offer](#step-2-em-create-the-offer-em)
1.  [Choose a Behavior and an Award](#step-3-em-choose-a-behavior-and-an-award-em)
1.  [Add pre-fulfillment Constraints](#step-4-em-add-pre-fulfillment-constraints-em)
1.  [Describe the target Audience](#step-5-em-describe-the-target-audience-em)
1.  [Add Limits to financial exposure](#step-6-em-add-limits-to-financial-exposure-em)
1.  [Write and upload marketing copy](#step-7-em-write-and-upload-marketing-copy-em)

## Steps

### Step 1: _Describe the Marketing Initiative_

A marketing initiative may be generated internally, e.g., to promote a new feature of your store, or externally via a partnership with a Brand. This tutorial will focus on such a partnership with the fictional brand _Reel Beefy™ Beef Jerky_ who wishes to promote their new product _Fly-Fisher's Flying Jalapeño Nuggets_.

A marketing initiative is a complex system with many factors and it will need to be translated to Hatch in order to reach the loyalty program's member base. It is best to start by describing the initiative, the behavior, constraints, and other factors that will need to be put in place, before beginning. We've done so here:

> Reel Beefy™ would like to promote their new _Fly-Fisher's Flying Jalapeño Nuggets_ (identified by upcs **000011112222**, **000033334444**, **000055556666**, and **000077778888**) within our loyalty program. Using knowledge of our consumers buying habits, we know that the promotion will be most effective when Memberships purchase the product in groups of **3**. To incentivize Memberships to purchase the Jalapeño Nuggets, the loyalty program will award **200 points** per group of 3.
>
> Reel Beefy™ would like consumers to indicate their intent to purchase the product before giving an award; we'll do this by requiring that a Membership **activate** the Offer first. Reel Beefy™ would also like to target the younger generation of fly-fishers, and would like to only show the Offer to Memberships between the **ages of 18-35**.
>
> Finally, Reel Beefy™ is willing to fund **$10,000** worth of awards, and would like to ensure that no single Membership monopolizes the promotion. Given that the loyalty program's point currency is worth one tenth of a cent per point, this means that **50,000** total fulfillments may be funded by Reel Beefy™. Of these, we'll allow each Membership **3** fulfillments.

Now that we've described the marketing initiative in its entirety, we may begin configuring it in Hatch.

### Step 2: _Create the Offer_

Hatch represents a marketing initiative via the [Offer](/guides/offer). The Offer serves as a central connection upon which its various components are built. From our initial program set-up, we know that our loyalty program is identified by the chain_id **e6cee754-faf8-46a4-99fd-47ba6c3201bc**. We'll use this to make sure that the Offer goes live in our loyalty program. We'll configure a few more attributes of the Offer as well:

- Offer to be published on May 1st, and will end on July 31st. We do this by setting `publish_at` to "20xx-05-01" and `expire_at` to "20xx-07-31".
- The Offer will be referenced internally by setting the `name` to "Reel Beefy Nuggets Offer." Memberships do not see this title; it's only used by our systems.
- We'll categorize this Offer by setting the `category` to "in-store-purchase"; this helps our digital signage to display the Offer in the proper locations.
- If our point of sale system needs a reference to the offer, we'll provide a readable one by setting the `external_id` to "reel-beefy-nuggets".

#### Creating the Offer

This information is POSTed to the [create offers](/api#create-offer) api endpoint:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/offers \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "offers",
    "attributes": {
      "name": "Reel Beefy Nuggets Offer",
      "publish_at": "20xx-05-01",
      "expire_at": "20xx-07-31",
      "category": "in-store-purchase",
      "external_id": "reel-beefy-nuggets"
    },
    "relationships": {
      "chain": {
        "data": {
          "id": "e6cee754-faf8-46a4-99fd-47ba6c3201bc",
          "type": "chains"
        }
      }
    }
  }
}'
```

Upon success, this will return a response like this:

```json
{
  "data": {
    "id": "f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f",
    "type": "offers",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/offers/f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f"
    },
    "attributes": {
      "chain_id": "e6cee754-faf8-46a4-99fd-47ba6c3201bc",
      "external_id": "reel-beefy-nuggets",
      "name": "Reel Beefy Nuggets Offer",
      "description": "",
      "category": "in-store-purchase",
      "must_activate": false,
      "created_at": "20xx-03-01T00:00:00.000Z",
      "publish_at": "20xx-05-01T00:00:00.000Z",
      "expire_at": "20xx-07-31T00:00:00.000Z",
      "custom_data": {},
      "discontinued": false,
      "fulfillment_count": 0
    }
  }
}
```

We'll want to make note that the Offer's **id** is **f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f**. We can also ignore that `must_activate` is set to "false" as we'll be adding that constraint in a later step.

### Step 3: _Choose a Behavior and an Award_

In Hatch, the behavior that a marketing initiative promotes and the award that a Membership receives are collectively called the [Earning Mechanism](/guides/offers/earning-mechanisms). In perusing the list of available Earning Mechanisms, we find one titled _Product Purchase_, whose description reads:

> **Product Purchase**
>
> Product Purchase supports Offers that influence a consumer to buy a particular product, often due to a brand partnership that the marketing program has entered in to.

This seems to fit our situation perfectly, so we first examine the information that must be configured for the Product Purchase Earning Mechanism:

```json
{
    "count_products_by": "quantity", // Must be `quantity` or `money_amount`
    "eligible_product_groups": ["b4cafccc-a523-4c84-bbec-d187b14faafa"], // An array of previously-created [Product Groups](/guides/product-groups)
    "purchase_threshold": 1 // Indicates the unit quantity or dollar-spend required to trigger the award
}
```

For our case, Memberships should purchase 3 of Nuggets, so `count_products_by` will be **quantity** and `purchase_threshold` will be **3**. This is the first time we've worked with Reel Beefy™, so no product groups exist yet to use with the Earning Mechanism

#### Configuring a Product Group

Using the information from the [Product Group](/guides/product-groups) guide, we'll create a new Product Group with the UPC information we received from Reel Beefy™ by calling the [create product group](/api#create-line-item-tag) api:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/product_groups \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "product_groups",
    "attributes": {
      "name": "Reel Beefy Jalapeno Nuggets by UPC",
      "key": "upc",
      "values": ["000011112222", "000033334444", "000055556666", "000077778888"]
    },
    "relationships": {
      "chain": {
        "data": {
          "id": "e6cee754-faf8-46a4-99fd-47ba6c3201bc",
          "type": "chains"
        }
      }
    }
  }
}'
```

Upon the success of this call, we'll find that our new Product Group has been created with the `id` **3d6b1a4a-54ac-4691-8496-2de0e062cdfe**.

#### Creating the Earning Mechanism

Putting this information together with our desire to award 200 points per fulfillment, we'll POST to the [create earning mechanism](/api#create-earning-mechanism) api with the following information:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/earning_mechanisms \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "earning_mechanisms",
    "attributes": {
      "earning_mechanism_type": "product_purchase",
      "configuration": {
        "count_products_by": "quantity",
        "eligible_product_groups": ["3d6b1a4a-54ac-4691-8496-2de0e062cdfe"],
        "purchase_threshold": 3
      },
      "award": {
        "award_type": "point_award",
        "configuration": {
          "points": 200
        }
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f",
          "type": "offers"
        }
      }
    }
  }
}'
```

We can inspect the response code to ensure that the Earning Mechanism was created successfully (code 201), but we don't need any of the rest of the Earning Mechanism data in order to continue.

### Step 4: _Add pre-fulfillment Constraints_

Reel Beefy™ has stated that a Membership should proactively indicate their intent to purchase the Jalapeño Nuggets prior to receiving an award. This is represented as a pre-fulfillment [Constraint](/guides/offers/constraints) in Hatch, and perusing the list yields the following:

> Requires Activation
>
> Used to indicate that the Offer must first be activated via the Membership Offer Activation endpoint. Often used to capture intent from a Membership before allowing the fulfillment of an Offer.

We don't have a post-activation fulfillment restriction, so `must_fulfill_within_days` will remain **null**. We can enforce this constraint by POSTing to the [create constraints](/api#create-constraint) api endpoint with the following:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/constraints \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "constraints",
    "attributes": {
      "constraint_type": "product_purchase",
      "configuration": {
        "must_fulfill_within_days": null
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f",
          "type": "offers"
        }
      }
    }
  }
}'
```

The addition of this Constraint, and the activation status of a particular Membership, are reflected in the Offer's [eligible](/guides/offers#eligible), [must_activate](/guides/offers#must-activate), and [activated](/guides/offers#activated) attributes. We can inspect the response code to ensure that the Constraint was created successfully (code 201), but we don't need any of the rest of the Constraint data in order to continue.

### Step 5: _Describe the target Audience_

This Offer should also be made available only to Memberships between the ages of **18 and 35**. This requirement represents the [Audience](/guides/offers/audiences) of the Offer. The following will suit our needs:

> Age Within
>
>Used to enforce a minimum and/or maximum age restriction on the Offer. Age calculation is based on the birthday of a Membership.

As stated, this Audience's `minimum_age` will be **18** and `maximum_age` will be **35**. It is enforced by POSTing to the [create audience](/api#create-audience) api with the following:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/audiences \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "audiences",
    "attributes": {
      "audience_type": "product_purchase",
      "configuration": {
        "minimum_age": 18,
        "maximum_age": 35
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f",
          "type": "offers"
        }
      }
    }
  }
}'
```

The enforcement of this Audience is reflected in the Offer's [visible status](/guides/offers#visible-status) attribute. We can inspect the response code to ensure that the Audience was created successfully (code 201), but we don't need any of the rest of the Audience data in order to continue.

### Step 6: _Add Limits to financial exposure_

Reel Beefy™ has indicated that they are willing to fund up to $10,000 worth of awards for this Offer. Based on our above calculation, this equates to a total of **50,000** fulfillments. We will further limit fulfillment to **3** per Membership. Hatch enables both global and per-member limitation via [Limits](/guides/offers/limits).

Since we require activation for this Offer, and since a single activation will only yield a single allowed fulfillment before the Membership must re-activate, we'll want to configure both Global Activation, as well as Membership Activation, Limits. We find them in the list of available limits:

> Global Activation
>
>Used in conjunction with an Offer that Requires Activation, limits the total number of times that all Memberships may activate the Offer prior to its fulfillment.

> Membership Activation
>
>Used in conjunction with an Offer that Requires Activation, limits the total number of times that a single Membership may activate the Offer prior to its fulfillment.

Creating these Limits is accomplished by POSTing to the [create limit](/api#create-limit) api, first for the global limit:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/limits \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "limits",
    "attributes": {
      "limit_type": "global_activation",
      "configuration": {
        "limit": 50000
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f",
          "type": "offers"
        }
      }
    }
  }
}'
```

and then for the per-member limit:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/limits \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "limits",
    "attributes": {
      "limit_type": "membership_activation",
      "configuration": {
        "limit": 3
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f",
          "type": "offers"
        }
      }
    }
  }
}'
```

The status of available fulfillments is reflected by the [visible_status](/guides/offers#visible-status) attribute of the Offer. Current fulfillment count can be seen in the [fulfillment_count](/guides/offers#fulfillment-count) attribute. We can inspect the response code to ensure that the Limit was created successfully (code 201), but we don't need any of the rest of the Limit data in order to continue.

### Step 7: _Write and upload marketing copy_

Finally, we configure the [Marketing Contents](/guides/offers/marketing-contents) that will display consumer-facing copy to the Membership. Marketing contents are created via the [create marketing contents](/api#create-marketing-content) api endpoint, and might consist of the following:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/marketing_contents \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "marketing_contents",
    "attributes": {
      "locale": "en_US",
      "title": "Try Reel Beefy™ Fly-Fisher's Flying Jalapeño Nuggets",
      "image_url": "https://our-program.com/assets/jalapeno-nuggets.png",
      "short_description": "Purchase any 3 Jalapeño Nuggets and receive 200 points.",
      "long_description": "Try the tasty new Jalapeño Nuggets from Reel Beefy™, your choice for fuel on long fly-fishing trips. Perfect your perfect cast with X-Treme Spicy, Flavorful Spicy, or Not-So Spicy varieties",
      "terms": "Must activate Offer before purchase to receive points. Limit 1 per Transaction, 3 per Membership.",
      "terms_url": "https://our-program.com/assets/terms-and-conditions.pdf",
      "disclaimer": "Valid while supplies last. Void where prohibited.",
      "disclaimer_url": "https://our-program.com/assets/general-disclaimer.pdf",
    },
    "relationships": {
      "subject": {
        "data": {
          "id": "f8d6ebc8-e67e-4d7e-bba5-541d3067fd3f",
          "type": "offers"
        }
      }
    }
  }
}'
```

## Conclusion

Through this tutorial we've developed and configured a complex marketing initiative in Hatch. It will appear in calls to the [Membership Offers](/api#membership-offers) api, but will not be available for fulfillment until May of 20xx, at which time Memberships are free to [activate](/api#activate-membership-offer) and engage with the Offer. In order to fulfill the Offer, the Membership's Transactions must be forwarded to Hatch. See more in the [Transaction Processing Tutorial](/tutorials/transaction-processing).

Hatch supports many other types of marketing initiatives; take a look at our guide to [Offers](/guides/offers), and particularly the list of supported consumer behaviors in the guide to [Earning Mechanisms](/guides/offers/earning-mechanisms) for more.
