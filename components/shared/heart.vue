<template>
  <div class="heartbeatloader">
    <svg
      class="svgdraw"
      width="100%"
      height="100%"
      viewBox="0 0 150 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="path"
        d="M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0"
        fill="transparent"
        stroke-width="4"
        stroke="black"
      />
    </svg>
    <div class="innercircle" />
    <div class="outercircle" />
  </div>
</template>
<script>
export default {
  name: 'Heartbeat'
}
</script>
<style>
.heartbeatloader {
  position: absolute;
  width: 20vmin;
  height: 20vmin;
  z-index: 1;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.svgdraw {
  top: 0px;
  left: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(1.4);
  z-index: 3;
}
.path {
  stroke: rgba(3, 3, 3, 0.95);
  stroke-width: 4;
  stroke-dasharray: 1000px;
  stroke-dashoffset: 1000px;
  animation: draw 1.5s infinite forwards normal linear;
  animation-delay: 0.1s;
  position: relative;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
.innercircle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(209, 28, 28, 0.705);
  position: absolute;
  z-index: 1;
  margin: auto;
  top: 0;
  opacity: 0.9;
  animation: innerbeat 1.5s infinite linear forwards;
}
@keyframes innerbeat {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  60% {
    transform: scale(1.05);
  }
  75% {
    transform: scale(1.2);
  }
}
.outercircle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(230, 92, 92, 0.774);
  box-shadow: 0 0 40px 20px #fff;
  position: absolute;
  z-index: -1;
  opacity: 0.9;
  top: 0;
  left: 0;
  transform: scale(1.2);
  animation: outerbeat 1.5s infinite linear forwards;
}
@keyframes outerbeat {
  0% {
    transform: scale(1.2);
  }
  10% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.3);
  }
  60% {
    transform: scale(1.25);
  }
  75% {
    transform: scale(1.3);
  }
}
</style>
