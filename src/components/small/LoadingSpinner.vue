<template lang="pug">
- lines = 10

mixin line(n)
  if n > 0
    .line
      +line(n - 1)

.lines
  - i = 1
  while i--
    +line(lines)
</template>

<style lang="scss" scoped>
.line {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  border: 8px solid transparent;
  border-color: #996a3f #fffdd1 #c7e9ff #472134;
  border-radius: 50%;
  animation: rotate 7s cubic-bezier(0.1, 1.19, 0.75, -0.13) infinite
    alternate-reverse;
}

@keyframes rotate {
  50% {
    border-radius: 50%;
  }
  100% {
    transform: rotateZ(1turn);
    border-radius: 56% 44% 67% 33% / 30% 51% 49% 70%;
  }
}
</style>
