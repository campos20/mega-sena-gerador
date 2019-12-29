var factorial = n => {
  if (n < 2) {
    return 1;
  }
  return n * factorial(n - 1);
};

var binomial = (n, p) => {
  return factorial(n) / factorial(p) / factorial(n - p);
};

export default binomial;
