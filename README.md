## API 규정

### Base URL

```javascript
import axios from "axios";

export const API_BASE_URL = "http://gudokjoa5.165.192.105.60.nip.io";

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiInstance;
```

### 활용 예시

```javascript
import api from "../utils/apiInstance";

const getBooks = async () => {
  try {
    const { data } = await api.get("kkubooks/bookshelf/booklist/");
    return data.map((bookObj) => snakeToCamel(bookObj));
  } catch (err) {
    return err;
  }
};

const addBook = async (bookId, userId) => {
  try {
    const { data } = await api.post("kkubooks/bookshelf/", {
      book: bookId,
      user: userId,
    });
    return snakeToCamel(data);
  } catch (err) {
    return err;
  }
};
```

## code convention

- 제목은 50자 이내, 소문자 작성, 마침표 붙이지 않는다.
- subject종류 : [back/front] 대괄호 안에 back/front 구분 표시한다.
  ex. feat: 로그인
- **feat** : 새로운 기능에 대한 커밋
- **fix** : 버그 수정에 대한 커밋
- **build** : 빌드 관련 파일 수정에 대한 커밋
- **chore** : 그 외 자잘한 수정에 대한 커밋(기타변경)
- **ci** : CI 관련 설정 수정에 대한 커밋
- **docs** : 문서 수정에 대한 커밋
- **style** : 코드 스타일 혹은 포맷 등에 관한 커밋
- **refactor** : 코드 리팩토링에 대한 커밋
- **test** : 테스트 코드 수정에 대한 커밋
