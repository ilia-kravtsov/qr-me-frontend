import { Component } from 'react';

type CounterProps = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

class Counter extends Component<CounterProps> {
  render() {
    const { count, onIncrement, onDecrement } = this.props;

    return (
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
