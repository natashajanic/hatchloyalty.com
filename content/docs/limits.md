---
title: "Offer Limits"
layout: "tutorial"
---

# API Reference

Limits are exposed via an API resource called [Limits](/api/#limits).

# What is a Limit?

A Limit is an offer component that enforces the limit of exposure or liability for an offer. A Limit is based upon the number of times the offer's earning mechanism may trigger its award, either globally or per-membership. An offer may have zero, one, or many Limits associated with it; a Limit is enforced for the lifetime of the offer.

A Limit may be selected when the offer (or, more generally, the marketing initiative being configured in Hatch) has a cap on the number of times that it may be fulfilled; either globally, per-membership, or both. This cap indicates the available inventory, or maximum liability, that is available to fund the offer. Configuring one or more limits prevents fulfillment from overflowing this cap, even in the middle of processing a single transaction or loyalty event. For instance, suppose a global fulfillment cap of 1000 is established and the offer has then been fulfilled 998 times. If a membership were to attempt to fulfill the offer 5 times within a single transaction, the system would still limit fulfillment to those 2 remaining. If a global and per-membership limit is set, Hatch will respect whichever available remaining count is lesser, e.g., if 10 units remain globally, but only 1 more for a given membership, fulfillment of that offer by that Membership will be limited to 1.

Although both a global and a per-membership limit may be set in conjunction on an offer, both configured Limits must act in the same context; e.g., both must be "fulfillment" limits or both must be "activation" limits.

When an offer has reached a Limit (either globally, or for a particular Membership), it should no longer be "shown." The Hatch API indicates whether a particular membership should "see" that offer via the `visible_status` attribute of a request to the [Membership Offers](/api/#membership-offers) endpoint. A value of `visible` indicates that the membership should be shown the offer (and that they are free to engage with it). Any other value indicates that there is a reason it should be hidden. For more details on `visible_status` see the [Visibility](/guides/offers#visible_status) section of our Offer Guide.

# How is are Limits configured?

Limits may be configured for an offer via the [Create Limit api](/api/#create-limit). The payload for creating Limits follows the general JSON-API structure (below), with the following note: when selecting a particular type of limit for creation, the `limit_type` attribute indicates which limit is selected. This dictates which attributes should be included in the `configuration` attribute in order to correctly configure the particular limit.

**General Create Limit API structure**

```json
{
  "data": {
    "type": "limits",
    "attributes": {
      "limit_type": "__Indicates the type of Limit being configured.__",
      "configuration": {
        // A hash of configuration values. The structure of this hash changes depending on the limit type selected.
      }
    },
    "relationships": {
      "offer": {
        "data": {
            "type": "offers",
            "id": "__ID of the offer that the Limit is associated with.__"
        }
      }
    }
  }
}
```

# What Limits are available?

## Activation Limits

1.  [Global Activation](#global-activation)
1.  [Membership Activation](#membership-activation)

## Fulfillment Limits

1.  [Global Award Count](#global-award-count)
1.  [Membership Award Count](#membership-award-count)

---

### Global Activation

Used in conjunction with an offer that [Requires Activation](/guides/offers/constraints#requires-activation), limits the total number of times that all memberships may activate the offer prior to its fulfillment. Since requiring activation also guarantees only one fulfillment per membership activity ([Transaction](/api#transactions) or [Loyalty Event](/api#loyalty-events)), this also limits fulfillment to exactly the number of allowed global activations. May be used in conjunction with the [Membership Activation](#membership-activation) Limit.

**limit_type**: `global_activation`

**configuration**:

```json
{
    "limit": 1000 // Must a positive integer
}
```

**Example full payload**

```json
{
  "data": {
    "type": "limits",
    "attributes": {
      "limit_type": "global_activation",
      "configuration": {
        "limit": 40000
      }
    },
    "relationships": {
      "offer": {
        "data": {
            "type": "offers",
            "id": "d7aa712d-e28b-4b53-b2b0-496e029fe743" // Assuming this Offer has been previously created.
        }
      }
    }
  }
}
```

---

### Global Award Count

Used to Limit the number of times that an [Earning Mechanism](/guides/offers/earning-mechanisms)'s `award` may be given to all memberships; often called the "fulfillment" of the offer.

**limit_type**: `global_award_count`

**configuration**:

```json
{
    "limit": 30000 // Must a positive integer
}
```

**Example full payload**

```json
{
  "data": {
    "type": "limits",
    "attributes": {
      "limit_type": "global_award_count",
      "configuration": {
        "limit": 1500
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

### Membership Activation

Used in conjunction with an offer that [Requires Activation](/guides/offers/constraints#requires-activation), limits the total number of times that a single membership may activate the offer prior to its fulfillment. Since requiring activation also guarantees only one fulfillment per membership activity ([Transaction](/api#transactions) or [Loyalty Event](/api#loyalty-events)), this also limits fulfillment for that membership to exactly the number of available activations. May be used in conjunction with the [Global Activation](#global-activation) Limit.

**limit_type**: `membership_activation`

**configuration**:

```json
{
    "limit": 3 // Must a positive integer
}
```

**Example full payload**

```json
{
  "data": {
    "type": "limits",
    "attributes": {
      "limit_type": "membership_activation",
      "configuration": {
        "limit": 1
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

### Membership Award Count

Used to Limit the number of times that an [Earning Mechanism](/guides/offers/earning-mechanisms)'s `award` may be given to a given membership; often called the "fulfillment" of the offer.

**limit_type**: `membership_award_count`

**configuration**:

```json
{
    "limit": 3 // Must a positive integer
}
```

**Example full payload**

```json
{
  "data": {
    "type": "limits",
    "attributes": {
      "limit_type": "membership_award_count",
      "configuration": {
        "limit": 1
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
