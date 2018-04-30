+++
title = "Java: Get Sub List of Elements between two elements (instead of indexes) in a List"
description = ""
slug = "../java-get-sub-list-of-elements-between-two-elements-instead-of-indexes-in-a-list"
author = "Lobo"
comments = "true"
date = "2011-10-25 04:51:59"
timezone = "CDT"
categories = ["1"]
tags = ["Java", "sublist", "collection"]
+++

<small>Update: moved the code to [github](https://github.com/lobopraveen/Java-betterSublist)</small>

Java List APIs provides a way to get the elements (sub-list) in a List between two indexes using `List subList(int fromIndex, int toIndex)`. However, there is no API to get the elements in a List between two list elements `List subList(Object fromElement, Object toElement)`. The following code is an example to get the elements (sub-list) "between two list elements". This works even if the given element doesn't exist in the List - imagine a list of items with different prices and a sub-list of items between price X and price Y when, say, there are no items with price X or Y.

The following code, sorts the list and creates a clone just to make sure the original list is unaffected by the method. If the list of items are always expected to be in sorted order, then the clone and sort can be removed. Also, note that this method uses binary search; if the size of the list is small, brute force approach would be efficient than this.

Note that the Item needs `compareTo()` and `equals()` override for binary searching and `Collection.sort()` respectively.

{{< highlight Java >}}
import java.math.BigDecimal;

public class Item implements Comparable<Item> {

 private String name;
 private BigDecimal price;

 @Override
 public int compareTo(Item item) {
  return this.price.compareTo(item.price);
 }

 @Override
 public boolean equals(Object o) {
  return this.price.equals(((Item)o).getPrice());
 }

 @Override
 public String toString() {
  return this.name + " - " + this.price;
 }

 Item(String name, BigDecimal price) {
  setName(name);
  setPrice(price);
 }

 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }

 public BigDecimal getPrice() {
  return price;
 }

 public void setPrice(BigDecimal price) {
  this.price = price;
 }
}
{{< / highlight >}}


{{< highlight Java >}}
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Store {

 // list to hold the items in stock
 private List<Item> itemsInStock;

 public List<Item> getItemsInStock() {
  return itemsInStock;
 }

 public void setItemsInStock(List<Item> itemsInStock) {
  if (this.itemsInStock == null) {
   this.itemsInStock = itemsInStock;
  } else {
   this.itemsInStock.addAll(itemsInStock);
  }
 }

 public void setItemInStock(Item item) {
  if (this.itemsInStock == null) {
   this.itemsInStock = new ArrayList<Item>();
  }
  this.itemsInStock.add(item);
 }

 /**
  * Answers a List of Items from the items in stock between the low price and
  * the high price passed to it. The List returned is <b>backed by</b> the
  * actual items in stock so changes to one are reflected by the other.
  *
  *
  * @param lowPrice
  *            the lowest price of the items to fetch
  * @param highPrice
  *            the highest price of the items to fetch
  *
  * @return a List of Items in stock; null if there are no items between the
  *         lowest and the highest price.
  */
 public List<Item> getItemsInStock(BigDecimal lowPrice, BigDecimal highPrice) {

  // create dummy items for search
  Item startItem = new Item(null, lowPrice);
  Item endItem = new Item(null, highPrice);

  // clone the list so that the ordering of the items in the list is not affected
  List<Item> itemsClone = new ArrayList<Item>(this.itemsInStock);

  // sort the items for binary search
  Collections.sort(itemsClone);

  // Read binary search() documentation for more details.
  int fromIndex = Collections.binarySearch(itemsClone, startItem);
  int toIndex = Collections.binarySearch(itemsClone, endItem);

  // If the low price is not found, get insertion point
  if (fromIndex < 0) {
   // After this, fromIndex will be between ( 0...total items)
   fromIndex = -(fromIndex + 1);
  } else {
   // binary search doesn't necessarily return first matching item
   while (fromIndex > 0 && itemsClone.get(fromIndex).equals(itemsClone.get(fromIndex - 1))) {
    fromIndex--;
   }
  }

  // If the high price is not found, get (insertion point - 1 )
  if (toIndex < 0) {
   // After this, toIndex will be between ( -1...total items-1)
   toIndex = -(toIndex + 2);
  } else {
   // binary search doesn't necessarily return last matching item
   while (toIndex < (itemsClone.size() - 1) && itemsClone.get(toIndex).equals(itemsClone.get(toIndex + 1))) {
    toIndex++;
   }
  }

  /*
   * We have items between start and end ONLY IF fromIndex is <= toIndex
   * and fromIndex is != total items and toIndex is != -1
   */
  if (toIndex < fromIndex) {
   return null;
  }

  // Return a view of the list
  return itemsClone.subList(fromIndex, toIndex + 1);
 }
}
{{< / highlight >}}


{{< highlight Java >}}
import java.math.BigDecimal;
import java.util.List;

public class Test {

 public static void main(String args[]) {

  Store s = new Store();
  s.setItemInStock(new Item("Nexus S", new BigDecimal(300)));
  s.setItemInStock(new Item("Galaxy S 4G", new BigDecimal(400)));
  s.setItemInStock(new Item("Nexus S 4G", new BigDecimal(400)));
  s.setItemInStock(new Item("Galaxy S2", new BigDecimal(700)));
  s.setItemInStock(new Item("Xperia Arc", new BigDecimal(500)));
  s.setItemInStock(new Item("Sensation 4G", new BigDecimal(600)));
  s.setItemInStock(new Item("Galaxy Nexus", new BigDecimal(750)));
  s.setItemInStock(new Item("iPhone 5", new BigDecimal("799.99")));

  // Get items from Store between 299 and 799
  List<Item> itemsInRange = (List<Item>) s.getItemsInStock(new BigDecimal(299), new BigDecimal(799));

  if (itemsInRange != null) {
   for (Item i : itemsInRange) {
    System.out.println(i);
   }
  } else {
   System.out.println("Sorry, no items found in the price range!");
  }
 }
}
{{< / highlight >}}


OUTPUT for items between 299 & 799
```
Nexus S - 300
Galaxy S 4G - 400
Nexus S 4G - 400
Xperia Arc - 500
Sensation 4G - 600
Galaxy S2 - 700
Galaxy Nexus - 750
```
