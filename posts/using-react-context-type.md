---
title: Using React Context Types
description: Understanding how to use Context Types in React
date: 2020-02-02
tags: development
layout: layouts/post.njk
---

In my [previous post](/posts/getting-started-with-react-context/), I explored using React context to manage application state. In this post, I want to take a quick look at using React Context Types, which can help simplify consuming context in class-based components.

> This post follows directly on from my [previous post](/posts/getting-started-with-react-context/) on React context. If you haven’t already done so, I suggest reading that first. Full source code is also available in the [Git repository](https://github.com/aaronmarr/react-context-type-example).

## What are React Context Types
From the documentation:

> The contextType property on a class can be assigned a Context object created by  [React.createContext()](https://reactjs.org/docs/context.html#reactcreatecontext) . This lets you consume the nearest current value of that Context type using this.context. You can reference this in any of the lifecycle methods including the render function.

## Using context types
In my previous post, we created a `Counter.js` which defines a simple `Counter` component. Inside the render method, we wrap the component in a `Consumer` component, and use the render props pattern to access data and methods defined in the context. 

```js
import React from ‘react’;
import { CounterConsumer } from ‘./CounterContext’;

class Counter extends React.Component {
  render() {
    return (
      <CounterConsumer>
	      // Render props pattern gives us access to context
        {({ counter, onIncrement, onDecrement }) => (
          <div className=“counter”>
            <h1 className=“counter__count”>Count: {counter}</h1>
            <button className=“counter__inc” onClick={onIncrement}>
              +
            </button> 
            <button className=“counter__dec” onClick={onDecrement}>
              -
            </button> 
          </div>
        )}
      </CounterConsumer>
    )
  }
};

export default Counter;
```

Since React 16.6, we can now improve on this implementation using context types. We can use the `contextType` static property, which is available on React classes, to associate our `CounterContext` with our class. Then, inside the render method (or any lifecycle method), we can access the context via `this.context`. 

Let’s take a look at the updated `Counter` component.

```js
import React from ‘react’;
// Destructure the full context object from context
import { CounterContext } from ‘./CounterContext’;

class Counter extends React.Component {
  // Associate our context with the class
  static contextType = CounterContext;

  render() {
    // Now we can access context via this.context
    const { counter, onIncrement, onDecrement } = this.context;

    return (
      // No need to wrap the return value in a context component
      // or use render props pattern
      <div className=“counter”>
        <h1 className=“counter__count”>Count: {counter}</h1>
        <button className=“counter__inc” onClick={onIncrement}>
	        +
        </button> 
        <button className=“counter__dec” onClick={onDecrement}>
          -
        </button> 
      </div>
    )
  }
};

export default Counter;
```

I think this is a much more elegant solution for class-based components – the context values are readily available in lifecycle methods (such as render) and there is much less nesting required in the render function. 

I hope you’ve found this post useful. Thanks for reading.
