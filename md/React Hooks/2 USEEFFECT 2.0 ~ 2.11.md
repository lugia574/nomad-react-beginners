# 2 USEEFFECT

## 2.0 Introduction to useEffect

이전에 배웠던

https://github.com/lugia574/nomad-react-beginners/blob/master/md/2022_0617%206.0%20~%206.4%20EFFECTS.md

참고 하도록 하자

useEffect 는 componentDidMount(), componentDidUpdate(), componentWillUnmount() 의 역할을 해

[참고자료](https://ko.reactjs.org/docs/react-component.html#componentdidmount)

```js
const App = () => {
  const sayHello = () => console.log("hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setaNumber] = useState(0);
  useEffet(sayHello, [number]);
  return(
    <div className="App">
        <div>HI</div>
        <button onClick={()=> setNumber(number+1)}>
        <button onClick={()=> setAnumber(aNumber+1)}>
    </div>
  )
};
```

- 1번째 인자-function으로서의 effct

  componentDidMount()와 기능이 비슷함

- 2번쨰 인자-deps (dependency)

  useEffect()가 deps리스트에 있는 값이 변할 때만 실행되게 함

  componentDidUpdate()와 기능이 비슷함

## 2.1 useTitle

이제 useEffect 를 이용해보자

브라우저 제목을 업데이트 시켜보자

```js
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle("Loading... ");
  setTimeout(() => titleUpdater("Home", 5000));
  return (
    <div className="App">
      <div>HI</div>
    </div>
  );
};
```

이렇게 되는데 하나하나 풀어보자.

```js
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
    // ....
```

useTitle 이라는 함수를 만들어 initialTitle 라는 매개 변수를 받음

그것을 `useState` 로 initialTitle 변수를 박아버려

```js
    // ...

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};
```

그리고 updateTitle 함수을 구현하고

`useEffect` 에 title 이 변경되면 updateTitle 함수가 실행되게 한다.

그리고 useTitle 함수의 리턴값으로 setTitle 을 뱉게 하면 끗

```js
const App = () => {
  const titleUpdater = useTitle("Loading... ");
  setTimeout(() => titleUpdater("Home", 5000));
  return (
    <div className="App">
      <div>HI</div>
    </div>
  );
};
```

뱉어진 setTitle 은 `setTimeout(() => titleUpdater("Home", 5000));` 으로 title 값을 변경 할 것이고

title 변경을 확인한 `useEffect` 가 updateTitle 함수를 실행할꺼임

## 2.2 useClick

이제 `useClick` 을 함 해보자

useClick 을 이용하려면 reference 에 대해 알고 있어야함

reference 은 우리가 commponenet 의 어떤 부분을 선택할 때 쓰는 방법임

getElementByID 같은거 말야

내가

```html
<input placeholder="haha" />
```

input을 5초 뒤에 focus 하고싶다면

```js
const App = () =>{
  const 바로이것 = useRef();
  setTimeout(()=> 바로이것.current?.focus(), 5000)
  return(
    <div className="App">
      <div>Hi<div>
      <input ref={바로이것} placeholder="haha">
    </div>
  )
}
```

이렇게 하면 된다.

참고로 **current?.** 는 Optional chaining 임

이게 바로 reference

이제 useClick 을 해보자.

```js
const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("Click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("Click", onClick);
      }
    };
  }, []);
  return element;
};

const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>HI</h1>
    </div>
  );
};
```

근데 React 16.8v 부터는 Hook 을 조건문, 반복문, 중첩함수 내에서 호출할 수 없습니다.

강의내용과 같은 결과를 얻으려면 아래의 코드처럼 useEffect 내에서 이벤트 바인딩을 막고,
최종적으로 undefinded 를 리턴 해야합니다.

단순히 이벤트의 바인딩만 막으려면 return element 를 그대로 사용해도 괜찮습니다.

```js
const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (typeof onClick !== "function") {
      return;
    }
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return typeof onClick !== "function" ? undefined : element;
};
```

## 2.3 useConfirm & usePreventLeave

useConfirm 은 사용자가 무언가를 하기전에 확인하는 기능

```js
const useConfirm = (message = "", callback, rejection) => {
  if (typeof callback !== "function") {
    return;
  }
  if (typeof rejection !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      callback();
    } else {
      rejection();
    }
  };

  return confirmAction;
};

function App() {
  const deleteWorld = () => console.log("Delete the world");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
}
```

이번에는 usePreventLeave

window 창을 닫을때 아직 저장 안했다고 경고창 띄우는거 그 기능임

```js
export const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);

  return { enablePrevent, disablePrevent };
};

export default function App() {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
}
```

## 2.4 useBeforeLeave

useBeforeLeave 는 마우스가 해당탭을 떠났을때 실행되는 function 임

```js
const useBeforeLeave = (onBefore) => {
  if (typeof onBefore !== "function") {
    return;
  }
  const hanble = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseleave", hanble);
    return document.removeEventListener("mouseleave", hanble);
  }, []);
};

export default function App() {
  const begForLife = () => console.log("please don't leave");
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>Hello </h1>
    </div>
  );
}
```

## 2.5 useFadeIn & useNetwork

useFadeIn 은 css 로 충분히 구현 가능함

그래도 hook을 이용한 방법을 알아두는게 좋겠지

애니메이션을 hook 에 포함시는 것이니까 충분히 유용한 배움이 됨

```js
const useFadeIn = (duration = 1, delay = 1) => {
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }

  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

export default function App() {
  const fadeH1 = useFadeIn(1, 0);
  const fadeH2 = useFadeIn(2, 2);
  return (
    <div className="App">
      <h1 {...fadeH1}>Hello </h1>
      <h1 {...fadeH2}>hahaha </h1>
    </div>
  );
}
```

useNetwork는 navigator가 online또는 offline일 때 작동

가령 인터넷이 중간에 끊겼을 때 '인터넷이 끊겼습니다.' 라는 팝업 띄어주고 그런거

```js
const useNetwork = (onChange) => {
  const [status, setStauts] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStauts(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);

  return status;
};

export default function App() {
  const handleNetworkChange = (online) => {
    console.log(online ? "juse went online" : "we are offline");
  };
  const online = useNetwork(handleNetworkChange);
  return (
    <div className="App">
      <h1>{online ? "Online" : "Offline"}</h1>
    </div>
  );
}
```

`navigator.onLine` 는 현재 네트워크가 온라인인지 오프라인인지 알려주는거임

## 2.6 useScroll & useFullscreen

```js
const useScroll = () => {
  const [state, Setstate] = useState({
    y: 0,
    x: 0,
  });
  const onscroll = () => {
    Setstate({ y: window.scrollY, x: window.screenX });
  };
  useEffect(() => {
    window.addEventListener("scroll", onscroll);
    return () => window.removeEventListener("scroll", onscroll);
  }, []);

  return state;
};

export default function App() {
  const { y } = useScroll();

  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue  " }}>
        Hello
      </h1>
    </div>
  );
}
```

다음 useFullscreen 임

```js
const useFullscreen = (callback) => {
  const element = useRef();

  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullscreen) {
        element.current.mozRequestFullScreen();
      } else if (element.current.webkitRequestFullscreen) {
        element.current.webkitRequestFullScreen();
      } else if (element.current.msRequestFullscreen) {
        element.current.msRequestFullScreen();
      }
      if (typeof callback === "function") {
        callback(true);
      }
    }
  };
  const exitFull = () => {
    const checkFullScreen = document.fullscreenElement;
    if (checkFullScreen !== null) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    if (typeof callback === "function") {
      callback(false);
    }
  };
  return { element, triggerFull, exitFull };
};

export default function App() {
  const callbackFull = (isFull) => {
    console.log(isFull ? "full~~~" : "small~~~~");
  };
  const { element, triggerFull, exitFull } = useFullscreen(callbackFull);
  return (
    <div className="App">
      <h1>Hello</h1>
      <div ref={element}>
        <img src="https://i.pinimg.com/564x/52/12/b8/5212b84be9f4ead9103c409d5c866c67.jpg" />

        <button onClick={exitFull}>exitFull </button>
      </div>
      <button onClick={triggerFull}>make fullscreen </button>
    </div>
  );
}
```

[전체화면이 아닐 때 "Exit fullscreen"버튼을 누르면 생기는 오류 해결]

document.fullscreenElement 로 전체화면인지 체크한 후 아닐 경우에만 document.exitFullscreen()을 실행하게 하기

```js
const exitFull = () => {
  const checkFullScreen = document.fullscreenElement;
  if (checkFullScreen !== null) {
    document.exitFullscreen();
  }
};
```

## 2.7 useNotification

다음은 알람 기능임

```js
const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }

  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};
export default function App() {
  const trigger = useNotification("hahaaha", { body: "hohohoho" });
  return (
    <div className="App">
      <button onClick={trigger}>Hello</button>
    </div>
  );
}
```

permission은 알람 받기를 거부했는지, 허가했는지, default 인지 알려주는거임
