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
