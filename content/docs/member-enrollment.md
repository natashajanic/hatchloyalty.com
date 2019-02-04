---
title: "Member Enrollment Tutorial"
layout: "tutorial"
---


# Member Enrollment Tutorial

Learn how to get new members enrolled in your loyalty program.

## Intro

The new member acquisition process plays a critical role in shaping new members’ first impression of your loyalty program and is critical to the long-term success of the program. In this tutorial, you’ll learn about the Hatch API endpoints that support the creation of new member accounts and how they can be used to deliver a tailored on-boarding process that jump starts a member’s engagement with your program.

This tutorial walks through the following set of steps:

1.  [Enrollment notification configuration](#step-1-em-enrollment-notification-configuration-em)
1.  [Existing member check](#step-2-em-existing-member-check-em)
1.  [Member account creation](#step-3-em-member-account-creation-em)
1.  [Member account setup completion](#step-4-em-member-account-setup-completion-em)

## Steps

### Step 1: _Enrollment Notification Configuration_

The new member enrollment workflow includes an SMS notification that is delivered to each new member immediately after their account is created. The purpose of this notification is to welcome the member to the program and provide a link for them to complete the account setup process at their convenience. This allows a new account to be created with just the member’s phone number, minimizing the amount of information required up-front and removing a significant barrier to new members signing up.

The contents of this message can be customized to match the marketing voice and communication style of your program. However, this message should include a URL leading the new member to a web form or mobile app that allows them to fill out additional information such as their name, email address, and any other custom data collected for your program. As part of your on-boarding, you will be able to define the contents of this message.


### Step 2: _Existing Member Check_

To create new member accounts, you will need to collect customer phone numbers. This can be done in any manner that best suits your business processes, but is generally done at a point-of-sale or other customer touch point (e.g. gas pump, mobile app, etc).

When this information is collected, it is not always clear whether or not the individual is for an existing member or a new member. To determine which scenario is appropriate the [List Memberships API endpoint](/api.html#list-memberships) can be used to check for an existing member account. This is done by using the <code class="filter">filter[phone]</code> filter URL parameter, including the provided phone number as its value.

> Existing Member Check - Example Request

```shell
curl -X GET \
  'https://api.hatchloyalty.com/api/v2/memberships?filter%5Bchain_id%5D=11205afb-6828-4ee2-bab2-83cf6aea1f4c&filter%5Bphone%5D=3128675309' \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466'
```

> Existing Member Check - Example Response

```json
{
  "data": [],
  "meta": {
    "record_count": 0
  }
}
```

If any records are returned in this response, it indicates that an account already exists for this phone number, in which case a new account cannot be created since each account must have a unique phone number value.


### Step 3: _Member Account Creation_

If no record is found for the provided phone number, a new account can be setup using the [Create Membership API endpoint](/api.html#create-membership). The <code class="filter">chain_id</code> value included in this request identifies the program within which this account is being created and should be configured and managed by the client application collecting new member phone numbers. An initial chain will be setup during your on-boarding process and the associated ID will be provided at that time. Additional chains can be created upon request.

> Member Creation - Example Request

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
      "phone": "3128675309"
    }
  }
}'
```

> Member Creation - Example Response

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
      "phone": "1234567890",
      "email": null,
      "points": 0,
      "state": "unconfirmed"
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

Upon successful completion of this request, the configured SMS notification will automatically be delivered to the provided phone number.

If the existing member check was not performed and a member already exists with this phone number a 422 response will be returned with an associated error payload.

> Duplicate Member - Example Response

```json
{
  "errors": [
    {
      "title": "has already been taken",
      "detail": "phone - has already been taken",
      "code": "100",
      "source": {
        "pointer": "/data/attributes/phone"
      },
      "status": "422"
    }
  ]
}
```


### Step 4: _Member Account Setup Completion_

When a member clicks on the link contained in the enrollment notification SMS message, they should be taken to a form allowing them to provide all remaining information required to setup their account. This should include the collection of their name and email address, but can also include any additional custom data that is valuable to capture along with the member’s loyalty account.

This form is not managed by the Hatch platform but instead must be implemented by an external client application of your choosing. Once the information is collected, the [Update Membership API endpoint](/api.html#update-membership) can be used to record the provided information in the member’s account. The attribute `confirmed: true` should be included with this call to change the member's `state` from `unconfirmed` to `confirmed` (which is relevant if you have an Offer configured with a Membership Event Earning Mechanism for type 'confirmed').

> Member Update - Example Request

```shell
curl -X PATCH \
  https://api.hatchloyalty.com/api/v2/memberships/354067ec-ff43-487b-91ed-9134ac79954d \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "memberships",
    "id": "354067ec-ff43-487b-91ed-9134ac79954d",
    "attributes": {
      "email": "sam@example.com",
      "name": "Sam Berenstein",
      "birthdate": "1981-05-28"
      "confirmed": true,
      "custom_data": {
        "twitter_handle": "@SammyBoy"
      }
    }
  }
}'
```

> Member Update - Example Response

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
      "phone": "1234567890",
      "email": "sam@example.com",
      "points": 0,
      "birthdate": "1981-05-28"
      "state": "confirmed"
      "custom_data": {
        "twitter_handle": "@SammyBoy"
      },
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

<!-- __TODO:__ How do we want to handle password setup? -->


## Conclusion

Through these few actions, you’ve now created a new member account in your loyalty program. This account will allow you to gather valuable first-party information and track the behavior and engagement of the member throughout the loyalty program. You also now have the ability to contact this member directly via email and SMS in a targeted manner.

In no time, you’ll be able to start building up your program’s member base. After that, it will be important to promote increased engagement with the program and to begin driving your members toward your desired behavior and actions. Check out the following guides to learn more about these next steps:

* [Reward Redemption Tutorial](/tutorials/reward-redemption)
* [Transaction Processing Tutorial](/tutorials/transaction-processing)
