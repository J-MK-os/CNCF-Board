# 1단계: React 빌드
FROM node:20-alpine AS build
WORKDIR /app

# 패키지 정보 먼저 복사 후 설치
COPY package*.json ./
RUN npm install

# 나머지 소스 복사
COPY . .

# 백엔드 API 주소 (K8s backend Service 기준)
# ENV REACT_APP_API_BASE=http://backend:8080
# ENV REACT_APP_API_BASE=http://localhost:30081

# 프로덕션 빌드
RUN npm run build

# 2단계: Nginx로 정적 파일 서빙
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
