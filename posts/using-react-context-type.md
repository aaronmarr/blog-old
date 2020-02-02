---
title: Using React Context Types
description: Understanding how to use Context Types in React
date: 2020-02-02
tags: development
layout: layouts/post.njk
---

In a [previous post](/posts/getting-started-with-react-context/), I explored using React Contexts to manage application state. In this post I want to look at taking this approach one step further by using React context-types within the class. This can help reduce the amount of boilerplate within classes that consume React context. Let’s take a look.

This post follows directly from my [previous post](/posts/getting-started-with-react-context/) on React context, so please read that first before continuing here.

> Full source code for this tutorial can be [found here](https://github.com/aaronmarr/react-context-type-example)

## Recap
Let’s just recap what our consumer context looks like.

```js
import React from ‘react’;
import { CounterConsumer } from ‘./CounterContext’;

// We have a simple functional component which consumes
// the counter context
const Counter = () => (
  <CounterConsumer>
	  // Render props pattern gives us access to context
    {({ counter, onIncrement, onDecrement }) => (
      <div className=“counter”>
        <h1 className=“counter__count”>Count: {counter}</h1>
        <button className=“counter__inc” onClick={onIncrement}>+</button> 
		  <button className=“counter__dec” onClick={onDecrement}>-</button> 
      </div>
    )}
  </CounterConsumer>
);

export default Counter;
```

This works fine, but it does introduce a couple levels of nesting where we introduce the `Consumer` component and the render props function. 

## Using contextType
Now we’ll take a look at how to clean this up using contextType. Context-type is only available for React classes, so we’ll also need to upgrade the functional component to a React class-based component for this example. 

The first thing we’ll need to do (after upgrading the component to a class) is specify the `contextType`. This static property expects to be given the whole context, rather than just the consumer. We’ll update the import statement, so that we have access to the `CounterContext` object. We can assign this object to our `contextType` static prop. 

In the render method, we then have access to context via `this.context`. There’s also no need to wrap the return value in a context component, or use the render-props pattern as we did before. Let’s take a look at what this updated component looks like.

```js
import React from ‘react’;
// Update the import so that we have the full context
// object, rather than just the consumer
import { CounterContext } from ‘./CounterContext’;

class Counter extends React.Component {
  // We can specify a context-type for this class which
  // will let us consume the context
  static contextType = CounterContext;

  render() {
    // Instead of using the render props pattern, we can
    // destructure the this.context object directly.
    const { counter, onIncrement, onDecrement } = this.context;

    return (
      // No need to wrap the return value in a context component
      <div className=“counter”>
        <h1 className=“counter__count”>Count: {counter}</h1>
        <button className=“counter__inc” onClick={onIncrement}>+</button> 
        <button className=“counter__dec” onClick={onDecrement}>-</button> 
      </div>
    )
  }
};

export default Counter;
```

I feel like this a much clearer way to structure components that consume context. We did have to upgrade the component to a class-based component for this example – but remember, we’re just trying to illustrate the use of  `contextType` here. You may wish to leave any functional components as-is and apply this pattern only to class-based components. 

You may have noticed that this example doesn’t work in its current state. That’s because we need to update the `CounterContext` so that it exports the full context object.

```js
import React from ‘react’;

// Here we define a new variable for our context 
let CounterContext;
// Here we assign the full context object to our new variable
const { Consumer, Provider } = CounterContext = React.createContext();

...

// Finally we update the export so that it exports the full 
// context object, as well as the provider and consumer
export { CounterProvider, Consumer as CounterConsumer, CounterContext };
```

Now if you run the application, it should all be working.

I hope you’ve found this post useful. Thanks for reading.