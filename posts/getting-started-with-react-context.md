---
title: Getting Started with React Context
description: Understanding how to use Context in React to manage application state
date: 2020-02-01
tags: development
layout: layouts/post.njk
---

Application state can be tricky to manage in React applications. While it’s possible to pass data down through the component hierarchy, this can quickly become difficult to manage if there are lots of components, and component nesting is quite deep. 

Redux is a popular solution, but it comes with its own set of overheads (such as setting up the containers, actions and reducers), and can be overkill for some projects. In this post I’m going to look at using React Context to manage application state. Let’s take a look.

## Create the application
We’ll start by initialising a basic application using `create-react-app`. We’ll then create a `CounterContext` component which will encapsulate all the logic and data for maintaining a simple counter. We’ll then `consume` this context within our application, and see how this allows us to manage and update our counter state object. 

To begin, initialise a new React application:

```js
npx create-react-app react-context-example && cd react-context-example

yarn start

Compiled successfully!

You can now view context-example in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.0.9:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Next, we’ll create our counter context. 

## Create the Provider
Create a new file called `CounterContext.js`. This context will encapsulate a simple state object for the `counter`, as well as `handleIncrement` and `handleDecrement` functions for manipulating the state.

```js
import React from 'react';
const { Consumer, Provider } = React.createContext();

class CounterProvider extends React.Component {
  // Our state object contains a simple 'counter' value, 
  // which is initialised to '0'
  state = {
    counter: 0
  };

  // Our provider privides a 'handleIncrement' method to 
  // increment the counter
  handleIncrement = () => {
    this.setState({ counter: ++this.state.counter });
  };

  // We also have a decrement handler for decrementing 
  // the counter
  handleDecrement = () => {
    this.setState({ counter: --this.state.counter });
  };

  render() {
    return (
      // Our privider returns a new React provider context, 
      // passing any children.
      // The value which this provider provides to the 
      // consumer is a copy of the state (e.g. the counter) 
      // and the increment and decrement handlers.
      <Provider
      // Anything passed to 'value' will be made available 
      // to consumers
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

Now that we’ve created our provider, let’s implement this in our application. Update `App.js` so that it looks like the following:

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

Here, we’ve made our `CounterProvider` the root component. This will later allow us to consume the context in any child components (in this case the yet-to-be-defined `Counter` component). 

## Create the consumer context
Let’s create the `Counter` component now. Create a new file, `Counter.js`.  This component will implement the `CounterConsumer`. The consumer accepts a single function as it’s child, and the first argument to this function is the value of the `value` property of our `provider`  component (i.e., `counter`, `onIncrement` and `onDecrement`).

```js
import React from ‘react’;
import { CounterConsumer } from ‘./CounterContext’;

const Counter = () => (
  // Here we’re implementing the consumer, which will give 
  // us access to anything which was defined in the provider 
  // context.
  // The consumer accepts a single function as it’s child. 
  // This function should be used to return any elements or 
  // fragments.
  // The first argument of this function is whatever we passed 
  // into the 'value' property of the provider. In this case, 
  // it’s an object with 3 properties which we can destructure 
  // and utilise within this component
  <CounterConsumer>
    {({ counter, onIncrement, onDecrement }) => (
      <div>
        <h1>{counter}</h1> 
        <button onClick={onIncrement}>+</button> 
        <button onClick={onDecrement}>-</button> 
      </div>
    )}
  </CounterConsumer>
);

export default Counter;
```

If you run this application you should see that there is a counter printed to the screen and you can use the buttons to increment and decrement the count. This has been a super-quick look at React Context. I hope you've found it useful. Thanks for reading.