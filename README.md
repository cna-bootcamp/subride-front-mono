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
