---
title: Getting Started with React Context
description: Understanding how to use Context in React to manage application state
date: 2020-02-01
tags: development
layout: layouts/post.njk
---

Application state can be tricky to manage in React applications. It’s possible to pass data and props down through the component hierarchy, but this can quickly become difficult to manage if there are lots of components, and if component nesting is deep. 

Redux is a popular solution, but it comes with its own set of overheads (i.e., lots of boilerplate code). It can also be overkill for some projects. In this post I’m going to look at using React Context to manage application state. 

> I’ve created a [Git repository](https://github.com/aaronmarr/react-context-example-counter) containing the code in this tutorial. You can also [preview the live application](https://goofy-davinci-aed1d7.netlify.com/) if you want a peek at what we’ll be building.

## What is React Context?
From the React documentation:

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

What this means is that we can define data in one place (usually near the top of the component tree), and then consume this data in any components further down the tree without having to pass props through each component. 

### Context Provider

The context provider is a React component which allows consuming components to subscribe to changes. We’ll use this component to pass data and methods to consuming components further down the tree.

### Context Consumer

The context consumer is a React component which allows you to subscribe to changes in the provider. We’ll use the consumer to make our data available to our child component.

## Create the application
Let’s start by creating a basic application using `create-react-app`. 

```bash
npx create-react-app react-context-example && cd react-context-example
yarn start
```

If you visit http://localhost:3000/, you should see the React application running in your browser. 

## Create the Provider Context
The first thing we’ll look at is the Provider Context. The Provider will encapsulate a `counter` state object, as well as `handleIncrement` and `handleDecrement` functions for incrementing and decrementing the count value.

Create a new file called `CounterContext.js`.

```js
import React from 'react';
const { Consumer, Provider } = React.createContext();

class CounterProvider extends React.Component {
  // Our state object consists of a simple 'counter' value
  state = {
    counter: 0
  };

  handleIncrement = () => {
    this.setState({ counter: ++this.state.counter });
  };

  handleDecrement = () => {
    this.setState({ counter: --this.state.counter });
  };

  render() {
    return (
      // Our privider component returns a new React provider 
      // context
      <Provider
        // Any items passed to the 'value' property on the 
        // provider will be made available in the consumer.  
        // In our case, we pass a copy of the state (counter) 
        // and the increment and decrement handlers.
        value={\{ 
          ...this.state,
          onIncrement: this.handleIncrement,
          onDecrement: this.handleDecrement,
        }} 
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { CounterProvider, Consumer as CounterConsumer };

```

We’ve implemented our provider component, but we still need to add it to our application’s component tree. Update `App.js` so that it looks like the following:

```js
import React from ‘react’;
import { CounterProvider } from ‘./CounterContext’;
import Counter from './Counter';

import ‘./App.css’;

function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}

export default App;
```

As you can see,  `CounterProvider` is the root component for our application. The provider doesn’t necessarily need to be the root component, it just needs to wrap any children which will consume the context. In this case, the consumer will reside in the `Counter` component, which we will define next.

## Create the consumer context
Let’s create the `Counter` component now. Create a new file, `Counter.js`. This component will implement the `CounterConsumer`. The consumer accepts a single function as its child, and the first argument to this function is the value of the `value` property of our `provider` component (i.e., `counter`, `onIncrement` and `onDecrement`).

```js
import React from ‘react’;
import { CounterConsumer } from ‘./CounterContext’;

class Counter extends React.Component {
  render() {
    return (
      // Here we’re implementing the consumer, which will give 
      // us access to values defined in the provider context.
      // The consumer accepts a single function as it’s child,  
      // and should return any elements or fragments.
      // The first argument of this function is whatever is passed 
      // into the 'value' property of the provider. In this case, 
      // it’s an object with 3 properties. We can destructure 
      // these using the render props pattern.
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

As you can see, by wrapping our component in the `<CounterConsumer>` component, and using the render props pattern, we now have access to data and methods defined in the context. 

This has been a super-quick look at React Context. I hope you’ve found it useful. Thanks for reading.

