---
documentType: "resource"
title: "Reward Segmentation"
layout: "tutorial"
---

# API Reference

Reward-Segments are exposed as a JSON-API relationship via the [add required segments](/api/#add-required-segments) and [remove required segments](api/#remove-required-segments) apis.

# What is a Reward Segment?

A Reward Segment is a relationship between a [Reward](/guides/rewards) and a [Custom Segment](/guides/custom-segments) which indicates that a reward "belongs" in a certain segment.

# How are Reward Segments configured?

Reward-Segments may [created](/api/#add-required-segments) or [removed](/api/#remove-required-segments) in order to define the relationship between a reward and a number of segments. By creating a relationship between a reward and one or more segments, the Hatch API will indicate whether a membership is eligible to redeem a reward when calling the [Membership Rewards](/api/#list-membership-rewards) api. When a membership is not in a required segment, a reward's `eligible` field will read `false`, and the `visible_status` field will read `missing_required_segments`. Rewards that are tagged with **no** segments will be visible to all memberships. For more details on how to interpret the relationship between a reward and its segments, see the visible_status section of the [Rewards](/guides/rewards#visible-status) guide.
