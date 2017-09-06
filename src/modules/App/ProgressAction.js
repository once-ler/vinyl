import Progress from 'react-progress-2';

const SHOW_PROGRESS = 'SHOW_PROGRESS';
const HIDE_PROGRESS = 'HIDE_PROGRESS';

const initialState = {
  percent: -1,
  intervalTime: 200,
  loading: false
};

export default (state = {}, action) => {
  switch (action.type) {
    case SHOW_PROGRESS:
      Progress.show();
      return {
        ...state,
        ...action,
        loading: true
      };
    case HIDE_PROGRESS:
      Progress.hide();
      return initialState;
  default:
    return state;
  }
};

export const showProgress = props => ({type: SHOW_PROGRESS, ...props});
export const hideProgress = () => ({type: HIDE_PROGRESS});
