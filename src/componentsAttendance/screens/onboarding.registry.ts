import {
  LoginMobile,
  OwnerSignupWeb,
  PasswordResetMobile,
  RoleSelectMobile,
  StaffInviteMobile,
  StaffJoinMobile,
  StoreManageWeb,
  StoreRegisterMobile,
  StoreRegisterStep2Mobile,
} from './onboarding';
import type { AttendanceScreen } from './screenTypes';

export const onboardingScreens: AttendanceScreen[] = [
  { id: 'owner-signup-web', label: '01 · 사장님 회원가입 (웹)', group: '가입 · 온보딩', width: 1280, height: 800, viewport: 'web', Component: OwnerSignupWeb },
  { id: 'login-mobile', label: '02 · 로그인 (모바일)', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: LoginMobile },
  { id: 'role-select-mobile', label: '03 · 역할 선택', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: RoleSelectMobile },
  { id: 'store-register-mobile', label: '04 · 매장 등록', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StoreRegisterMobile },
  { id: 'staff-invite-mobile', label: '05 · 직원 초대', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StaffInviteMobile },
  { id: 'store-manage-web', label: '06 · 매장 관리 (웹)', group: '가입 · 온보딩', width: 1280, height: 800, viewport: 'web', Component: StoreManageWeb },
  { id: 'store-register-step2-mobile', label: '04-B · 매장 등록 2/3 (영업시간·인증)', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StoreRegisterStep2Mobile },
  { id: 'staff-join-mobile', label: '07 · 직원 - 매장 코드 입력', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: StaffJoinMobile },
  { id: 'password-reset-mobile', label: '08 · 비밀번호 찾기 (인증 단계)', group: '가입 · 온보딩', width: 402, height: 874, viewport: 'mobile', Component: PasswordResetMobile },
];
