# React 6주 스터디 커리큘럼 (Vite + React, CSR)

> 출처: [`skills/react-best-practices/rules/`](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules), [`skills/composition-patterns/rules/`](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns/rules)
>
> 투두리스트를 3주간 고도화하며 기본기를 잡고, 4~6주차에 새 프로젝트로 확장하며 composition + 성능 패턴을 적용한다.
> 서버 관련 룰(server-_, hydration-_ 등)은 Vite + React CSR 기준이므로 제외.

---

## 1주차 — React 기초 + 투두 추가, 삭제

**개념:** Virtual DOM, JSX, Component, Props, State, 단방향 흐름, 불변성, Key, useState, useEffect, useRef, React 19 ref, 조건부 렌더링

**참고 문서:**

- [React 빠른 시작](https://react.dev/learn)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [첫 번째 컴포넌트](https://react.dev/learn/your-first-component)
- [JSX로 마크업 작성하기](https://react.dev/learn/writing-markup-with-jsx)
- [Props 전달하기](https://react.dev/learn/passing-props-to-a-component)
- [State: 컴포넌트의 메모리](https://react.dev/learn/state-a-components-memory)
- [리스트 렌더링](https://react.dev/learn/rendering-lists)
- [조건부 렌더링](https://react.dev/learn/conditional-rendering)
- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)
- [useRef](https://react.dev/reference/react/useRef)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)

**과제:** 투두리스트 + 랜덤 유저 API

- TextInput: 할 일 입력 (글자 수 표시, 20자 제한, Enter/버튼으로 추가)
- TaskList: 목록 렌더링, 완료 토글(취소선), 삭제
- UserProfile: `https://randomuser.me/api/` 호출하여 사진/이름/이메일 표시, 새로고침

---

## 2주차 — 이벤트 처리 + 폼 + 라우팅

**개념:** controlled component, 폼 핸들링, 이벤트 핸들러 패턴, 배열/객체 state 업데이트, React Router

**참고 문서:**

- [이벤트에 응답하기](https://react.dev/learn/responding-to-events)
- [State로 입력에 반응하기](https://react.dev/learn/reacting-to-input-with-state)
- [State에서 객체 업데이트하기](https://react.dev/learn/updating-objects-in-state)
- [State에서 배열 업데이트하기](https://react.dev/learn/updating-arrays-in-state)
- [State 구조 선택하기](https://react.dev/learn/choosing-the-state-structure)
- [React Router 공식 문서](https://reactrouter.com/)
- [React Router 튜토리얼](https://reactrouter.com/start/library/)

**React Router:**

- `react-router-dom` 설치, BrowserRouter / Routes / Route / Link / useNavigate / useParams
- 투두리스트를 멀티 페이지로 분리: `/` 메인, `/todo/:id` 상세

**과제:** 1주차 투두리스트에 기능 추가

- 수정 기능: 할 일 클릭 시 편집 모드 진입, 저장/취소
- 카테고리 추가: "업무", "개인", "공부" 등 선택 후 카테고리별 필터링
- 우선순위: 높음/보통/낮음 선택, 우선순위별 정렬
- 전체/완료/미완료 필터 탭
- 페이지 분리: 메인(목록) / 상세(개별 투두) / 설정 페이지

**스킬 (6개):**

1. [`rerender-functional-setstate.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-functional-setstate.md)

   - 배열 state 업데이트할 때 stale closure 바로 마주침

2. [`rerender-move-effect-to-event.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-move-effect-to-event.md)

   - "제출 시 API 호출"을 effect로 짜려는 충동이 생기는 시점

3. [`rendering-conditional-render.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-conditional-render.md)

   - 조건부 렌더링 `&&` 함정을 1주차 과제에서 이미 겪었을 수 있음

4. [`js-early-exit.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-early-exit.md)

   - validation 로직 작성하면서 자연스럽게 적용

5. [`js-tosorted-immutable.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-tosorted-immutable.md)

   - 정렬 기능 추가 시 `.sort()` vs `.toSorted()` 직접 비교

6. [`react19-no-forwardref.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/react19-no-forwardref.md)
   - 1주차에 ref 배웠으니 React 19 방식 확인

---

## 3주차 — 비동기 + 데이터 페칭 + 저장

**개념:** useEffect 데이터 페칭/cleanup, useReducer, custom hook (useTodos, useLocalStorage), Promise/async/await

**참고 문서:**

- [Effect로 동기화하기](https://react.dev/learn/synchronizing-with-effects)
- [Effect가 필요하지 않을 수도 있습니다](https://react.dev/learn/you-might-not-need-an-effect)
- [useReducer](https://react.dev/reference/react/useReducer)
- [state 로직을 reducer로 추출하기](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [커스텀 훅으로 로직 재사용하기](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [TanStack Query — Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start)

**useReducer:**

- 투두 상태가 복잡해졌으므로(추가/삭제/수정/토글/필터) useState 여러 개 대신 useReducer로 통합
- dispatch 패턴 익히기: `dispatch({ type: 'ADD_TODO', payload: { ... } })`

**과제:** 투두리스트 데이터 영속화 + API 연동

- useState → useReducer 리팩토링: 투두 CRUD 액션을 reducer로 통합
- localStorage 저장/불러오기: 새로고침해도 데이터 유지
- custom hook 분리: `useLocalStorage(key, initialValue)` 만들어서 재사용
- mock API 연동: JSONPlaceholder(`https://jsonplaceholder.typicode.com/todos`)에서 초기 데이터 fetch
- 로딩/에러 상태 처리: 로딩 스피너, 에러 메시지, 재시도 버튼

**선택:** TanStack Query로 데이터 페칭 업그레이드

- useEffect + fetch 패턴을 먼저 직접 구현한 뒤, TanStack Query로 교체하여 차이 체감
- `useQuery`, `useMutation`, 자동 캐싱/재요청/로딩 상태 관리

**스킬 (7개):**

7. [`async-parallel.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/async-parallel.md)

   - API 여러 개 호출할 때 순차 vs 병렬 직접 비교

8. [`async-defer-await.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/async-defer-await.md)

   - await 위치에 따른 성능 차이 체감

9. [`rerender-derived-state-no-effect.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-derived-state-no-effect.md)

   - "필터된 목록"을 effect로 동기화하려는 실수 방지

10. [`rerender-lazy-state-init.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-lazy-state-init.md)

    - localStorage에서 초기값 읽을 때 바로 적용

11. [`client-localstorage-schema.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/client-localstorage-schema.md)

    - localStorage 저장 구조 설계 시 버전/최소 필드/try-catch

12. [`rerender-dependencies.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-dependencies.md)

    - useEffect 의존성 배열 정밀하게 다루기 시작

13. [`js-set-map-lookups.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-set-map-lookups.md)
    - 카테고리 필터링 등에서 Set 활용

---

## 4주차 — 새 프로젝트 + 컴포지션 + 상태관리

**개념:** Context API (createContext, use), props drilling 문제, children 패턴

**참고 문서:**

- [Context로 데이터 깊숙이 전달하기](https://react.dev/learn/passing-data-deeply-with-context)
- [useContext](https://react.dev/reference/react/useContext)
- [use](https://react.dev/reference/react/use)
- [createContext](https://react.dev/reference/react/createContext)
- [children을 JSX로 전달하기](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [컴포넌트로 컴포지션하기](https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy)
- [Zustand 공식 문서](https://zustand.docs.pmnd.rs/)
- [Jotai 공식 문서](https://jotai.org/)

**외부 상태관리 (선택 — Zustand 또는 Jotai 중 택 1):**

- Context로 먼저 구현한 뒤, Zustand/Jotai로 교체하여 차이 체감
- Zustand: store 기반, 보일러플레이트 적음, Context 없이 전역 상태
- Jotai: atom 기반, 개별 상태 단위로 구독, 리렌더 최소화

**과제:** 게시판 / Kanban 보드 / 채팅 UI 중 택 1

- 투두보다 컴포넌트 구조가 복잡해서 composition 패턴이 자연스럽게 필요해지는 규모
- React Router로 멀티 페이지 구성 (2주차 복습)
- 예시 (Kanban 보드):
  - Board: 여러 Column을 가로로 배치
  - Column: "할 일" / "진행 중" / "완료" 각각의 리스트
  - Card: 개별 태스크, 드래그&드롭 없이 버튼으로 상태 이동
  - Modal: 카드 상세 보기/편집, 열기/닫기
  - Context(또는 Zustand/Jotai)로 전체 보드 상태 공유

**스킬 — composition-patterns 전체 (8개):**

14. [`architecture-avoid-boolean-props.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/architecture-avoid-boolean-props.md)

    - 새 프로젝트 설계 단계에서 구조를 잘못 잡는 걸 방지

15. [`architecture-compound-components.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/architecture-compound-components.md)

    - Card, Modal 등 compound 구조 직접 설계

16. [`patterns-explicit-variants.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/patterns-explicit-variants.md)

    - 게시글/댓글/공지 등 변형을 boolean이 아닌 명시적 컴포넌트로

17. [`patterns-children-over-render-props.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/patterns-children-over-render-props.md)

    - Layout, Modal 등에서 children 패턴 vs renderProp 비교

18. [`state-lift-state.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/state-lift-state.md)

    - 형제 컴포넌트 간 상태 공유 문제를 직접 마주침

19. [`state-context-interface.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/state-context-interface.md)

    - Context를 state/actions/meta로 설계하는 패턴

20. [`state-decouple-implementation.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/state-decouple-implementation.md)

    - Provider만 상태 구현을 알고 UI는 인터페이스만 소비

21. [`react19-no-forwardref.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/composition-patterns/rules/react19-no-forwardref.md)
    - 2주차 복습 + use() 활용 심화

---

## 5주차 — 성능 최적화 + 번들

**개념:** React.memo, useMemo, useCallback, React DevTools Profiler, 코드 스플리팅 (React.lazy, Suspense), useTransition

**참고 문서:**

- [memo](https://react.dev/reference/react/memo)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [lazy](https://react.dev/reference/react/lazy)
- [Suspense](https://react.dev/reference/react/Suspense)
- [useTransition](https://react.dev/reference/react/useTransition)
- [startTransition](https://react.dev/reference/react/startTransition)
- [React Developer Tools — Profiler](https://react.dev/learn/react-developer-tools)
- [TanStack Query — 캐싱 가이드](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

**과제:** 4주차 프로젝트에 성능 최적화 적용

- React DevTools Profiler로 리렌더 원인 찾기 → memo/useMemo/useCallback으로 해결
- 무거운 컴포넌트(Modal, 에디터 등) React.lazy로 분리
- 라우트 단위 코드 스플리팅: React.lazy + Suspense로 페이지별 번들 분리
- 검색/필터 입력 시 startTransition으로 non-urgent 업데이트 처리
- bundle analyzer로 번들 크기 확인, 불필요한 barrel import 제거

**선택:** TanStack Query 캐싱 최적화

- 3주차에서 도입했다면 staleTime, gcTime, 쿼리 무효화 전략 등 심화

**스킬 (12개):**

22. [`rerender-memo.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-memo.md)

    - memo 컴포넌트 분리로 불필요한 계산 스킵

23. [`rerender-memo-with-default-value.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-memo-with-default-value.md)

    - memo 깨지는 함정 (기본값 `() => {}`)

24. [`rerender-simple-expression-in-memo.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-simple-expression-in-memo.md)

    - useMemo 남용 방지 — 단순 연산은 그냥 계산

25. [`rerender-derived-state.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-derived-state.md)

    - useMediaQuery 등 파생 boolean 구독

26. [`rerender-defer-reads.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-defer-reads.md)

    - 콜백에서만 쓰는 값은 구독하지 않기

27. [`rerender-transitions.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-transitions.md)

    - startTransition으로 non-urgent 업데이트 처리

28. [`rerender-use-ref-transient-values.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-use-ref-transient-values.md)

    - 마우스/스크롤 좌표 등 빈번한 값은 ref로

29. [`rendering-usetransition-loading.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-usetransition-loading.md)

    - 수동 isLoading 대신 useTransition

30. [`bundle-barrel-imports.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-barrel-imports.md)

    - import 방식이 번들에 미치는 영향

31. [`bundle-dynamic-imports.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-dynamic-imports.md)

    - React.lazy로 무거운 컴포넌트 지연 로드

32. [`bundle-conditional.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-conditional.md)

    - 조건부 import() 패턴

33. [`bundle-preload.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-preload.md)
    - hover 시 미리 로드

---

## 6주차 — JS 심화 + 리팩토링 + 코드리뷰

**개념:** 전체 프로젝트 리팩토링, 서로의 코드에 스킬 기준 적용하여 코드리뷰

**참고 문서:**

- [React 전체 API 레퍼런스](https://react.dev/reference/react)
- [React DOM API 레퍼런스](https://react.dev/reference/react-dom)
- [Thinking in React (복습)](https://react.dev/learn/thinking-in-react)
- [JavaScript Info — 성능 최적화](https://javascript.info/optimize)

**과제:** 코드리뷰 주간

- 서로의 4~5주차 프로젝트 코드를 교차 리뷰
- 아래 JS 성능 스킬을 체크리스트로 활용하여 개선점 찾기
- 리팩토링 PR 작성 → 리뷰 → 머지

**스킬 (12개):**

34. [`js-index-maps.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-index-maps.md)

    - 리스트 데이터 매핑 최적화

35. [`js-combine-iterations.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-combine-iterations.md)

    - filter/map 여러 번 → 한 루프로

36. [`js-length-check-first.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-length-check-first.md)

    - 배열 비교 최적화

37. [`js-cache-property-access.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-cache-property-access.md)

    - 루프 내 프로퍼티 캐시

38. [`js-cache-function-results.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-cache-function-results.md)

    - 반복 호출 함수 결과 캐시

39. [`js-cache-storage.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-cache-storage.md)

    - localStorage 읽기 캐시

40. [`js-hoist-regexp.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-hoist-regexp.md)

    - RegExp 렌더 밖으로

41. [`js-min-max-loop.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-min-max-loop.md)

    - sort 대신 단일 루프

42. [`js-batch-dom-css.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-batch-dom-css.md)

    - layout thrashing 방지

43. [`rendering-content-visibility.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-content-visibility.md)

    - 긴 리스트 오프스크린 최적화

44. [`rendering-hoist-jsx.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-hoist-jsx.md)

    - 정적 JSX 상수로 빼기

45. [`advanced-init-once.md`](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/advanced-init-once.md)
    - 앱 초기화 1회 보장 패턴

---

## 제외한 스킬 (CSR에서 불필요)

- `server-*` 8개 전부 (SSR 전용)
- `rendering-hydration-no-flicker.md`, `rendering-hydration-suppress-warning.md`
- `async-suspense-boundaries.md` (SSR streaming)
- `async-api-routes.md` (API route)
- `bundle-defer-third-party.md` (next/dynamic ssr:false)
- `client-swr-dedup.md`, `client-event-listeners.md`, `client-passive-event-listeners.md`
- `rendering-animate-svg-wrapper.md`, `rendering-svg-precision.md` (SVG 특화)
- `rendering-activity.md` (React experimental)
- `advanced-event-handler-refs.md`, `advanced-use-latest.md` (고급)
