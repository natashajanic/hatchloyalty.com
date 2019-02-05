---
documentType: "resource"
title: "Behavioral Offer Tutorial"
layout: "tutorial"
---


# Behavioral Offer Tutorial

Learn how to translate a non-transactional, behavioral marketing initiative in to an Offer in Hatch.

## Intro

Hatch provides powerful tools to strengthen personal relationships with a loyalty program's Memberhship base. These relationships lead to a beneficial change in consumer behavior: a Membership is engaged with offerings that they are personally interested in, and the loyalty program can incentivize opportunities to get to know a Membership even more. Just as a [purchase-based offer](/tutorials/purchase-based-offer) may be configured to support a wide range of purchased-based behaviors, Hatch also supports a wide range of non-purchase, non-transactional Offers. Hatch uses [Loyalty Events](/api#loyalty-events) to capture all types of non-transactional activity.

This tutorial describes how to use Offers in Hatch to execute such marketing initiatives, and will walk through the following set of steps:

1.  [Describe the Marketing Initiative](#step-1-em-describe-the-marketing-initiative-em)
1.  [Create the Offer](#step-2-em-create-the-offer-em)
1.  [Choose a Behavior and an Award](#step-3-em-choose-a-behavior-and-an-award-em)
1.  [Describe the target Audience](#step-4-em-describe-the-target-audience-em)
  1.  [Create a Custom Segment](#step-4-1-em-create-a-custom-segment-em)
  1.  [Apply Custom Segments to Memberships](#step-4-2-em-apply-custom-segments-to-memberships-em)
  1.  [Apply Custom Segment Audiences](#step-4-3-em-apply-custom-segment-audiences-em)
1.  [Write and upload marketing copy](#step-5-em-write-and-upload-marketing-copy-em)

## Steps

### Step 1: _Describe the Marketing Initiative_

A marketing initiative may be generated internally, e.g., to promote a new feature of your store, or externally via a partnership with a Brand. This tutorial will focus on an initiative that's meant to learn a little more about certain groups of Memberships in order to strengthen the loyalty program's relationship with them.

A marketing initiative is a complex system with many factors and it will need to be translated to Hatch in order to reach the loyalty program's member base. It is best to start by describing the initiative, the behavior, constraints, and other factors that will need to be put in place, before beginning. We've done so here:

> We have an opportunity to place a few new types of products in our off-highway high-traffic stores. We'd like to know a little more about the types of products that our Membership base would like to see in-store, and have designed a series of questions that we'd like to present to certain Memberships.
>
> We'd like to target the Memberships who most often come in to our store to purchase products; of those, we'd also like to target either the Memberships who often buy freshly-prepared food, or those who have answered surveys in the past.
>
> We know that Memberships do not tend to engage with long, multi-question surveys. We also know that successful mobile applications use a consistently-timed, but variable-quantity, award to increase engagement and support habit formation. Therefor, we plan to present a Membership with at most one question per day and upon answering, reward them with between 25 and 200 points.

Now that we've described the marketing initiative in its entirety, we may begin configuring it in Hatch.

### Step 2: _Create the Offer_

Hatch represents a marketing initiative via the [Offer](/guides/offer). The Offer serves as a central connection upon which its various components are built. From our initial program set-up, we know that our loyalty program is identified by the chain_id **e6cee754-faf8-46a4-99fd-47ba6c3201bc**. We'll use this to make sure that the Offer goes live in our loyalty program. We'll configure a few more attributes of the Offer as well:

- Offer to be published on September 1st, and will end on September 30th. We do this by setting `publish_at` to "20xx-09-01" and `expire_at` to "20xx-09-30".
- The Offer will be referenced internally by setting the `name` to "New Product Questionnaire." Memberships do not see this title; it's only used by our systems.
- We'll categorize this Offer by setting the `category` to "mobile-app-daily"; this helps our digital signage to display the Offer in the proper locations.
- If our internal reporting systems needs a reference to the offer, we'll provide a readable one by setting the `external_id` to "new-product-questionnaire".

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
      "name": "New Product Questionnaire",
      "publish_at": "20xx-09-01",
      "expire_at": "20xx-09-30",
      "category": "mobile-app-daily",
      "external_id": "new-product-questionnaire"
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
    "id": "23420214-b692-47f6-8967-89340ee195a4",
    "type": "offers",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/offers/23420214-b692-47f6-8967-89340ee195a4"
    },
    "attributes": {
      "chain_id": "e6cee754-faf8-46a4-99fd-47ba6c3201bc",
      "external_id": "new-product-questionnaire",
      "name": "New Product Questionnaire",
      "description": "",
      "category": "mobile-app-daily",
      "must_activate": false,
      "created_at": "20xx-03-01T00:00:00.000Z",
      "publish_at": "20xx-09-01T00:00:00.000Z",
      "expire_at": "20xx-09-30T00:00:00.000Z",
      "custom_data": {},
      "discontinued": false,
      "fulfillment_count": 0
    }
  }
}
```

We'll want to make note that the Offer's **id** is **23420214-b692-47f6-8967-89340ee195a4**.

### Step 3: _Choose a Behavior and an Award_

In Hatch, the behavior that a marketing initiative promotes and the award that a Membership receives are collectively called the [Earning Mechanism](/guides/offers/earning-mechanisms). In perusing the list of available Earning Mechanisms, we find one titled _Loyalty Event_, whose description reads:

> **Loyalty Event**
>
> Loyalty Event supports Offers which are not linked to transactional behaviors of Memberships, and allow for any number of Membership behaviors to be incentivized.

This seems to fit our situation perfectly, so we first examine the information that must be configured for the Loyalty Event Earning Mechanism:

```json
{
  "event_type": "filled-out-survey" // Any string; matches the `event_type` that will be sent to the Loyalty Event api endpoint
}
```

For our case, we'll have our mobile application's back-end system create a new Loyalty Event via the Hatch API each time someone responds to a question. Our systems will keep track of the questions, and will enforce that each Membership only sees one per day. Per the documentation on the [Loyalty Event](/guides/offers/earning-mechanisms#loyalty-event), we'll need to configure the Offer with the same `event_type` that we send to indicate that the Offer has been fulfilled. We'll use **new-product-questionnaire**.

We also see that Loyalty Event supports two types of awards, "point award" and "external point award." Since our system will be responsible for determining the variable award, we'll choose **external_point_award** as the `award_type`. It requires no additional configuration.

Putting this information together, we'll POST to the [create earning mechanism](/api#create-earning-mechanism) api with the following information:

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
      "earning_mechanism_type": "loyalty_event",
      "configuration": {
        "event_type": "new-product-questionnaire"
      },
      "award": {
        "award_type": "external_point_award",
        "configuration": {}
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "23420214-b692-47f6-8967-89340ee195a4",
          "type": "offers"
        }
      }
    }
  }
}'
```

We can inspect the response code to ensure that the Earning Mechanism was created successfully (code 201), but we don't need any of the rest of the Earning Mechanism data in order to continue.

### Step 4: _Describe the target Audience_

This Offer should be shown to Memberships based on a few different requirements, recalling the marketing initiative's description:

> We'd like to target the Memberships who most often come in to our store to purchase products; of those, we'd also like to target either the Memberships who often buy freshly-prepared food, or those who have answered surveys in the past.

It looks like Hatch does not directly support our targeting requirements, but it does support the ability to create [Custom Segments](/guides/custom-segments) which allow our own business intelligence systems to arbitrarily segment Memberships. If we have a segment **frequent-in-store**, a segment **frequent-fresh-food**, and a segment **answered-survey**, we should be able to make use of the following two Audiences to support our targeting goals:

> In All Segments
>
> Used to ensure that the Membership belongs to all of the specified segments.

> In Any Segment
>
> Used to ensure that the Membership belongs to at least one of the specified segments.

#### Step 4.1: _Create a Custom Segment_

Before continuing with the Offer setup, we'll need to make sure that our three segments are represented in Hatch. We can do so by calling the [create segments](/api#create-segment) api.

First, we'll send a POST request to create the **frequent-in-store** segment:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/segments \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "segments",
    "attributes": {
      "short_code": "frequent-in-store",
      "name": "Frequent In Store",
      "description": "Memberships that frequently make purchases in our physical store locations.",
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

The API will respond with

```json
{
  "data": {
    "id": "c8f32d73-cbfb-4654-a29b-c2d5c14fdc21",
    "type": "segments",
    "links": {
      "self": "https://api.hatchloyalty.com/api/v2/segments/c8f32d73-cbfb-4654-a29b-c2d5c14fdc21"
    },
    "attributes": {
      "short_code": "frequent-in-store",
      "name": "Frequent In Store",
      "description": "Memberships that frequently make purchases in our physical store locations.",
     },
    "relationships": {
      "chain": {
        "links": {
          "self": "https://api.hatchloyalty.com/api/v2/segments/e6cee754-faf8-46a4-99fd-47ba6c3201bc/relationships/chain",
          "related": "https://api.hatchloyalty.com/api/v2/segments/e6cee754-faf8-46a4-99fd-47ba6c3201bc/chain"
        }
      },
    }
  }
}
```

Parsing the response will yield a Segment ID of **c8f32d73-cbfb-4654-a29b-c2d5c14fdc21** for "frequent-in-store". We follow the same step to create both the "frequent-fresh-food" and "answered-survey" custom segments, and collect the following IDs:

- frequent-in-store: **c8f32d73-cbfb-4654-a29b-c2d5c14fdc21**
- frequent-fresh-food: **f030be61-9ede-423f-9d32-653076106b7e**
- answered-survey: **97f5a248-ae8f-4041-944c-18ff10de04a5**

#### Step 4.2: _Apply Custom Segments to Memberships_

We have three Memberships that we'll use to initially test this offer; their ids are bf54a204-3463-4c1a-beba-5c9caa1251d2, ed42c133-f6eb-4f02-85c2-0925bbab5df3, and 6ba763c4-8c8f-4b8b-a512-be72c82e6e06.

- The first Membership (bf54a204-3463-4c1a-beba-5c9caa1251d2) will belong only to the **frequent-in-store** segment and should not see the Offer.
- The second Membership (ed42c133-f6eb-4f02-85c2-0925bbab5df3) will belong to both the **frequent-in-store** segment, _and_ the **frequent-fresh-food** segment and should see the Offer.
- The third Membership (6ba763c4-8c8f-4b8b-a512-be72c82e6e06) will belong to both the **frequent-in-store** segment, _and_ the **answered-survey** segment, and should also see the Offer.

We'll add the Memberships to the appropriate Segments via the [add members to a segment](/api#add-members-to-a-segment) api as follows.

For the **frequent-in-store**, we add all three Memberships (note the Segment's ID in the URL):

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/segments/c8f32d73-cbfb-4654-a29b-c2d5c14fdc21/relationships/memberships \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": [
    { "id": "bf54a204-3463-4c1a-beba-5c9caa1251d2", type: "memberships" },
    { "id": "ed42c133-f6eb-4f02-85c2-0925bbab5df3", type: "memberships" },
    { "id": "6ba763c4-8c8f-4b8b-a512-be72c82e6e06", type: "memberships" },
  }]
}'
```

For the **frequent-fresh-food**, we add only the second Membership (note the Segment's ID in the URL):

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/segments/f030be61-9ede-423f-9d32-653076106b7e/relationships/memberships \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": [
    { "id": "ed42c133-f6eb-4f02-85c2-0925bbab5df3", type: "memberships" }
  }]
}'
```

For the **answered-survey**, we add only the third Membership (note the Segment's ID in the URL):

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/segments/97f5a248-ae8f-4041-944c-18ff10de04a5/relationships/memberships \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": [
    { "id": "6ba763c4-8c8f-4b8b-a512-be72c82e6e06", type: "memberships" }
  }]
}'
```

#### Step 4.3: _Apply Custom Segment Audiences_

Now that the Custom Segments exist and have been applied to a few Memberships, we can continue setting up the Offer. We want to display the Offer only to those Memberships in the **frequent-in-store** segment _and_ who are in either the **frequent-fresh-food** or the **answered-survey** segment. We can use a combination of the "In All Segments" and "In Any Segment" Audiences by configuring "In All Segments" with the **frequent-in-store**, and "In Any Segment" with both the **frequent-fresh-food** and the **answered-survey**. These can be configured by POSTing to the [create audience](/api#create-audience) api.

For reference, our segments have the following IDs in Hatch:

- frequent-in-store: **c8f32d73-cbfb-4654-a29b-c2d5c14fdc21**
- frequent-fresh-food: **f030be61-9ede-423f-9d32-653076106b7e**
- answered-survey: **97f5a248-ae8f-4041-944c-18ff10de04a5**

For the "In All Segments" audience:

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
      "audience_type": "in_all_segments",
      "configuration": {
        "segments": ["c8f32d73-cbfb-4654-a29b-c2d5c14fdc21"]
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "23420214-b692-47f6-8967-89340ee195a4",
          "type": "offers"
        }
      }
    }
  }
}'
```

For the "In Any Segments" audience:

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
      "audience_type": "in_any_segment",
      "configuration": {
        "segments": ["f030be61-9ede-423f-9d32-653076106b7e", "97f5a248-ae8f-4041-944c-18ff10de04a5"]
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "id": "23420214-b692-47f6-8967-89340ee195a4",
          "type": "offers"
        }
      }
    }
  }
}'
```

Because all a Membership must fall "within" _all_ configured Audiences, the configuration of both "In All Segments" _and_ "In Any Segment" will ensure that a Membership must be in **frequent-in-store**, as well as either **frequent-fresh-food** _or_ **answered-survey**. The enforcement of these Audiences are reflected in the Offer's [visible status](/guides/offers#visible-status) attribute. We can inspect the response code to ensure that the Audience was created successfully (code 201), but we don't need any of the rest of the Audience data in order to continue.

### Step 5: _Write and upload marketing copy_

Finally, we configure the [Marketing Contents](/guides/offers/marketing-contents) that will display consumer-facing copy to the Membership. Marketing contents are created via the [create marketing contents](/api#create-marketing-content) api endpoint, and might consist of the following:

```shell
curl -X POST \
  https://api.hatchloyalty.com/api/v2/product_groups \
  -H 'accept: application/vnd.api+json' \
  -H 'authorization: Bearer 066a7466' \
  -H 'content-type: application/vnd.api+json' \
  -d '{
  "data": {
    "type": "marketing_contents",
    "attributes": {
      "locale": "en_US",
      "title": "Answer a question to win big!",
      "image_url": "https://our-program.com/assets/you-are-a-winner.png",
      "short_description": "Return each day to answer a simple question and win up to 200 points!",
      "long_description": "Check in with your Loyalty Program Mobile Application each day, answer one simple question, and win anywhere from 25 - 200 points.",
      "terms": "One question available per day.",
      "terms_url": "https://our-program.com/assets/terms-and-conditions.pdf",
      "disclaimer": "Void where prohibited.",
      "disclaimer_url": "https://our-program.com/assets/general-disclaimer.pdf",
    },
    "relationships": {
      "subject": {
        "data": {
          "id": "23420214-b692-47f6-8967-89340ee195a4",
          "type": "offers"
        }
      }
    }
  }
}'
```

## Conclusion

Through this tutorial we've developed and configured a complex marketing initiative in Hatch. It will appear in calls to the [Membership Offers](/api#membership-offers) api, but will not be available for fulfillment until September of 20xx, at which time Memberships in the configured Custom Segments are free to engage with the Offer.

Hatch supports many other types of marketing initiatives; take a look at our guide to [Offers](/guides/offers), and particularly the list of supported consumer behaviors in the guide to [Earning Mechanisms](/guides/offers/earning-mechanisms) for more.
