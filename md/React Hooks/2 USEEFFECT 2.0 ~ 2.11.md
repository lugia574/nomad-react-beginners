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
