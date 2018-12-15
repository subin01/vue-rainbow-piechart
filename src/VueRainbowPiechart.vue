<template>
  <div class="rainbow-piechart">
    <section class="links">
      <ul>
        <li
          v-for="(item, i) in list"
          :key="i"
          :class="{ active: i === active }"
        >
          <a
            href="#"
            @mouseover="rotate(i);"
          >{{ item.key }}</a>
        </li>
      </ul>
    </section>

    <section class="details">
      <ul>
        <li
          v-for="(item, i) in list"
          :key="i"
          :class="{ active: i === active }"
        >
          {{ item.value }}
        </li>
      </ul>
    </section>

    <section class="circle-outer">
      <div class="canvas">
        <div class="initial-rotator">
          <div
            class="rotator"
            :style="{ transform: 'rotate(' + rotation + 'deg)' }"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 300 300"
              v-for="(item, i) in list"
              :key="i"
              :id="'part_' + i"
              :class="{ active: i === active }"
              :style="{ transform: 'rotate(' + i * degree + 'deg)' }"
            >
              <path
                :d="theD"
                :style="{ stroke: getStroke(i, degree) }"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PieChart",
  props: {
    list: Array
  },

  data() {
    return {
      rotation: 0,
      active: 0
    };
  },

  computed: {
    degree() {
      return 360 / this.parts;
    },
    parts() {
      return this.list.length;
    },
    theD() {
      return this.describeArc(150, 150, 100, 0, this.degree);
    }
  },

  methods: {
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    },

    describeArc(x, y, radius, startAngle, endAngle) {
      var start = this.polarToCartesian(x, y, radius, endAngle);
      var end = this.polarToCartesian(x, y, radius, startAngle);

      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      var d = [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
      ].join(" ");

      return d;
    },

    getStroke(index, degree) {
      //return 'hsl(123,70%, 50%)';
      return "hsla(" + index * degree + ", 70%, 50%, 0.6)";
    },

    rotate(to) {
      this.rotation = 72 * to;
      this.active = to;
    }
  }
};
</script>

<style scoped>
li {
  text-align: left;
}
a {
  color: #42b983;
}

body {
  margin: 50px;
}

#app {
  width: 600px;
  height: 300px;
}

.links {
  float: left;
  width: 300px;
  height: 100px;

  a {
    display: block;
    margin: 15px;
  }
}

.circle-outer {
  //transform: rotate(20deg);
}

.canvas {
  background: #f2f2f2;
  height: 300px;
  width: 300px;
  position: relative;
  overflow: hidden;
  border: 1px solid;
}

.rotator {
  height: 300px;
  width: 300px;
  position: relative;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.initial-rotator {
  transform: rotate(2520deg);
  transition: transform 2s ease-in-out;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
}

path {
  fill: none;
  stroke: #ddd;
  stroke-width: 30;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-location: inside;
}
</style>
