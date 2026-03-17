# React 6주 스터디 커리큘럼 (Vite + React, CSR)

> 출처: `skills/react-best-practices/rules/`, `skills/composition-patterns/rules/`
>
> 투두리스트를 3주간 고도화하며 기본기를 잡고, 4~6주차에 새 프로젝트로 확장하며 composition + 성능 패턴을 적용한다.
> 서버 관련 룰(server-_, hydration-_ 등)은 Vite + React CSR 기준이므로 제외.

---

## 1주차 — React 기초 + 투두 추가, 삭제

**개념:** Virtual DOM, JSX, Component, Props, State, 단방향 흐름, 불변성, Key, useState, useEffect, useRef, React 19 ref, 조건부 렌더링

**과제:** 투두리스트 + 랜덤 유저 API

- TextInput: 할 일 입력 (글자 수 표시, 20자 제한, Enter/버튼으로 추가)
- TaskList: 목록 렌더링, 완료 토글(취소선), 삭제
- UserProfile: `https://randomuser.me/api/` 호출하여 사진/이름/이메일 표시, 새로고침

---

## 2주차 — 이벤트 처리 + 폼 + 불변성 심화

**개념:** controlled component, 폼 핸들링, 이벤트 핸들러 패턴, 배열/객체 state 업데이트

**과제:** 1주차 투두리스트에 기능 추가

- 수정 기능: 할 일 클릭 시 편집 모드 진입, 저장/취소
- 카테고리 추가: "업무", "개인", "공부" 등 선택 후 카테고리별 필터링
- 우선순위: 높음/보통/낮음 선택, 우선순위별 정렬
- 전체/완료/미완료 필터 탭

**스킬 (6개):**

1. `react-best-practices/rules/rerender-functional-setstate.md`

   - 배열 state 업데이트할 때 stale closure 바로 마주침

2. `react-best-practices/rules/rerender-move-effect-to-event.md`

   - "제출 시 API 호출"을 effect로 짜려는 충동이 생기는 시점

3. `react-best-practices/rules/rendering-conditional-render.md`

   - 조건부 렌더링 `&&` 함정을 1주차 과제에서 이미 겪었을 수 있음

4. `react-best-practices/rules/js-early-exit.md`

   - validation 로직 작성하면서 자연스럽게 적용

5. `react-best-practices/rules/js-tosorted-immutable.md`

   - 정렬 기능 추가 시 `.sort()` vs `.toSorted()` 직접 비교

6. `composition-patterns/rules/react19-no-forwardref.md`
   - 1주차에 ref 배웠으니 React 19 방식 확인

---

## 3주차 — 비동기 + 데이터 페칭 + 저장

**개념:** useEffect 데이터 페칭/cleanup, custom hook (useTodos, useLocalStorage), Promise/async/await

**과제:** 투두리스트 데이터 영속화 + API 연동

- localStorage 저장/불러오기: 새로고침해도 데이터 유지
- custom hook 분리: `useLocalStorage(key, initialValue)` 만들어서 재사용
- mock API 연동: JSONPlaceholder(`https://jsonplaceholder.typicode.com/todos`)에서 초기 데이터 fetch
- 로딩/에러 상태 처리: 로딩 스피너, 에러 메시지, 재시도 버튼

**스킬 (7개):**

7. `react-best-practices/rules/async-parallel.md`

   - API 여러 개 호출할 때 순차 vs 병렬 직접 비교

8. `react-best-practices/rules/async-defer-await.md`

   - await 위치에 따른 성능 차이 체감

9. `react-best-practices/rules/rerender-derived-state-no-effect.md`

   - "필터된 목록"을 effect로 동기화하려는 실수 방지

10. `react-best-practices/rules/rerender-lazy-state-init.md`

    - localStorage에서 초기값 읽을 때 바로 적용

11. `react-best-practices/rules/client-localstorage-schema.md`

    - localStorage 저장 구조 설계 시 버전/최소 필드/try-catch

12. `react-best-practices/rules/rerender-dependencies.md`

    - useEffect 의존성 배열 정밀하게 다루기 시작

13. `react-best-practices/rules/js-set-map-lookups.md`
    - 카테고리 필터링 등에서 Set 활용

---

## 4주차 — 새 프로젝트 + 컴포지션

**개념:** Context API (createContext, use), props drilling 문제, children 패턴

**과제:** 게시판 / Kanban 보드 / 채팅 UI 중 택 1

- 투두보다 컴포넌트 구조가 복잡해서 composition 패턴이 자연스럽게 필요해지는 규모
- 예시 (Kanban 보드):
  - Board: 여러 Column을 가로로 배치
  - Column: "할 일" / "진행 중" / "완료" 각각의 리스트
  - Card: 개별 태스크, 드래그&드롭 없이 버튼으로 상태 이동
  - Modal: 카드 상세 보기/편집, 열기/닫기
  - Context로 전체 보드 상태 공유, Column/Card는 context에서 읽기

**스킬 — composition-patterns 전체 (8개):**

14. `composition-patterns/rules/architecture-avoid-boolean-props.md`

    - 새 프로젝트 설계 단계에서 구조를 잘못 잡는 걸 방지

15. `composition-patterns/rules/architecture-compound-components.md`

    - Card, Modal 등 compound 구조 직접 설계

16. `composition-patterns/rules/patterns-explicit-variants.md`

    - 게시글/댓글/공지 등 변형을 boolean이 아닌 명시적 컴포넌트로

17. `composition-patterns/rules/patterns-children-over-render-props.md`

    - Layout, Modal 등에서 children 패턴 vs renderProp 비교

18. `composition-patterns/rules/state-lift-state.md`

    - 형제 컴포넌트 간 상태 공유 문제를 직접 마주침

19. `composition-patterns/rules/state-context-interface.md`

    - Context를 state/actions/meta로 설계하는 패턴

20. `composition-patterns/rules/state-decouple-implementation.md`

    - Provider만 상태 구현을 알고 UI는 인터페이스만 소비

21. `composition-patterns/rules/react19-no-forwardref.md`
    - 2주차 복습 + use() 활용 심화

---

## 5주차 — 성능 최적화 + 번들

**개념:** React.memo, useMemo, useCallback, React DevTools Profiler, 코드 스플리팅 (React.lazy, Suspense), useTransition

**과제:** 4주차 프로젝트에 성능 최적화 적용

- React DevTools Profiler로 리렌더 원인 찾기 → memo/useMemo/useCallback으로 해결
- 무거운 컴포넌트(Modal, 에디터 등) React.lazy로 분리
- 검색/필터 입력 시 startTransition으로 non-urgent 업데이트 처리
- bundle analyzer로 번들 크기 확인, 불필요한 barrel import 제거

**스킬 (12개):**

22. `react-best-practices/rules/rerender-memo.md`

    - memo 컴포넌트 분리로 불필요한 계산 스킵

23. `react-best-practices/rules/rerender-memo-with-default-value.md`

    - memo 깨지는 함정 (기본값 `() => {}`)

24. `react-best-practices/rules/rerender-simple-expression-in-memo.md`

    - useMemo 남용 방지 — 단순 연산은 그냥 계산

25. `react-best-practices/rules/rerender-derived-state.md`

    - useMediaQuery 등 파생 boolean 구독

26. `react-best-practices/rules/rerender-defer-reads.md`

    - 콜백에서만 쓰는 값은 구독하지 않기

27. `react-best-practices/rules/rerender-transitions.md`

    - startTransition으로 non-urgent 업데이트 처리

28. `react-best-practices/rules/rerender-use-ref-transient-values.md`

    - 마우스/스크롤 좌표 등 빈번한 값은 ref로

29. `react-best-practices/rules/rendering-usetransition-loading.md`

    - 수동 isLoading 대신 useTransition

30. `react-best-practices/rules/bundle-barrel-imports.md`

    - import 방식이 번들에 미치는 영향

31. `react-best-practices/rules/bundle-dynamic-imports.md`

    - React.lazy로 무거운 컴포넌트 지연 로드

32. `react-best-practices/rules/bundle-conditional.md`

    - 조건부 import() 패턴

33. `react-best-practices/rules/bundle-preload.md`
    - hover 시 미리 로드

---

## 6주차 — JS 심화 + 리팩토링 + 코드리뷰

**개념:** 전체 프로젝트 리팩토링, 서로의 코드에 스킬 기준 적용하여 코드리뷰

**과제:** 코드리뷰 주간

- 서로의 4~5주차 프로젝트 코드를 교차 리뷰
- 아래 JS 성능 스킬을 체크리스트로 활용하여 개선점 찾기
- 리팩토링 PR 작성 → 리뷰 → 머지

**스킬 (12개):**

34. `react-best-practices/rules/js-index-maps.md`

    - 리스트 데이터 매핑 최적화

35. `react-best-practices/rules/js-combine-iterations.md`

    - filter/map 여러 번 → 한 루프로

36. `react-best-practices/rules/js-length-check-first.md`

    - 배열 비교 최적화

37. `react-best-practices/rules/js-cache-property-access.md`

    - 루프 내 프로퍼티 캐시

38. `react-best-practices/rules/js-cache-function-results.md`

    - 반복 호출 함수 결과 캐시

39. `react-best-practices/rules/js-cache-storage.md`

    - localStorage 읽기 캐시

40. `react-best-practices/rules/js-hoist-regexp.md`

    - RegExp 렌더 밖으로

41. `react-best-practices/rules/js-min-max-loop.md`

    - sort 대신 단일 루프

42. `react-best-practices/rules/js-batch-dom-css.md`

    - layout thrashing 방지

43. `react-best-practices/rules/rendering-content-visibility.md`

    - 긴 리스트 오프스크린 최적화

44. `react-best-practices/rules/rendering-hoist-jsx.md`

    - 정적 JSX 상수로 빼기

45. `react-best-practices/rules/advanced-init-once.md`
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
