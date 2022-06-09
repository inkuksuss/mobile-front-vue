<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { SelectOptionInterface } from "../../types/types";
import MobileLink from "@/components/common/MobileLink.vue";

export default defineComponent({
  name: "MobileSelect",
  components: { MobileLink },
  props: {
    defaultValue: {
      type: String || Number,
    },
    options: {
      type: Array as PropType<SelectOptionInterface[]>,
      require: true,
    },
    onChange: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props) {
    const isOpenOption = ref<boolean>(false);
    let label = ref<string>("");
    const selectOption = props.options?.filter(
      (item) => item.value === props.defaultValue
    );
    if (selectOption && selectOption.length > 0) {
      label.value = selectOption[0].label;
    }

    watch(
      () => props.defaultValue,
      (next, prev) => {
        const selectOption = props.options?.filter(
          (item) => item.value === next
        );
        if (selectOption && selectOption.length > 0) {
          label.value = selectOption[0].label;
        }
      }
    );

    return {
      isOpenOption,
      label,
      setIsOpenOption: () => {
        isOpenOption.value = !isOpenOption.value;
      },
      setCloseOption: () => {
        isOpenOption.value = false;
      },
      onChangeSelectValue: (selectOption: SelectOptionInterface) => {
        props.onChange(selectOption);
      },
    };
  },
});
</script>

<template>
  <div :class="{ active: isOpenOption }" class="mobile-select">
    <button
      v-click-away="setCloseOption"
      class="label"
      @click="setIsOpenOption"
    >
      {{ label }}
      <i class="fa-light fa-angle-down" />
    </button>
    <ul class="optionList">
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="{ active: item.label === label }"
        class="optionItem"
      >
        <mobile-link
          href="#"
          @click="
            () => {
              onChangeSelectValue(item);
            }
          "
        >
          <div class="optionItem-text-wrapper">
            <span>{{ item.label }}</span>
          </div>
        </mobile-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
