export const ROOT_CHANGED = 'ROOT_CHANGED'
export const ROOT_LOGIN = 'login'
export const ROOT_AFTER_LOGIN = 'after-login'
export const SAVE_APP_ICONS = 'SAVE_APP_ICONS'

const initialState = {
  root: undefined  
}

export default (state = initialState, action = {}) => {
  switch (action.type) {    
    case ROOT_CHANGED:
      return { ...state, root: action.root}
    case SAVE_APP_ICONS:
      return { ...state, icons: action.icons}
    default:
      return state
  }
}

export const changeAppRoot = (root) => ({
  type: ROOT_CHANGED, 
  root
})

export const saveIcons = (icons) => ({
  type: SAVE_APP_ICONS, 
  icons
})
