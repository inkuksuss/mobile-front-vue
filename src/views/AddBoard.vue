<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import {
  AddBoardForm,
  ResultResponse,
  SelectOptionInterface,
} from "@/types/types";
import { getApiClient } from "@/utils/apiCilent";
import { CATEGORY_TYPE, StoreMutType, useStore } from "@/store";
import AppConfig from "@/constants";
import { useRouter } from "vue-router";
import MobileSelect from "@/components/common/MobileSelect.vue";
import MobileInput from "@/components/common/MobileInput.vue";
import MobileButton from "@/components/common/MobileButton.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AddBoard",
  components: { MobileSelect, MobileInput, MobileButton },
  setup() {
    const store = useStore();
    const router = useRouter();
    const apiClient = getApiClient(AppConfig.API_SERVER, store);
    const compCategoryType = computed(() => store.state.categoryType);
    const categoryOptions = [
      { value: CATEGORY_TYPE.NONE, label: "선택해주세요" },
      { value: CATEGORY_TYPE.EXHIBITION, label: "전시회" },
      { value: CATEGORY_TYPE.COMMON_PLACE, label: "자유게시판" },
    ];
    const addBoard = ref<AddBoardForm>({
      boardTitle: "",
      boardBody: "",
      boardStatus: "ACTIVE",
      categoryId: compCategoryType.value,
    });

    const getCategoryList = async () => {
      try {
        const response: ResultResponse = await apiClient.get(
          "/category/getCategoryList"
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    const insertBoard = async () => {
      try {
        console.log(addBoard.value);
        const response: ResultResponse = await apiClient.post(
          "/board/add",
          addBoard.value
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(() => {
      store.commit(StoreMutType.setCategoryType, CATEGORY_TYPE.EXHIBITION);
      getCategoryList();
    });

    return {
      addBoard,
      compCategoryType,
      categoryOptions,
      insertBoard,
      onChangeCategoryOption: ({ value }: SelectOptionInterface) => {
        addBoard.value.categoryId = value as CATEGORY_TYPE;
      },
    };
  },
});
</script>

<template>
  <div class="add-board-wrapper">
    <mobile-input
      :model-value="addBoard.boardTitle"
      @update:modelValue="addBoard.memberEmail = $event"
      placeholder="제목"
      type="text"
    />
    <textarea v-model="addBoard.boardBody" placeholder="내용" type="text" />
    <mobile-select
      class="m"
      :default-value="addBoard.categoryId"
      :options="categoryOptions"
      :on-change="onChangeCategoryOption"
    ></mobile-select>
    <mobile-button @click="insertBoard">로그인</mobile-button>
  </div>
</template>

<style scoped></style>
