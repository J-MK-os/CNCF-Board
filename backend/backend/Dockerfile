# 1단계: 빌드 (Gradle + JDK17)
# 🔧 Gradle 8.10 → 8.14로 올림 (Spring Boot 4.0.0 요구사항 맞추기)
FROM gradle:8.14.0-jdk17-alpine AS build
WORKDIR /app

# 현재 디렉터리(backend/backend)의 모든 프로젝트 파일 복사
COPY . .

# Spring Boot jar 빌드
RUN gradle clean bootJar --no-daemon

# 2단계: 실행 (JRE만 있는 가벼운 이미지)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 빌드 결과 jar 복사 (이름 상관없이 *.jar 하나만 있다고 가정)
COPY --from=build /app/build/libs/*.jar app.jar

# K8s/Postgres용 DB 설정
#   application.yml의 설정보다 SPRING_DATASOURCE_* 환경변수가 우선 적용됨
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/cncf_board
ENV SPRING_DATASOURCE_USERNAME=cncf_user
ENV SPRING_DATASOURCE_PASSWORD=password

# 서버 포트
ENV SERVER_PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
