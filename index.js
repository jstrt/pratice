// 📌 기본 세팅
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// 📌 임시 데이터베이스 (메모리 배열)
let users = [];

// 📌 회원 가입 API (POST /users)
app.post("/users", (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "이름을 입력하세요." });
    }

    const newUser = { id: users.length + 1, name };
    users.push(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 📌 회원 전체 조회 API (GET /users)
app.get("/users", (req, res, next) => {
  try {
    if (users.length === 0) {
      return res.status(404).json({ message: "등록된 회원이 없습니다." });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
});

// 📌 회원 개별 조회 API (GET /users/:id)
app.get("/users/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: "회원이 존재하지 않습니다." });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// 📌 회원 개별 삭제 API (DELETE /users/:id)
app.delete("/users/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "삭제할 회원이 없습니다." });
    }

    users.splice(index, 1);

    res.json({ message: "회원 삭제 완료" });
  } catch (error) {
    next(error);
  }
});

// 📌 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
});

// 📌 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
