import { SET, RESET, UPDATE, REMOVE, APPEND, PREPEND } from './constants'
import initialState from './initialState'
export function set(key: keyof typeof initialState, data: any) {
  return {
    type: SET,
    data,
    key,
  }
}

export function reset(key: keyof typeof initialState) {
  return {
    type: RESET,
    data: null,
    key,
  }
}

export function update(key: keyof typeof initialState, data: any) {
  return {
    type: UPDATE,
    data,
    key,
  }
}

export function remove(key: keyof typeof initialState, data: any) {
  return {
    type: REMOVE,
    data,
    key,
  }
}

export function append(key: keyof typeof initialState, data: any) {
  return {
    type: APPEND,
    data,
    key,
  }
}

export function prepend(key: keyof typeof initialState, data: any) {
  return {
    type: PREPEND,
    data,
    key,
  }
}
