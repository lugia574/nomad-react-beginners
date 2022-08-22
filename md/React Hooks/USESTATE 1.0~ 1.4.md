# 1 USESTATE

## 1.0 Introduction to useState

시작할려고 했는데

유튜브가서 hook 에 대해 니코 영상 보고 오래

https://www.youtube.com/watch?v=yS-BU6eYUDE

---

useState 는 이전에 우리가 배웠음

https://github.com/lugia574/nomad-react-beginners/blob/master/md/2022_0612%203.0%20~%203.9%20STATE.md

여기 가서 다시 읽어보는 걸 추천함

hooks 의 좋은점은 함수형 프로그램을 권장한다는 거임

```js
import { useState } from "react";
import "./styles.css";

const App() {
  const [item, setItem] = useState(0);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}>incrementItem</button>
      <button onClick={decrementItem}>decrementItem</button>
    </div>
  );
}
```

이걸 Class Componenet로 바꾸면

```js
import { useState } from "react";
import "./styles.css";

class AppUgly extends React.Component{
    state = {
        item: 1
    }

    render(){
        const {item} = this.state;
        return (
            <div className="App">
            <h1>Hello {item}</h1>
            <h2>Start editing to see some magic happen!</h2>
            <button onClick={this.incrementItem}>incrementItem</button>
            <button onClick={this.decrementItem}>decrementItem</button>
            </div>
        );
    }
    const incrementItem = () => {
        this.setState(state => {
            return{
                item : state.item + 1
            }
        })
    };
    const decrementItem = () =>  {
        this.setState(state => {
            return{
                item : state.item - 1
            }
        })
    };

}
```

만약 너가 item 만 사용하고 싶다면

```ts
const [item] = useState(0)[0];
```

이렇게고 사용 가능함

## 1.1 useInput

useInput 에 대해 알아보자

useInput은 기본적으로 input을 업데이트함

```js
import { useState } from "react";
import "./styles.css";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setValue(value);
  };

  return { value, onChange };
};

const App = () => {
  const name = useInput("Mr.");
  return (
    <div className="App">
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
    </div>
  );
};
```

```js
{...name}
```

이렇게 쓰면 name에 있는걸 다 풀어줌

name.value, name.onChange 를 줄줄줄 나열한다 이거야

이걸 안쓴다면

```js
<input placeholder="Name" onChange={name.onChange} value={name.value} />
```

이렇게 했어야 했는데 이럼 길어지자너

## 1.2 useInput part Two

useInput을 조금 더 확장시켜서 섹시하게 만들어보제

이걸 NPM에 등록해서 사람들이 쓸 수 있게

최대 길이를 검증하는 기능을 포함시켜보자

```js
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

const App = () => {
  const maxLen = (value) => value.length <= 10;
  const name = useInput("Mr.", maxLen);
  return (
    <div className="App">
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

보면

```js
const maxLen = (value) => value.length <= 10;
```

boolean 출력 함수를 만들고 maxLen에 담았음

그걸

```js
const name = useInput("Mr.", maxLen);
```

useInput 에 쏴 줌

```js
const useInput = (initialValue, validator) => {
  //... 생략 ...

  const onChange = (event) => {
    //.. 생략 ...

    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };

  // ... 생략 ..
};
```

validator 함수 리턴값을 willUpdate 에 담아서

willUpdate 가 참이면 setValue(value) 한다

## 1.3 useTabs

useTabs을 해보자

```ts
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// 데이터
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1",
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2 뭐해",
  },
];
```

```js
const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrnetIndex] = useState(initialTab);

  return {
    currentItem: allTabs[currentIndex],
    chageItem: setCurrnetIndex,
  };
};
```

```js
const App = () => {
  const { currentItem, chageItem } = useTabs(0, content);
  return (
    <div className="App">
      <h1>Hello</h1>
      {content.map((section, index) => (
        <button onClick={() => chageItem(index)} key={index}>
          {section.tab}
        </button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```
