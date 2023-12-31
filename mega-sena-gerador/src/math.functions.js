const factorial = (n) => {
  if (n < 2) {
    return 1;
  }
  return n * factorial(n - 1);
};

export const binomial = (n, p) => {
  return factorial(n) / factorial(p) / factorial(n - p);
};

export const validateFixedInput = (input) => {
  if (!/\d+/.test(input)) {
    return false;
  }
  return true;
};
