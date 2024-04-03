<template>
  <header class="header">
    <h1>Icons</h1>
  </header>
  <div class="page">
    <div class="icon-box" v-for="(item, i) of icons" :key="i">
      <p>{{ item.label }}</p>
      <icon width="32" :path="item.label" stroke="rgba(0,0,0,0.6)"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconLayout",
  data() {
    return {
      icons: [
        { label: "add" },
        { label: "delete" },
        { label: "edit" },
        { label: "refresh" },
        { label: "save" },
        { label: "undo" }
      ]
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  height: 80px;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  text-align: center;
}

.page {
  text-align: center;
  color: #2c3e50;
  margin-top: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-box {
  display: flex;
  padding: 10px 20px;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: 20px;
}
</style>