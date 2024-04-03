<!-- Компонент стилизуемой SVG-иконки -->

<template>
  <svg
    :width="widthSvg"
    :height="heightSvg"
    :viewBox="viewBox"
    :fill="fillSvg"
    :stroke="strokeSvg"
  />
</template>

<script>
const { parse } = require("postsvg")
const { render } = require("posthtml-render")
// Кэш загруженных иконок
const cache = new Map()

export default {
  name: "TIcon",
  props: {
    path: {
      type: String,
      required: true
    },
    fill: {
      type: [String, null],
      default: null
    },
    stroke: {
      type: [String, null],
      default: null
    },
    height: {
      type: [String, null],
      default: null
    },
    width: {
      type: [String, null],
      default: null
    }
  },
  data() {
    return {
      svgString: ''
    }
  },
  computed: {
    filePath() {
      if (this.path[0] === "/") {
        return this.path
      }
      return require(`../assets/icons/${this.path}.svg`)
    },
    parsedSVG() {
      return this.svgString ? parse(this.svgString) : null
    },
    viewBox() {
      return this.parsedSVG ? this.parsedSVG.root.attrs.viewBox : "0 0 38 38"
    },
    widthSvg() {
      return (this.parsedSVG && !this.width) ? this.parsedSVG.root.attrs.width : this.width
    },
    heightSvg() {
      return (this.parsedSVG && !this.height) ? this.parsedSVG.root.attrs.height : this.height
    },
    fillSvg() {
      return (this.parsedSVG && !this.fill) ? this.parsedSVG.root.attrs.fill : this.fill
    },
    strokeSvg() {
      return (this.parsedSVG && !this.stroke) ? this.parsedSVG.root.attrs.stroke : this.stroke
    }
  },
  watch: {
    // При изменении файла, перезагружаем его
    filePath: {
      immediate: true,
      handler: "loadFile"
    },
    // При загрузке другого файла обновляем SVG
    svgString: "refreshSvg",
    // При изменениях стилизации обновляем SVG
    stroke: "refreshSvg",
    fill: "refreshSvg"
  },
  methods: {
    loadFile() {
      this.getSvgIconText()
          .then(responseText => {
            this.svgString = responseText
          })
          .catch(error => {
            console.error("Ошибка загрузки SVG-файла", error)
          })
    },
    async getSvgIconText() {
      const url = this.filePath
      if (!cache.has(url)) {
        try {
          cache.set(url, fetch(url).then(r => r.text()))
        } catch (error) {
          console.error("Ошибка загрузки файла", error)
          cache.delete(url)
        }
      }

      return cache.has(url)
          ? await cache.get(url)
          : Promise.reject(new Error("Нет SVG-файла в локальном кэше"))
    },
    refreshSvg() {
      Promise.resolve(this.parsedSVG)
          .then(svgTree => {
            if (this.stroke) {
              let svgElements = ["path", "line", "circle", "polyline", "polygon", "rect"]
              for (let el of svgElements) {
                svgTree.each(el, node => {
                  node.attrs.stroke = this.stroke
                })
              }
            }
          /*  if (this.fill) {
              const svgElements = ["path", "circle"]
              for (let el of svgElements) {
                svgTree.each("circle", node => {
                  node.attrs.fill = this.fill
                })
              }
            }*/
            return svgTree
          })
          // Оставляем только внутренности тега <svg>
          .then(svgTree => render(svgTree.root.content))
          // Заменяем содержимое тега <svg> новым
          .then(svgHtml => {
            this.$el.innerHTML = svgHtml
          })
          .catch(error => {
            console.error("Ошибка при обновлении SVG", error)
          })
    }
  }
}
</script>

<style lang="scss">

</style>