import { CATEGORY_TYPE } from "@/store";

export enum Authority {
  STUDENT = "S",
  PROFESSOR = "P",
}

export enum Department {
  CAI = "CAI",
  SI = "SI",
}

export interface AddMemberForm {
  memberName: string;
  memberEmail: string;
  memberStudentId: string;
  memberAlias: string;
  memberDepartment: Department;
  memberPhone: string;
  memberBirthday: string;
  memberPassword: string;
  memberGrade: number;
  memberStatus: string;
  memberAuthority: Authority;
}

export interface LoginForm {
  memberEmail: string;
  memberPassword: string;
}

export interface ResultResponse {
  httpStatus: string;
  resultCode: number;
  resultMessage: string;
  data: any;
}

export interface SelectOptionInterface {
  value: string | number;
  label: string;
}

export interface UserInterface {
  memberId: number;
  memberName: string;
  memberEmail: string;
  memberAuthority: Authority;
}

export interface AddBoardForm {
  boardTitle: string;
  boardBody: string;
  boardStatus: string;
  categoryId: CATEGORY_TYPE;
}

export interface BoardList {
  boardId: number;
  boardTitle: string;
  memberAlias: string;
  boardUpdated: Date | string;
  boardView: number;
  boardScore: number;
}

export interface BoardInterface {
  boardId: number;
  boardBody: string;
  boardTitle: string;
  boardUpdated: string;
  boardView: number;
  boardCreated: string;
  memberAlias: string;
  boardStatus: string;
}
