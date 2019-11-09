<template>
  <div class="rbp">
    <section class="rbp__canvas">
      <div class="rbp__rotator-wrap">
        <div class="rbp__rotator" :style="getTransform()">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 300 300"
            id="rbp_part_bg"
          >
            <ellipse fill="none" cx="150" cy="150" rx="122" ry="122" />
          </svg>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 300 300"
            v-for="(item, i) in list"
            :key="i"
            :id="`rbp_part_${i}`"
            :class="{ 'rbp--active': i === active }"
            :style="getRotation(i, degree)"
          >
            <path :d="theD" :style="{ stroke: getColor(i, degree) }" />
          </svg>
        </div>
      </div>
    </section>

    <section class="rbp__legend">
      <ul>
        <li v-for="(item, i) in list" :key="i" :class="{ 'rbp--active' : i === active }">
          <a
            href="#"
            @click.prevent="handleHover(i)"
            @mouseover="handleHover(i)"
            @mouseout="handleHoverOut()"
          >
            <span :style="{backgroundColor: getColor(i, degree)}"></span>
            {{ item.key }}
          </a>
        </li>
      </ul>
    </section>

    <section class="rbp__details">
      <ul>
        <li
          v-for="(item, i) in list"
          :key="i"
          :class="{ 'rbp--active': i === active }"
          v-html="item.value"
        ></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "RainbowPieChart",
  props: {
    list: {
      type: Array,
      required: true
    },
    rotate: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      rotation: 0,
      active: 0,
      timer: null
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

  mounted() {
    this.cycle();
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

    getColor(i, degree) {
      if (this.list[i].color) {
        return this.list[i].color;
      }
      return "hsl(" + degree * i + ", 70%, 50%)";
    },

    getRotation(i, degree) {
      return { transform: "rotate(-" + degree * i + "deg)" };
    },

    getTransform() {
      return { transform: "rotate(" + this.rotation + "deg)" };
    },

    handleHoverOut() {
      this.cycle();
    },

    handleHover(index) {
      if (this.rotate) {
        this.rotation = (360 / this.parts) * index;
      }
      this.active = index;
      clearInterval(this.timer);
    },

    cycle() {
      if (typeof window === "undefined" || !this.autoplay) {
        return;
      }

      this.timer = setInterval(() => {
        this.active = this.active + 1 < this.parts ? this.active + 1 : 0;

        /* minor rotate 
        if (!this.rotate) {
          this.rotation = this.rotation + 10 < 360 ? this.rotation + 10 : 0;
        }
        */
        if (this.rotate) {
          this.rotation = (360 / this.parts) * this.active;
        }
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
.rbp {
  $opacity-default: 0.5;
  $opacity-active: 0.75;
  $transition-active: all 400ms ease-in-out;

  &__canvas {
    float: left;
    width: 60vw;
    height: 60vw;
  }

  &__legend {
    float: left;
    width: 40vw;
    height: 60vw;
    display: flex;
    align-items: center;

    li {
      list-style: none;
      text-align: left;
      padding: 0.5em;
      transition: $transition-active;
      opacity: $opacity-default;
    }

    a {
      color: black;
      text-decoration: none;
      font-size: 1.5em;
    }

    span {
      display: inline-block;
      height: 1em;
      width: 1em;
      font-size: 0.75em;
      line-height: 1em;
      margin: 0 1.5em 0.15em 0;
      border-radius: 100%;
      transition: $transition-active;
      transform-origin: center;
    }

    .rbp--active {
      opacity: $opacity-active;
      span {
        transform: scale(1.5);
      }
    }
  }

  &__details {
    position: relative;
    float: left;
    width: 100%;

    li {
      position: absolute;
      opacity: 0;
      transition: $transition-active;

      &.rbp--active {
        opacity: 1;
      }
    }
  }

  &__canvas {
    position: relative;
    overflow: hidden;
    width: 50%;
  }

  &__rotator-wrap {
    transform: rotate(54deg);
    height: 100%;
  }

  &__rotator {
    height: 100%;
    width: 100%;
    min-height: 300px;
    position: relative;
    overflow: hidden;
    transition: all 1s ease-in-out;
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
    width: 100%;
    height: 100%;
  }

  path {
    fill: none;
    stroke: #ddd;
    stroke-width: 40;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    opacity: $opacity-default;
    transition: $transition-active;
  }

  &__active path {
    opacity: 0.75;
  }
}
</style>
