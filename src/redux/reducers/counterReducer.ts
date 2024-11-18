import { INCREMENT, DECREMENT } from '../actions/someActions';

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export const counterReducer = (
  state = initialState,
  action: { type: string },
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};


