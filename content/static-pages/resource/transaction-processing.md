---
documentType: "resource"
title: "Transaction Processing Tutorial"
layout: "tutorial"
---

# Transaction Processing Tutorial

Learn how to process and record purchases that occur in your stores, online, and at other point of sale devices.

## Intro

Each Transaction represents a user's purchase of goods or services and the additional contextual information necessary to capture a complete picture of the Transaction. This purchase may occur at a physical store, online, or at some other point of sale endpoint. Regardless the general workflow for processing a Transaction remains consistent.

This tutorial walks through the following set of steps:

1. [Member identification](#step-1-em-member-identification-em)
1. [Redemption retrieval](#step-2-em-redemption-retrieval-em)
1. [Reward application](#step-3-em-reward-application-em)
1. [Transaction recording](#step-4-em-transaction-recording-em)

## Steps

### Step 1: _Member Identification_

Transactions are only recorded for registered members of your loyalty program. As a result, the first step of processing an in-flight Transaction is to determine if the customer is an existing member of your loyalty program. This is done by collecting the customer's phone number and using it to check for an existing account using the `filter[phone]` filter URL parameter on the [List Memberships API endpoint](/api.html#list-memberships).

> Member Lookup - Example Request

```shell
curl -X GET \
  'https://api.hatchloyalty.com/api/v2/memberships?filter%5Bphone%5D=3128675309' \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466'
```

> Member Lookup - Example Response

```json
{
  "data": [
    {
      "id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "type": "memberships",
      "links": {
        "self": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d"
      },
      "attributes": {
        "chain_id": "4107a548-8e64-4514-a69e-98ca13d7f5f0",
        "name": "Sam Berenstein",
        "phone": "3128675309",
        "email": "sam@example.com",
        "state": "unconfirmed",
        "points": 37,
        "custom_data": {},
        "created_at": "2017-07-19T14:42:42.165Z"
      },
      "relationships": {
        "unfulfilled_redemptions": {
          "links": {
            "self": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d/relationships/unfulfilled_redemptions",
            "related": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d/unfulfilled_redemptions"
          }
        }
      }
    }
  ],
  "meta": {
    "record_count": 1
  },
  "links": {
    "next": "http://api.hatchloyalty.com/api/v2/memberships?page%5Bcursor%5D=21&page%5Bsize%5D=20",
    "last": "http://api.hatchloyalty.com/api/v2/memberships?page%5Bcursor%5D=102&page%5Bsize%5D=20"
  }
}
```

If a matching member is found, their account information is returned in the response body. If no matching member account is found, no records will be returned in the response. In this case, a new Membership can be created and the current Transaction can be processed for that account. This is done via the [Create Membership API endpoint](/api.html#create-membership), using the ID of the chain for the loyalty program in which the member's account should be created.

> Create Member - Example Request

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/memberships \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "memberships",
    "attributes": {
      "chain_id": "4107a548-8e64-4514-a69e-98ca13d7f5f0",
      "phone":"3128675309"
    }
  }
}'
```

> Create Member - Example Response

```json
{
  "data": {
    "id": "354067ec-ff43-487b-91ed-9134ac79954d",
    "type": "memberships",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d"
    },
    "attributes": {
      "chain_id": "4107a548-8e64-4514-a69e-98ca13d7f5f0",
      "name": null,
      "phone": "3128675309",
      "email": null,
      "state": "unconfirmed",
      "points": 0,
      "custom_data": {},
      "created_at": "2017-07-19T14:42:42.165Z"
    },
    "relationships": {
      "unfulfilled_redemptions": {
        "links": {
          "self": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d/relationships/unfulfilled_redemptions",
          "related": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d/unfulfilled_redemptions"
        }
      }
    }
  }
}
```


### Step 2: _Redemption Retrieval_

One of the core functions of a Transaction is to enable the fulfillment of Redemptions, which represents a member receiving the incentive or discount specified for a Reward they previously redeemed. This is accomplished by allowing the member to select any of the unfulfilled Redemptions in their account that they would like to apply to the current Transaction. Unfulfilled Redemptions can be retrieved through the [Retrieve Membership API endpoint](/api.html#retrieve-membership) by eager loading the `unfulfilled_redemptions` relationship.

> Unfulfilled Redemption Lookup - Example Request

```shell
curl -X GET \
  https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d?include=unfulfilled_redemptions \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466'
```

> Unfulfilled Redemption Lookup - Example Response

```json
{
  "data": {
    "id": "354067ec-ff43-487b-91ed-9134ac79954d",
    "type": "memberships",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d"
    },
    "attributes": {
      "chain_id": "4107a548-8e64-4514-a69e-98ca13d7f5f0",
      "name": "Sam Berenstein",
      "phone": "3128675309",
      "email": "sam@example.com",
      "points": 37,
      "custom_data": {},
      "created_at": "2017-07-19T14:42:42.165Z"
    },
    "relationships": {
      "unfulfilled_redemptions": {
        "links": {
          "self": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d/relationships/unfulfilled_redemptions",
          "related": "https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d/unfulfilled_redemptions"
        },
        "data": [
          {
            "type": "redemptions",
            "id": "3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70"
          }
        ]
      }
    }
  },
  "included": [
    {
      "id": "3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70",
      "type": "redemptions",
      "links": {
        "self": "https://api.hatchloyalty.com/api/v2/redemptions/3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70"
      },
      "attributes": {
        "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
        "reward_id": "5276b1a0-6dc1-445f-8a31-7e1ce794fcfa",
        "external_id": null,
        "state": "unfulfilled",
        "created_at": "2017-07-19T14:42:42.165Z"
      }
    }
  ]
}
```


### Step 3: _Reward Application_

For each Reward a member selects, the point of sale must identify and apply any associated discount to the current Transaction. To support this, the `external_id` attribute of the [Reward Object](/api.html#the-reward-object) is often used to record the coupon or discount code needed to apply each reward to a pending Transaction.


### Step 4: _Transaction Recording_

Once the purchase has been completed and recorded to the Transaction resource, it must be submitted to the Hatch API via the [Create Transaction API endpoint](/api.html#create-transaction). The `location_id` attribute included in this request is an identifier for the physical store at which the Transaction occurred. Each in-store point of sale should be configured with the ID assigned to its location.

This will record the Transaction details, including all line items and any applied Redemptions, triggering the Hatch Rules Engine to process the Transaction and execute any applicable Offers or rules.

> Record Transaction - Example Request

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/transactions \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "transactions",
    "attributes": {
      "request_id": "6e248bf5-cd9e-4453-8a9a-33bfe6fbef5d",
      "transaction_time_at": "2016-08-02T14:36:12.000Z",
      "money_currency_code": "USD",
      "line_items": [ {
        "sku": "1234-acbd",
        "upc": "042100005264",
        "quantity": 3,
        "money_amount": 9.21,
        "group": "sodas-drinks"
      } ],
      "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "location_id": "090cbe4d-532f-4671-b431-1d8fe01490cc",
      "redemption_ids": [ "3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70" ]
    }
  }
}'
```

> Record Transaction - Example Response

```json
{
  "data": {
    "id": "9ba29e67-d0cf-4955-807b-ead5e6dd4fbb",
    "type": "transactions",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/transactions/9ba29e67-d0cf-4955-807b-ead5e6dd4fbb"
    },
    "attributes": {
      "partner_id": null,
      "request_id": "6e248bf5-cd9e-4453-8a9a-33bfe6fbef5d",
      "transaction_time_at": "2016-07-19T14:42:12.000Z",
      "money_currency_code": "USD",
      "line_items": [ {
        "sku": "1234-acbd",
        "upc": "042100005264",
        "quantity": 3,
        "money_amount": 9.21,
        "group": "sodas-drinks"
      } ],
      "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "location_id": "090cbe4d-532f-4671-b431-1d8fe01490cc",
      "redemption_ids": [ "3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70" ],
      "fulfilled_offer_ids": [],
      "custom_data": {},
      "created_at": "2017-07-19T14:42:15.165Z"
    }
  }
}
```


## Conclusion

Through this simple integration, you'll not only give your members significant motivation to consistently bring their business into your stores, but you'll also begin gathering valuable insight into their shopping habits and buying trends. You can in turn leverage this new-found insight by configuring offers and rewards that drive targeted behaviors across your member base.

While proper Transaction management is a crucial aspect of any integration with the Hatch API, there are a number of other actions that play a significant role in the overall member experience. Be sure to check out the following tutorials as well, which are also key to the end-to-end experience of your members and in turn the overall success of your program:

* [Member Enrollment Tutorial](/tutorials/member-enrollment)
* [Reward Redemption Tutorial](/tutorials/reward-redemption)
