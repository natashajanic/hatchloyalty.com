---
title: "Product Groups"
layout: "tutorial"
---

# API Reference

Product Groups are exposed via an API resource called [Product Groups](/api/#product-groups).

# What is a Product Group?

A Product Group is a reusable way to identify groups of products that are important to transaction-based [Offers](/guides/offers). A Product Group is applied to a [Transaction](/api/#transactions)'s line items at the time that the Transaction is created in Hatch, and the presence or absence of a Product Group on a line item determines the effect of evaluating a transaction-based Offer's [Earning Mechanism](/guides/offers/earning-mechanisms).

# How are Product Groups configured?

Product Groups are configured to inspect a certain `key` property of each line item, and are applied when that property's value matches a set of `values` that are configured on Product Groups.  Valid `key` properties are: **upc**, **sku**, or **group**. Products Groups `values` are configured as an array of case-insensitive strings.

# When is a product group applied?

A product group will be applied to a line item when a line item's designated property matches the product group. For example, consider the following two product groups, represented in their jsonapi structure:

```json
{
  "id": "de8d8206-87cc-4ec2-bbb5-04d37fbcaac6",
  "type": "product_groups",
  "attributes": {
    "key": "upc",
    "values": ["upc-001", "upc-002", "upc-003"]
  }
}
```

```json
{
  "id": "7d5a2e0d-9755-4531-9a88-445d7454669b",
  "type": "product_groups",
  "attributes": {
    "key": "group",
    "values": ["fuel"]
  }
}
```

Next, we'll consider line items with the following properties:

  - **Line Item A**:
    - `upc: "upc-002"`
    - `group: "merch"`
    - `sku: ""`
  - **Line Item B**:
    - `upc: ""`
    - `group: "fuel"`
    - `sku: "fuel-sku-1"`
  - **Line Item C**:
    - `upc: "upc-999"`
    - `group: ""`
    - `sku: "fuel"`

In this example:

  - The first product group (`de8d8206-87cc-4ec2-bbb5-04d37fbcaac6`) will be applied to **Line Item A** because it is configured by its `key` to inspect the line item's `upc`, and this line item's `upc` is listed in the product group's `values`.
  - The second product group (`7d5a2e0d-9755-4531-9a88-445d7454669b`) will be applied to **Line Item B** because it is configured by its `key` to inspect the line item's `group`, and this line item's `group` is listed in the product group's `values.
  - **Line Item C** will have no product groups applied; although its `sku` values _does_ match the value configured on the second product group, the second product group will ignore this value as it has been configured to inspect the `group` property of line items and not the `sku`.
