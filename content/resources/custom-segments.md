---
documentType: "resource"
title: "Custom Segments"
layout: "tutorial"
---

# API Reference

Custom Segments are exposed via an API resource called [Segments](/api/#segments).

# What is a Custom Segment?

A Custom Segment is a way to classify Memberships into special segments that are not already supported by Hatch's other types of [Audiences](/guides/offers/audiences). A Custom Segment is created in Hatch, but the calculation and application of those segments are left to data analytics or business intelligence systems that the client controls.

# How are Custom Segments configured?

First, Hatch must be made aware of Custom Segments by the [creation of a Segment](/api/#create-segment). The ID of the Segment should be noted, as it will be used when applying segments to Membership, Offers, or Rewards.

Custom Segments must be applied by [adding](/api/#add-members-to-a-segment) (or [removing](/api/#remove-members-from-a-segment)) a relationship between the segment and the appropriate memberships. The presence of such a relationship indicates that the membership is "in" a segment.

Custom Segments may then be applied directly to a reward by [adding](/api/#add-required-segments) (or [removing](/api/#remove-required-segments)) a relationship between a reward and the appropriate segments. By tagging a reward with one or more segments, the Hatch API will indicate whether a membership is eligible to redeem a reward when calling the [Membership Rewards](/api/#list-membership-rewards) endpoint. When a aembership is not in a required segment, the reward's `eligible` field will read `false`, and the `visible_status` field will read `missing_required_segments`. Rewards that are tagged with **no** segments will be visible to all memberships.

Custom Segments may also be applied to an offer by creating the appropriate [Audience](/guides/offers/audiences) and associating it to the given offer. Similar to rewards, the presence of a segment-based audience will influence the `eligible` and `visible_status` fields based on the segments that have been applied to the membership, as well as the type of audience that has been created.
