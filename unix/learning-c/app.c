#include <stdio.h>

int main() {
  int a = 1;
  char message[] = "Hello World";
  unsigned int b = 25;
  char c = 'T';

  printf("Print an integer: %d\n", a);
  printf("Print a string: %s\n", message);
  printf("Print a number that cannot be negative: %u\n", b);
  printf("Print a Pointer Address: %p\n", &a);
  printf("Print a caracter: %c\n", c);
  printf("Print the ASCII value of caracter T: %d\n", c);
  return 0;
}
