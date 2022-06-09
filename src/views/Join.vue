<script lang="ts">
import { defineComponent, ref } from "vue";
import MobileInput from "@/components/common/MobileInput.vue";
import {
  AddMemberForm,
  Authority,
  Department,
  SelectOptionInterface,
} from "@/types/types";
import MobileButton from "@/components/common/MobileButton.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { getApiClient } from "@/utils/apiCilent";
import AppConfig from "@/constants";
import MobileSelect from "@/components/common/MobileSelect.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Join",
  components: { MobileSelect, MobileButton, MobileInput },
  setup() {
    const store = useStore();
    const router = useRouter();
    const apiClient = getApiClient(AppConfig.API_SERVER, store);
    const authorityOptions = [
      { value: Authority.STUDENT, label: "학생" },
      { value: Authority.PROFESSOR, label: "교수" },
    ];
    const gradeOptions = [
      { value: 1, label: "1학년" },
      { value: 2, label: "2학년" },
      { value: 3, label: "3학년" },
      { value: 4, label: "4학년" },
    ];
    const departmentOptions = [
      { value: Department.CAI, label: "정보통신학과" },
      { value: Department.SI, label: "스마트IT" },
    ];
    const addMemberForm = ref<AddMemberForm>({
      memberName: "",
      memberEmail: "",
      memberStudentId: "",
      memberAlias: "",
      memberDepartment: Department.CAI,
      memberPhone: "",
      memberBirthday: "",
      memberPassword: "",
      memberGrade: 1,
      memberStatus: "ACTIVE",
      memberAuthority: Authority.STUDENT,
    });

    const doJoin = async () => {
      if (formCheck()) {
        console.log(addMemberForm.value);
        const response = await apiClient.post("/join", addMemberForm.value);
        if (response.data.resultCode === 0) {
          window.alert("회원가입 완료");
          router.push("/login");
        } else {
          window.alert(response.data.resultMessage);
        }
      } else {
        alert("form");
      }
    };

    const formCheck = (): boolean => {
      return true;
    };
    return {
      addMemberForm,
      authorityOptions,
      gradeOptions,
      departmentOptions,
      onChangeAuthorityOption: ({ value }: SelectOptionInterface) => {
        addMemberForm.value.memberAuthority = value as Authority;
      },
      onChangeGradeOption: ({ value }: SelectOptionInterface) => {
        addMemberForm.value.memberGrade = value as number;
      },
      onChangeDepartmentOption: ({ value }: SelectOptionInterface) => {
        addMemberForm.value.memberDepartment = value as Department;
      },
      doJoin,
    };
  },
});
</script>

<template>
  <mobile-input
    :model-value="addMemberForm.memberEmail"
    @update:modelValue="addMemberForm.memberEmail = $event"
    placeholder="이메일"
    type="text"
  />
  <mobile-input
    :model-value="addMemberForm.memberPassword"
    @update:modelValue="addMemberForm.memberPassword = $event"
    placeholder="비밀번호"
    type="password"
  />
  <mobile-input
    :model-value="addMemberForm.memberAlias"
    @update:modelValue="addMemberForm.memberAlias = $event"
    placeholder="닉네임"
  />
  <mobile-input
    :model-value="addMemberForm.memberBirthday"
    @update:modelValue="addMemberForm.memberBirthday = $event"
    placeholder="생년월일"
  />
  <mobile-select
    class="m"
    :default-value="addMemberForm.memberDepartment"
    :options="departmentOptions"
    :on-change="onChangeDepartmentOption"
  ></mobile-select>
  <mobile-select
    class="m"
    :default-value="addMemberForm.memberGrade"
    :options="gradeOptions"
    :on-change="onChangeGradeOption"
  ></mobile-select>
  <mobile-input
    :model-value="addMemberForm.memberName"
    @update:modelValue="addMemberForm.memberName = $event"
    placeholder="이름"
  />
  <mobile-input
    :model-value="addMemberForm.memberPhone"
    @update:modelValue="addMemberForm.memberPhone = $event"
    placeholder="전화번호"
  />
  <mobile-input
    :model-value="addMemberForm.memberStudentId"
    @update:modelValue="addMemberForm.memberStudentId = $event"
    placeholder="학번"
  />
  <mobile-select
    class="m"
    :default-value="addMemberForm.memberAuthority"
    :options="authorityOptions"
    :on-change="onChangeAuthorityOption"
  ></mobile-select>
  <mobile-button @click="doJoin">회원가입</mobile-button>
</template>

<style scoped></style>
