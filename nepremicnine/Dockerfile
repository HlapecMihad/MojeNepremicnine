FROM openjdk:21-jdk-slim
ARG WAR_FILE=target/nepremicnine-0.0.1-SNAPSHOT.war
COPY ${WAR_FILE} nepremicnine.war
ENTRYPOINT ["java","-jar","/nepremicnine.war"]
EXPOSE 8180
# Stage 1: Build the application
#FROM maven:3.8.5-eclipse-temurin-21 AS build
#COPY . .
#RUN mvn clean package -DskipTests

# Stage 2: Create the final image
#FROM eclipse-temurin:21-jdk
#COPY --from=build target/nepremicnine-0.0.1-SNAPSHOT.war nepremicnine.war
#ENTRYPOINT ["java","-jar","/nepremicnine.war"]
#EXPOSE 8180

