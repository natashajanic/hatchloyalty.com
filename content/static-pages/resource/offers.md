---
documentType: "resource"
title: "Offers"
layout: "tutorial"
---

# API Reference

Offers are exposed via an API resource called [Offers](/api/#offers).

# What is an Offer?

In Hatch, an Offer is the primary way in which a program works to influence consumer behavior.

An Offer, when fully assembled, represents the beneficial consumer behavior that a client would like their memberships to engage with, as well as the way those memberships are incentivized to do so. An Offer also includes any additional Constraints that must be met prior to fulfillment, the Audience that an Offer is meant to be visible to, any Limits on fulfillment or activation of the Offer, and the Marketing Content used to display an Offer to a membership.

# How are Offers configured?

Offers are configured with important metadata that manage the initiative as a whole: a `category` and `external_id` so that they may be properly recognized by a client system; the `publish_at` and `expire_at` fields that dictate when Offers are active in the marketing program. Offers without further configuration do not represent an active part of a loyalty program. Offers are, rather, a resource that must be created first in order for other _offer components_ to be configured which describe a marketing initiative.

# An Offer's Components

The marketing initiative that an Offer represents is described by five **components**:

  - **[Earning Mechanism](/guides/offers/earning-mechanisms)**: The behavior that the marketing initiative promotes, as well as the incentive given to a membership for engaging with it, e.g., the purchase of a specific product in exchange for points.
  - **[Constraints](/guides/offers/constraints)**: Any pre-fulfillment actions or conditions that must be met in order for a membership to engage an Offer, e.g., "activation".
  - **[Audiences](/guides/offers/audiences)**: Any factors that dictate the subset of memberships that should be targeted by an Offer, e.g., that a membership is in a required [custom segment](/guides/custom-segments).
  - **[Limits](/guides/offers/limits)**: Any limits, either global or per-membership, that fulfillment or engagement with an Offer must abide by, e.g., a limit of 4000 fulfillments total.
  - **[Marketing Contents](/guides/offers/marketing-contents)**: The locale-specific marketing copy that is shown to a membership in a mobile application or digital signage, e.g., the title and an image.

# What membership may engage with an offer?

The ability for a membership to engage with an offer is dictated by that offer's constraints, audiences, and limits. These three _offer components_ are used to calculate four important attributes, which may be used to show, hide, or otherwise decorate the display of an Offer when it's being displayed to a particular membership (e.g., when at the point of sale, or in the program's mobile application). Those four attributes are: `eligible`, `visible_status`, `must_activate` and `activated`. A fifth attribute, `fulfillment_count`, indicates the number of times that that membership has already successfully engaged with the Offer.

# Membership-Offer Attributes

The above attributes are returned with an offer when called via the [Membership Offers](/api/#membership-offers) api, and are described in more detail below. The attributes `eligible`, `visible_status`, `must_activate`, and `activated are not included when calling the [Offers](/api/#offers) api without a membership; `fulfillment_count` is still returned, but represents the **total** number of fulfillments across all memberships, rather than the number of fulfillments by a single membership.s

## Eligible

**Possible Values**: `true`, `false`

The Membership-Offer's `eligible` attribute dictates whether a membership may "fulfill" or otherwise engage with the offer in order to earn its award. A value of `false` indicates that, even if the membership exercises the behavior dictated by the offer's earning mechanism (e.g., buys the promoted products), they will not receive the award. A value of `false` **does not** necessarily mean that the offer should be hidden from the user, as they may be able to take an action that will allow it to become eligible.

A value of `true` indicates that the membership is allowed to engage with the offer, provided that it is also currently visible to them (see [Visible Status](#visible-status), below).

Eligible will be **false** if:

1.  The offer is [discontinued](/api/#discontinue-offer)
1.  The offer requires activation, and it is not yet activated (see: [Must Activate](#must-activate), below).

## Visible Status

**Possible Values**: `visible`, `global_limit`, `member_limit`, `age_restricted`, `missing_required_segments`

The Membership-Offer's `visible_status` attribute dictates whether a membership should be able to view (and thus engage with) the offer. A value of `visible` indicates that the membership should be shown the offer. Any other value indicates a reason that the offer should be "hidden" from the member. As with an ineligible offer, a membership will not receive an award for a non-visible offer even if they exercise the behavior dictated by the offer's earning mechanism.

**Visible Status Details**

1.  **visible**: The membership falls within all configured audiences, and no limits have been reached. This offer is available for the membership to engage with.
1.  **global_limit**: One or more global [limits](/guides/offers/limits#global) have been reached. No further fulfillment of this offer is allowed.
1.  **member_limit**: One or more membership [limits](/guides/offers/limits#membership) have been reached. No further fulfillment of this offer is allowed for this membership.
1.  **age_restricted**: An age-restricted [audience](/guides/offers/audiences#age-restriction) has been configured for this offer, and the membership does not meet the designated age range based on the membership's birthday.
1.  **missing_required_segments**: One or more segment-based [audiences](/guides/offers/audiences#segmentation) has been configured for this offer, and the membership does not belong to the required segments. Read more in the [Custom Segmentation Guide](/guides/custom-segments).

## Must Activate

**Possible Values**: `true`, `false`

The Membership-Offer's `must_activate` attribute indicates whether an offer requires activation prior to becoming eligible for a membership to engage with. An offer will return `must_activate: true` when a [requires activation constraint](/guides/offers/constraints#requires-activation) has been configured for the offer. This indicates that the offer must be activated via a call to the [Membership-Offer activation](/api/#activate-membership-offer) api.

## Activated

**Possible Values**: `true`, `false`, `null`

The Membership-Offer's `activated` attribute indicates whether the offer has previously been activated for the membership via a call to the [Membership-Offer activation](/api/#activate-membership-offer) api. A value of `null` indicates that this offer does not require activation.

## Fulfillment Count

**Possible Values**: 0, or any positive integer

The Membership-Offer's `fulfillment_count` attribute returns the number of times that a membership has previously successfully engaged with the offer, and has earned the award configured along with its [earning mechanism](/guides/offers/earning-mechanisms). For offers that award a variable number of points, the fulfillment count will not indicate the total of points awarded, but will instead indicate the number of distinct times that the membership has received points.
