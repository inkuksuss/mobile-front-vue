<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MobileInput from "@/components/common/MobileInput.vue";
import MobileLink from "@/components/common/MobileLink.vue";
import { BoardList, LoginForm, ResultResponse } from "@/types/types";
import MobileButton from "@/components/common/MobileButton.vue";
import { getApiClient } from "@/utils/apiCilent";
import { CATEGORY_TYPE, StoreMutType, useStore } from "@/store";
import AppConfig from "@/constants";
import { useRouter } from "vue-router";
import {
  loadLocalData,
  saveLocalData,
  getDiffTimeFormat,
} from "@/utils/common";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CommonPlace",
  components: { MobileLink },
  setup() {
    const store = useStore();
    const router = useRouter();
    const apiClient = getApiClient(AppConfig.API_SERVER, store);
    const boardList = ref<Array<BoardList>>();

    const getCommonPlaceList = async () => {
      try {
        const response: ResultResponse = await apiClient.post(
          "/board/about/common-place",
          {}
        );
        boardList.value = response.data.data as Array<BoardList>;
        if (boardList.value.length > 0) {
          boardList.value.forEach(
            (b) =>
              (b.boardUpdated =
                b.boardUpdated.toString().split("T")[0] +
                " | " +
                b.boardUpdated.toString().split("T")[1].split(".")[0])
          );
        }
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(() => {
      getCommonPlaceList();
      store.commit(StoreMutType.setCategoryType, CATEGORY_TYPE.COMMON_PLACE);
    });

    return {
      boardList,
    };
  },
});
</script>

<template>
  <div class="common-place-wrapper">
    <div
      class="board-list-wrapper"
      v-for="(board, index) in boardList"
      :key="index"
    >
      <mobile-link
        :href="'/board/common-place/' + board.boardId"
        class="board-link"
      >
        <div class="board-title">제목: {{ board.boardTitle }}</div>
        <div class="board-updated">최근 수정일: {{ board.boardUpdated }}</div>
        <div class="board-view">조회수: {{ board.boardView }}</div>
        <div class="board-score">추천수: {{ board.boardScore }}</div>
      </mobile-link>
    </div>
  </div>
</template>

<style scoped></style>
