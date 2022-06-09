<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import MobileInput from "@/components/common/MobileInput.vue";
import MobileLink from "@/components/common/MobileLink.vue";
import {
  BoardInterface,
  BoardList,
  LoginForm,
  ResultResponse,
} from "@/types/types";
import MobileButton from "@/components/common/MobileButton.vue";
import { getApiClient } from "@/utils/apiCilent";
import { StoreMutType, useStore } from "@/store";
import AppConfig from "@/constants";
import { useRoute, useRouter } from "vue-router";
import {
  loadLocalData,
  saveLocalData,
  getDiffTimeFormat,
} from "@/utils/common";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "BoardDetail",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const apiClient = getApiClient(AppConfig.API_SERVER, store);
    const board = ref<BoardInterface>({
      boardBody: "",
      boardId: 0,
      boardCreated: "",
      boardStatus: "",
      boardTitle: "",
      boardUpdated: "",
      boardView: 0,
      memberAlias: "",
    });

    const getBoardDetail = async () => {
      try {
        const categoryName = route.params.categoryName;
        const id = route.params.id;
        const response: ResultResponse = await apiClient.get(
          `/board/about/${categoryName}/${id}`
        );
        board.value = response.data.data as BoardInterface;
        console.log(board.value);
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(() => {
      getBoardDetail();
    });

    return {
      board,
    };
  },
});
</script>

<template>
  <div class="board-detail-wrapper">
    <div class="board-title">제목: {{ board.boardTitle }}</div>
    <div class="board-body">제목: {{ board.boardBody }}</div>
    <div class="board-updated">최근 수정일: {{ board.boardUpdated }}</div>
    <div class="board-view">조회수: {{ board.boardView }}</div>
    <div class="board-score">추천수: {{ board.boardScore }}</div>
  </div>
</template>

<style scoped></style>
