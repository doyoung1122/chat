# 사내 업무 통합 플랫폼

사내 구성원을 위한 실시간 채팅, GPS 기반 출퇴근 관리, 전자결재 기능을 통합한 웹 플랫폼입니다.

---

## 프로젝트 목표

| # | 기능 | 설명 |
|---|------|------|
| 1 | GPS 출퇴근 | 회사 위치 반경 내에서만 출퇴근 처리 |
| 2 | 실시간 채팅 | 개인 채팅 및 단체 채팅 (카카오톡 방식) |
| 3 | 전자결재 | 기안 → 검토 → 승인 워크플로우, PDF 출력 |

---

## 기술 스택

### Frontend
- **React** — UI 프레임워크
- **Zustand** — 클라이언트 상태 관리
- **React Query** — 서버 상태 관리
- **Socket.io-client** — 실시간 채팅
- **shadcn/ui** — UI 컴포넌트
- **Geolocation API** — GPS 출퇴근

### Backend
- **Node.js + Express** — 메인 API 서버 및 실시간 채팅 (Socket.io)
- **Python + FastAPI** — 전자결재 워크플로우 API
- **Celery + Redis** — 비동기 결재 알림 처리

### Database
- **PostgreSQL** — 사용자, 출퇴근, 결재 데이터
- **MongoDB** — 채팅 메시지
- **Redis** — 세션 캐시, 읽음 처리

### 인프라
- **Docker Compose** — 로컬 개발 환경 (PostgreSQL, MongoDB, Redis)
- **AWS S3 / MinIO** — 파일 첨부 저장소
- **Nginx** — 리버스 프록시 및 API 라우팅

---

## 프로젝트 구조

```
chat/
├── frontend/             # React 앱
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/        # Zustand
│       ├── hooks/
│       └── api/
├── backend/
│   ├── node/             # Node.js + Socket.io
│   │   └── src/
│   │       ├── routes/
│   │       ├── socket/
│   │       ├── middleware/
│   │       ├── models/
│   │       └── utils/
│   └── python/           # FastAPI + Celery
│       └── app/
│           ├── routes/
│           ├── models/
│           ├── schemas/
│           ├── workers/
│           └── utils/
└── infra/
    └── docker-compose.yml
```

---

## 개발 환경 실행

### 사전 요구사항
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- conda

### DB 실행 (Docker)
```bash
cd infra
docker compose up -d
```

### Python 환경 설정
```bash
conda activate chat-system
pip install -r backend/python/requirements.txt
```

### FastAPI 서버 실행
```bash
cd backend/python
uvicorn app.main:app --reload --port 8000
```

### Node.js 서버 실행
```bash
cd backend/node
npm run dev
```

### React 앱 실행
```bash
cd frontend
npm run dev
```

---

## 개발 순서

- [x] 프로젝트 초기 구조 설정
- [ ] JWT 인증 시스템
- [ ] GPS 출퇴근 기능
- [ ] 실시간 채팅 (1:1 → 단체)
- [ ] 전자결재 워크플로우
