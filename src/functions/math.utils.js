var factorial = n => {
  if (n < 3) {
    return n;
  }
  return n * factorial(n - 1);
};

var binomial = (n, p) => {
  return factorial(n) / factorial(p) / factorial(n - p);
};

export default binomial;
