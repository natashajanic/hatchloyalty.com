---
title: "Rewards"
layout: "tutorial"
---

# API Reference

Rewards are exposed via an API resource called [Rewards](/api/#rewards).

# What is a Reward?

A Reward is a way to give real value to the points provided as an incentive in [Offers](/guides/offers). A Reward may be thought of as a coupon for a discounted product or service and, in part, defines the exchange rate between points and real-world monetary value. A Reward is a tool that both motivates a Membership to earn points by engaging with Offers, and encourages a Membership to return to your business in order to redeem their value.

The [Redemption](/api#redemptions) of a Reward helps build a stronger relationship with a Membership, and also provides an opportunity for up-sell as they are incentivized to return. Please see our full [tutorial on Redemptions](/tutorials/reward-redemption) for more details on how a Redemption is created and fulfilled by a point of sale or other service.

# How are Rewards configured?

Rewards are [created](/api#create-rewards) with a publication window (its `publish_at` and `expire_at` attributes) which dictates when it is available for redemption, as well as the number of `points` that a Membership must spend in order to redeem it. Rewards should also be configured with consumer-facing [Marketing Contents](/guides/rewards/marketing-contents), which contain copy and an image asset that describes what Rewards are and why a Membership may want to spend points to redeem them.

Rewards may also be targeted to a certain set of Memberships when configured with one or more [Segments](/guides/rewards/segmentation).

# When may a membership redeem the configured reward?

The ability for a membership to redeem the reward is dictated by the reward's cost, a membership's point balance, and any segmentation that has been applied to the reward. These factors are used to calculate two important attributes which may be used to show, hide, or otherwise decorate the display of the reward when it's being shown to a membership (e.g., when at the point of sale, or in the program's mobile application). Those two attributes are: `eligible` and `visible_status`.

# Membership-Reward Attributes

The `eligible` and `visible_status` attributes are returned with the reward when called via the [Membership Rewards](/api/#membership-rewards) api, and are described in more detail below. These are not included when calling the [Rewards](/api/#rewards) api without a membership.

## Eligible

**Possible Values**: `true`, `false`

The Membership-Reward's `eligible` attribute dictates whether a membership may redeem the reward. A value of `false` indicates that, even if a membership (or a system on behalf of a membership) were to attempt to create a Redemption, it would not be granted. A value of `false` **does not** necessarily mean that the reward should be hidden from a membership, as they may earn enough points or engage in another activity that will make them eligible.

A value of `true` indicates that a membership is allowed to redeem the reward.

Eligible will be **false** if:

1.  The reward is [discontinued](/api/#discontinue-reward)
1.  The reward is expired (its `publish_at` is in the future or its `expire_at` is in the past)
1.  A membership does not have enough points to redeem the reward
1.  The reward is not visible to a membership (see [visible status](#visible-status) below)

## Visible Status

**Possible Values**: `visible`, `reward_discontinued`, `reward_expired`, `missing_required_segments`

The Membership-Reward's `visible_status` attribute dictates whether a membership should be able to view (and thus redeem) the reward. A value of `visible` indicates that a membership should be shown the reward. Any other value indicates a reason that the reward should be "hidden" from a membership. As with an ineligible reward, a membership will not be allowed to redeem the reward when it isn't visible.

**Visible Status Details**

1.  **visible**: A membership falls within required segments (or the reward is not configured with segments), and their point balance is greater than or equal to the reward's cost. This reward is available for a membership to engage with.
1.  **reward_discontinued**: The reward has been [discontinued](/api/#discontinue-reward).
1.  **reward_expired**: The reward's `publish_at` is in the future, or its `expire_at` is in the past.
1.  **missing_required_segments**: One or more [segments](/guides/rewards/segmentation) have been configured for this reward, and a membership does not belong to the required segments.
