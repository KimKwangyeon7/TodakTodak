
  <template>
  <div class="modal-content" style="border-radius: 10px;">
    <div class="color-picker">
        <div @click="setColor('#ff0000')" class="color-option bg-danger"></div>
        <div @click="setColor('#00ff00')" class="color-option bg-success"></div>
    <!-- 다른 색상을 추가할 수 있음 -->
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      content: '',
      color: '#ff0000', // Default color, you can set it to any default color you want
    };
  },
  props: {
      item: {
        type: Object,
        required: true
      }
    },
    components: {
    ColorDetail,
  },

  methods: {
    setColor(selectedColor) {
      this.color = selectedColor;
    },
    closeModal() {
        this.$emit('close-modal');
    },
  },
};
</script>

<style scoped>
.color-picker {
  display: flex;
}

.color-option {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
}

.modal-content {
    background: #EAF3F9;
    border-radius: 8px;
    padding: 20px;
  }
.close-button {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
</style>

