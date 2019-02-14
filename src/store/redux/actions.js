

import {
  COUNT_DECREASE,
  COUNT_INCREASE,
} from './actionTypes'

export function countDecrease (count) {
  return { type: COUNT_DECREASE, count }
}

export function countIecrease (count) {
  return { type: COUNT_INCREASE, count }
}

