title: Why your Java math might be wrong
date: 2011-06-16 11:00:00
tags:
- Java
---

We all know that mathematical operations with decimals in JavaScript are no good.
For instance:

```javascript
1.1 + 2.2; // should be 3.3, but the result is 3.3000000000000003
```

It turns out this is a cross to bare for pretty much any language that uses the
IEEE-754 standard to implement a floating point number and that includes...
*drums*... **Java**.

```java
// Adding doubles
System.out.println(1.1 + 2.2);   // 3.3000000000000003

// Adding floats
System.out.println(1.1f + 2.2f); // 3.3000002
```

So if you're doing these kinds of operations with `float` or `double` in Java you
might be doing them wrong.

This is huge because an application that deals with money is almost certain to
have to deal with decimals. You have to get it right or you'll be in a lot of trouble.

{% blockquote Douglas Crockford %}
People have a reasonable expectation that when you’re adding up their money
you’re going to come up with the right result, and you don’t.
{% endblockquote %}

`float` and `double` should never be used for currency or high precision operations.

The proper way to do this is using the `BigDecimal` class. Check out the
[documentation](http://goo.gl/r78E1).

Let's try it again, this time using `BigDecimal`:

```java
BigDecimal num1 = new BigDecimal(1.1);
BigDecimal num2 = new BigDecimal(2.2);
System.out.println(num1.add(num2)); // 3.30000000000000026645352591003756...etc.
```

Oh noes! what happened? I thought `BigDecimal` was supposed to solve all my problems.

Hold on, take another look at the code above. You'll notice we're constructing our
`BigDecimal` objects using a... *drums*... `double`.

So? Well, that's the deal with `float` and `double`, it's why they should not be
used in these operations. They cannot accurately represent numbers with decimals.

OK, how do we fix this? There's a constructor that takes a `String` argument
(didn't you look at the documentation?). That's how we should always do it. Pass
a `String` so you won't lose precision:

```java
BigDecimal num3 = new BigDecimal("1.1");
BigDecimal num4 = new BigDecimal("2.2");
System.out.println(num3.add(num4)); // 3.3, finally
```

Perfect! now lawsuits won't be falling from the sky.

Sources:

[Representing money](http://goo.gl/73HT9)

[Beware of floating point numbers](http://goo.gl/DE0Aw)
