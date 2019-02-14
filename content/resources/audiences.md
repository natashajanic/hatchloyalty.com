---
documentType: "resource"
title: "Offer Audiences"
layout: "tutorial"
---

# API Reference

Audiences are exposed via an API resource called [Audiences](/api/#audiences).

# What is an Audience?

An Audience is an offer component that enforces targeting of the offer to certain memberships based on a specific behavioral or demographic aspect of those memberships. Zero, one, or many Audiences may be associated to an offer. When an Audience is defined, a given membership must fall "within" all configured audiences in order to view and engage with the offer. An offer with no audiences is visible to all memberships.

Audiences may be selected when the offer (or, more generally, the marketing initiative being configured in Hatch) requires any form of specific targeting. Depending on the requirements of the offer, one or more Audiences may be selected and configured for the offer, e.g., if the offer is meant for a demographic aged 18-35, the [Age Within](#age-within) audience should be used; if those memberships should _also_ belong to the "gold-tier" custom segment, then [In All Segments](#in-all-segments) audience should _also_ be used. When multiple Audiences are configured for an offer, the membership must be "in" **every** audience in order to interact with, or "see," the offer.

The Hatch API indicates whether a particular membership should "see" that offer via the `visible_status` attribute of a request to the [Membership Offers](/api/#membership-offers) endpoint. A value of `visible` indicates that the membership should be shown the offer (and that they are free to engage with it). Any other value indicates that there is a reason it should be hidden. For more details on `visible_status` see the [Visibility](/guides/offers#visible_status) section of our Offer Guide.

# How is an Audience configured?

An Audience may be configured for an offer via the [Create Audience api](/api/#create-audience). The payload for creating an Audience follows the general JSON-API structure (below), with the following note: when selecting a particular type of audience for creation, the `audience_type` attribute indicates which audience is selected. This dictates which attributes should be included in the `configuration` attribute in order to correctly configure the particular audience.

**General Create Audience API structure**

```json
{
  "data": {
    "type": "audiences",
    "attributes": {
      "audience_type": "__Indicates the type of Audience being configured.__",
      "configuration": {
        // A hash of configuration values. The structure of this hash changes depending on the audience type selected.
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "__ID of the offer that the Audience is associated with.__"
        }
      }
    }
  }
}
```

# What Audiences are available?

## Demographic Audiences

1.  [Age Within](#age-within)

## Custom-Segment Audiences

1.  [In All Segments](#in-all-segments)
1.  [In Any Segment](#in-any-segment)

---

### Age Within

Used to enforce a minimum and/or maximum age restriction on the offer. Age calculation is based on the `birthday` of a membership.

**audience_type**: `age_within`

**configuration**:

```json
{
  "minimum_age": 18, // Minimum age, may be null if no minimum age should be enforced
  "maximum_age": 35  // Maximum age, may be null if no maximum age should be enforced
}
```

**Example full payload**

```json
{
  "data": {
    "type": "audiences",
    "attributes": {
      "audience_type": "age_within",
      "configuration": {
        "minimum_age": 18,
        "maximum_age": null
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

### In All Segments

Used to ensure that the membership belongs to **all** of the specified segments. Segments are referenced by their Hatch Platform ID, and must be created prior to configuring this audience. Read more about segments in the [Custom Segments Guide](/guides/custom-segments). See the [Behavioral Offer Tutorial](/tutorials/behavioral-offer#step-4-em-describe-the-target-audience-em) for an example of configuring segments, assigning them to memberships, and enforcing them on an offer.

**audience_type**: `in_all_segments`

**configuration**:

```json
{
  // A list of one or more segment IDs
  "segments": ["ad629e56-cafb-487e-9d88-93ee0e2147ea", "86d2ba4a-33e5-4635-b8a2-5ec431368f6a"]
}
```

**Example full payload**

```json
{
  "data": {
    "type": "audiences",
    "attributes": {
      "audience_type": "in_all_segments",
      "configuration": {
      "segments": ["ad629e56-cafb-487e-9d88-93ee0e2147ea", "86d2ba4a-33e5-4635-b8a2-5ec431368f6a"]
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

### In Any Segment

Used to ensure that the membership belongs to **at least one** of the specified segments. Segments are referenced by their Hatch Platform ID, and must be created prior to configuring this audience. Read more about segments in the [Custom Segments Guide](/guides/custom-segments). See the [Behavioral Offer Tutorial](/tutorials/behavioral-offer#step-4-em-describe-the-target-audience-em) for an example of configuring segments, assigning them to memberships, and enforcing them on an offer.

**audience_type**: `in_any_segment`

**configuration**:

```json
{
  // A list of one or more segment IDs
  "segments": ["ad629e56-cafb-487e-9d88-93ee0e2147ea", "86d2ba4a-33e5-4635-b8a2-5ec431368f6a"]
}
```

**Example full payload**

```json
{
  "data": {
    "type": "audiences",
    "attributes": {
      "audience_type": "in_any_segment",
      "configuration": {
      "segments": ["ad629e56-cafb-487e-9d88-93ee0e2147ea", "86d2ba4a-33e5-4635-b8a2-5ec431368f6a"]
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
