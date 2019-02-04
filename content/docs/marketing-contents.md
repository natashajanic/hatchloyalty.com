---
title: "Reward Marketing Contents"
layout: "tutorial"
---

# API Reference

Marketing Contents are exposed via an API resource called [Marketing Contents](/api#marketing-contents).

# What is a Marketing Content?

A Marketing Content is a general Hatch Platform resource that may be associated with several different entities. In this case, a Marketing Content represents a component of a Reward that composes various marketing copy for display to a Membership via a mobile application, website, or other digital signage.

# How are Marketing Contents configured?

Marketing Contents for a Reward are configured with attributes such as `title`, `short_description` and `image_url`, which may be used to communicate the value of the Reward and why the Membership may want to redeem it. Marketing Contents may also be configured with a `locale` so that if several Marketing Contents are related to a single Reward, the correct one may be chosen based on the locale of the Membership. For more detail on the attributes that may be configured, see the [Marketing Contents](/api#marketing-contents) resource.

# How is a marketing content associated with a reward?

Marketing Contents are assigned to a Reward by configuring the Marketing Content's [subject](/api/#update-subject-relationship) relationship.
