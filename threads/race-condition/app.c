#include <stdio.h>
#include <pthread.h>

#define COUNT 100
#define THREADS 4

long number = 0;

void* calc(void* arg) {
  for (long i = 0; i < COUNT; i++) {
    ++number;
  }

  return NULL;
}

int main() {
  pthread_t threads[THREADS];

  for (int i = 0; i < THREADS; i++) {
    pthread_create(&threads[i], NULL, calc, NULL);
  }

  for (int i = 0; i < THREADS; i++) {
    pthread_join(threads[i], NULL);
  }

  printf("Final number: %ld\n", number);
  printf("Expected value: %ld\n", (long)COUNT * THREADS);

  return 0;
}
