---
documentType: "resource"
title: "Reward Redemption Tutorial"
layout: "tutorial"
---

# Reward Redemption Tutorial

Learn how to present the available set of rewards to a member and allow them to redeem these rewards using the points they've accrued in their account.

## Intro

Rewards are an important mechanism for motivating your members to engage in your loyalty program and respond to the incentives presented to them. Offering a desirable set of rewards at reasonable costs is an important first step, but it is equally important to provide a friction-free redemption process. In this tutorial, you’ll learn about the Hatch API endpoints that support the retrieval and redemption of rewards that are available to a member.

This tutorial walks through the following set of steps:

1. [Available reward retrieval](#step-1-em-available-reward-retrieval-em)
1. [Redemption creation](#step-2-em-redemption-creation-em)
1. [Redemption selection](#step-3-em-redemption-selection-em)
1. [Redemption fulfillment](#step-4-em-redemption-fulfillment-em)
1. [Redemption review](#step-5-em-redemption-review-em)

## Steps

### Step 1: _Available Reward Retrieval_

Rewards can be targeted to a specific set of members or have other criteria that make them only available to a subset of your members. For this reason, when presenting a set of Rewards to a member for redemption, it's important to always pull the Rewards available for the particular Membership in question rather than all Rewards setup across the entire program. This set of Rewards is retrieved by calling the [List Membership Rewards API endpoint](/api.html#list-membership-rewards) for the particular Membership.

> Member Rewards Retrieval - Example Request

```shell
curl -X GET \
  https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d/rewards \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466'
```

> Member Rewards Retrieval - Example Response

```json
{
  "data": [
    {
      "id": "5276b1a0-6dc1-445f-8a31-7e1ce794fcfa",
      "type": "membership_rewards",
      "links": {
        "self": "https://api.hatchloyalty.com/api/v2/rewards/5276b1a0-6dc1-445f-8a31-7e1ce794fcfa"
      },
      "attributes": {
        "external_id": null,
        "name": "Free Large Fountain Drink",
        "points": 25,
        "created_at": "2017-07-19T14:42:42.165Z",
        "publish_at": "2016-08-15T07:00:00.000Z",
        "expire_at": "2016-08-29T22:00:00.000Z",
        "can_redeem": true
      }
    }
  ],
  "meta": {
    "record_count": 1
  },
  "links": {
    "first": "http://api.hatchloyalty.com/api/v2/membership_rewards?page%5Bcursor%5D=1&page%5Bsize%5D=20",
    "next": "http://api.hatchloyalty.com/api/v2/membership_rewards?page%5Bcursor%5D=998961a5-cebd-4015-a766-215523035625&page%5Bsize%5D=20"
  }
}
```

Members redeem a reward by spending the points that they have accrued in their account balance. As a result, members are only eligible to redeem rewards that cost less than their currently available point balance. All records included in the response can be shown to the member, but they should only be allowed to redeem those whose `can_redeem` value is true, indicating that the member has sufficient points to redeem the associated reward.


### Step 2: _Redemption Creation_

Once the member selects a reward to redeem, a Redemption must be created via the [Create Redemption API endpoint](/api.html#create-redemption), making the associated reward available to be applied to a subsequent Transaction. The creation of a Redemption triggers the deduction of the required number of points for the associated reward from the Membership's available point balance. If the Redemption is canceled at any point down the road, the associated points will be credited back to the Membership at that time.

> Redemption Creation - Example Request

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/redemptions \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "redemptions",
    "attributes": {
      "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "reward_id": "5276b1a0-6dc1-445f-8a31-7e1ce794fcfa"
    }
  }
}'
```

> Redemption Creation - Example Response

```json
{
  "data": {
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
}
```


### Step 3: _Redemption Selection_

When a Redemption is initially created, it starts in the "unfulfilled" state, indicating that the member has reserved the associated Reward but has not yet received it. Fulfillment of the Redemption must happen as part of a Transaction, indicating that the member received the Reward during the specified Transaction. All unfulfilled Redemptions for a member are eligible to be applied to a Transaction. Such Redemptions should be presented to the member during each Transaction to allow them to select any and all that they would like to apply to the current Transaction.

For example, if a member redeems a "Free Large Fountain Drink" reward for 25 points, their account will immediately have 25 points deducted from it and they will be entitled to receive a free large fountain drink on one of their upcoming purchases. The Redemption for this reward will remain unfulfilled until the member purchases a large fountain drink and elects to apply the unfulfilled Redemption to the Transaction.

All unfulfilled Redemptions can be retrieved from the [Retrieve Membership API endpoint](/api.html#retrieve-membership) by eager loading the <code class="filter">unfulfilled_redemptions</code> relation.

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


### Step 4: _Redemption Fulfillment_

For each redemption, the member selects during a given Transaction, the point of sale will apply the corresponding discount in the member's purchase. Additionally, the ID for each Redemption applied must be included in the resulting [Create Transaction API request](/api.html#create-transaction) to indicate that the member has received the reward associated with a given redemption. The inclusion of a redemption within a Transaction is Hatch's indication that a reward has been received, transitioning the associated redemption to the "fulfilled" status.

> Redemption Fulfillment Transaction - Example Request

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
      "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "redemption_ids": ["3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70"]
    }
  }
}'
```

> Redemption Fulfillment Transaction - Example Response

```json
{
  "data": {
    "id": "9ba29e67-d0cf-4955-807b-ead5e6dd4fbb",
    "type": "transactions",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/transactions/9ba29e67-d0cf-4955-807b-ead5e6dd4fbb"
    },
    "attributes": {
      "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "redemption_ids": [
        "3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70"
      ]
    }
  }
}
```

At any time before the fulfillment of a Redemption, the [Cancel Redemption API endpoint](/api.html#cancel-redemption) can be used to cancel the Redemption and refund the associated points to the Membership.

> Redemption Cancellation - Example Request

```shell
curl -X PATCH \
  https://api.hatchloyalty.com/api/v2/redemptions/3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70/cancel \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json'
```

> Redemption Cancellation - Example Response

```json
{
  "data": {
    "id": "3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70",
    "type": "redemptions",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/redemptions/3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70"
    },
    "attributes": {
      "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "reward_id": "5276b1a0-6dc1-445f-8a31-7e1ce794fcfa",
      "external_id": null,
      "state": "canceled",
      "created_at": "2017-07-19T14:42:42.165Z"
    }
  }
}
```

### Step 5: _Redemption Review_

Once a Redemption is included in a Transaction, it's status will be updated to "fulfilled", indicating that the Reward is no longer available to be applied to future Transactions. This can be verified through the [Retrieve Redemption API endpoint](/api.html#retrieve-redemption).

> Retrieve Redemption - Example Request

```shell
curl -X GET \
  https://api.hatchloyalty.com/api/v2/redemptions/3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70 \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json'
```

> Retrieve Redemption - Example Response

```json
{
  "data": {
    "id": "3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70",
    "type": "redemptions",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/redemptions/3ab3f14a-2b5f-4a2c-ab8e-cf83787c8e70"
    },
    "attributes": {
      "membership_id": "354067ec-ff43-487b-91ed-9134ac79954d",
      "reward_id": "5276b1a0-6dc1-445f-8a31-7e1ce794fcfa",
      "external_id": null,
      "state": "fulfilled",
      "created_at": "2017-07-19T14:42:42.165Z"
    }
  }
}
```


## Conclusion

This sequence of steps enables members to spend the points they've accumulated in their account by redeeming Rewards through any available touch point, including a mobile app, web dashboard, or in-store kiosk. In turn, all Redemptions are credited to the Membership and available to be applied to any subsequent Transaction. The value delivered through this process is what motivates members to continue to accumulate points and engage in the program.

While this is a critical aspect of your loyalty program, it is just one piece of the overall puzzle and it's important to consider the complete, end-to-end member experience when designing and refining your program. The following are a few of the other important aspects to keep in mind:

* [Member Enrollment Tutorial](/tutorials/member-enrollment)
* [Transaction Processing Tutorial](/tutorials/transaction-processing)
