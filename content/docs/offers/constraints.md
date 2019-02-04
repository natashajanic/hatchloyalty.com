---
title: "Offer Constraints"
layout: "tutorial"
documentType: "guide"
---

# API Reference

Constraints are exposed via an API resource called [Constraints](/api/#constraints).

# What is a Constraint?

A Constraint is an offer component that enforces certain preconditions that must be met in order for a membership to be "eligible" to engage with an offer. Some preconditions may be met at any time (e.g., the activation of an offer) while others depend on the context of the event resulting from the membership's activity (e.g., the location in which a transaction occurred). An offer may have many constraints, all of which must be satisfied in order for the membership to engage with the offer, or an offer can have no constraints configured.

A Constraint may be selected when the offer (or, more generally, the marketing initiative being configured in Hatch) has certain conditions that the membership must meet before or during fulfillment of the offer. For instance, if a brand partner requires intent be demonstrated by a membership, then the offer may [Require Activation](#requires-activation); or if legal restrictions require that an offer only be fulfillable within the state of Texas, the [Location In State](#location-in-state) constraint may be used.

The Hatch API indicates whether a membership may engage with an offer via the `eligible` attribute of a request to the [Membership Offers](/api/#membership-offers) endpoint. A value of `true` indicates that the membership is currently able to engage with the offer, whereas a value of `false` means that some portion of the preconditions are not met. For more, see the [Eligibility](/guides/offers#eligible) or [Activation](/guides/offers#must-activate) sections of our Offer Guide.

# How is a Constraint configured?

A Constraint may be configured for an offer via the [Create Constraint api](/api/#create-constraint). The payload for creating a constraint follows the general JSON-API structure (below), with the following note: when selecting a particular type of constraint for creation, the `constraint_type` attribute indicates which constraint is selected. This dictates which attributes should be included in the `configuration` attribute in order to correctly configure the particular constraint.

**General Create Constraint API structure**

```json
{
  "data": {
    "type": "constraints",
    "attributes": {
      "constraint_type": "__Indicates the type of Constraint being configured.__",
      "configuration": {
        // A hash of configuration values. The structure of this hash changes depending on the constraint type selected.
      }
    },
    "relationships": {
      "offer": {
        "data": {
          "type": "offers",
          "id": "__ID of the offer that the Constraint is associated with.__"
        }
      }
    }
  }
}
```

# What Constraints are available?

## Membership Actions

1.  [Requires Activation](#requires-activation)

## Activity Requirements

1.  [Location In State](#location-in-state)

---

### Location In State

Used to ensure that the fulfillment of the offer take place within a set of specified states. States must be specified by their two-letter code. When a [Transaction](/api#transactions) is created in Hatch, its `location_id` is matched to the corresponding [Location](/api#locations), and the location's state is used to determine whether the Location In State constraint is satisfied.

**constraint_type**: `location_in_state`

**configuration**:

```json
{
  // A list of one or more states by two-letter code
  "states": ["IL", "TX"]
}
```

**Example full payload**

```json
{
  "data": {
    "type": "constraints",
    "attributes": {
      "constraint_type": "location_in_state",
      "configuration": {
        "states": ["IL", "TX"]
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

### Requires Activation

Used to indicate that the offer must first be activated via the [Membership Offer Activation](/api/#activate-membership-offer) endpoint. Often used to capture intent from a membership before allowing the fulfillment of an offer. An offer that is activated and then fulfilled will be automatically deactivated for a membership, meaning that the membership must re-activate the offer before engaging with it again.

This Constraint also supports an optional `must_fulfill_within_days` parameter, used to enforce an eligibility window that begins when the offer is first activated for the membership.

**constraint_type**: `requires_activation`

**configuration**:

```json
{
  "must_fulfill_within_days": 7, // May be null, enforces that this offer must be fulfilled within 7 days of activation
}
```

**Example full payload**

```json
{
  "data": {
    "type": "constraints",
    "attributes": {
      "constraint_type": "requires_activation",
      "configuration": {
        "must_fulfill_within_days": 7
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
