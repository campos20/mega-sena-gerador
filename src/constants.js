import { binomial } from "../src/math.functions";

export const CHOICES_MIN = 6;
export const CHOICES_MAX = 15;

export const MEGA_SENA_MIN = 1;
export const MEGA_SENA_MAX = 60;

// TODO fetch from some API
export const MEGA_SENA_VALUE = 5; // R$ 5,00

// For now, we do not allow very large values for bets, only about 100k.
export const MAX_BET_VALUE =
  (binomial(CHOICES_MAX, CHOICES_MIN) *
    MEGA_SENA_VALUE *
    (MEGA_SENA_MAX - MEGA_SENA_MIN + 1)) /
  CHOICES_MAX;
