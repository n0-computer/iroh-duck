import { Reducer } from "redux"

export enum SlideOverType {
  NONE,
  SOURCE_DETAILS,
}

export interface Message<T> {
  type: string
  payload?: T
}

export interface SlideOverAction extends Message<{ sheet: SlideOverType, data: any }> {}

const SET_SLIDE_OVER = "SET_SLIDE_OVER"
const DISMISS_SLIDE_OVER = "DISMISS_SLIDE_OVER"

export const setSlideOver = (sheet: SlideOverType, data: any): SlideOverAction => ({
  type: SET_SLIDE_OVER,
  payload: { sheet, data },
})

export const dismissSlideOver = (): SlideOverAction => ({
  type: DISMISS_SLIDE_OVER,
  payload: { sheet: SlideOverType.NONE, data: undefined },
})

export interface SlideOverAppState {
  sheet: SlideOverType
  data: any
}

const initialState: SlideOverAppState = {
  sheet: SlideOverType.NONE,
  data: undefined
}

export const SlideOverReducer: Reducer<SlideOverAppState, SlideOverAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_SLIDE_OVER:
      return {
        sheet: action.payload?.sheet || SlideOverType.NONE,
        data: action.payload?.data || undefined,
      }
    case DISMISS_SLIDE_OVER:
      return {
        sheet: SlideOverType.NONE,
        data: undefined,
      }
  }

  return state
}
