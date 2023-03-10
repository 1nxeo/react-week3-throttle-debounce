import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let timerId = null;
  const [state, setState] = useState(true);
  const navigate = useNavigate();

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      // 언마운트 시
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const throttle = (delay) => {
    if (timerId) {
      // timerId 가 있으면 바로 함수 종료
      return;
    }
    // setState(!state);
    // 그러면 state가 변해서 화면이 리렌더링되니까 이 아래로는 정상동작을 하지 않게됩니다.
    // timerId가 무조건 null이 된다.
    // 그러므로 어떠한 처리를 해주어야함
    console.log(`API 요청 실행! ${delay}ms 동안 추가 요청은 안받습니다.`);
    timerId = setTimeout(() => {
      console.log(`${delay}ms 지남 ! 추가 요청 받습니다 !`);
      timerId = null;
    }, delay);
  };

  // 반복적인 이벤트 이후, delay가 지나면 function
  const debounce = (delay) => {
    if (timerId) {
      // 할당되어 있는 timerId에 값이 있다면 해당하는 타이머 제거
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log(`마지막 요청으로부터 ${delay}ms 지났으므로 API 요청 실행 !`);
      timerId = null;
    }, delay);
  };

  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <h1>Button 이벤트 예제</h1>
      <button onClick={() => throttle(2000)}>쓰로틀링 버튼</button>
      <button onClick={() => debounce(2000)}>디바운싱 버튼</button>
      <div>
        <button
          onClick={() => {
            navigate("/company");
          }}
        >
          페이지 이동
        </button>
        {/* 스로틀링 버튼을 누르고 페이지이동 버튼을 눌렀을 때 전 페이지에서 어떠한 요청을 하고 있는게 아직 메모리에 남아있게됨 = 메모리 누수
        처리해주기위해 useEffect 사용 */}
      </div>
    </div>
  );
}

export default Home;
